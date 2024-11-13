// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract StaffManagement {

    // Define roles using an enum
    enum Role { Administrator, SalesRep }

    // Struct to represent a staff member
    struct Staff {
        uint staffID;
        address addr;
        string name;
        Role role;
    }

    // Mapping to store staff details by staffID
    mapping(uint => Staff) internal staffDetails;
    mapping(address => uint) internal staffIDByAddress; // Mapping from address to staffID
    mapping(uint => bool) internal activeStaff;  // Track active staff IDs

    uint public staffCount;  // To track the total number of staff
    uint public maxAdmins;  // Max number of admins allowed (set by store owner)
    address public storeOwner;  // Store owner's address
    uint public adminCount;  // To track the number of administrators

    // Custom errors for better gas efficiency
    error NotStoreOwner();
    error NotAdministrator();
    error StaffNotFound(uint staffID);
    error InvalidRoleAssignment(uint staffID, Role currentRole);
    error TooManyAdmins();
    error InvalidStaffID(uint staffID);

    // Modifier to restrict access to the store owner
    modifier onlyOwner() {
        if (msg.sender != storeOwner) revert NotStoreOwner();
        _;
    }

    // Modifier to allow access for both SalesRep and Administrator
    modifier onlySalesRepOrAdmin() {
        if (staffDetails[staffIDByAddress[msg.sender]].role != Role.SalesRep &&
            staffDetails[staffIDByAddress[msg.sender]].role != Role.Administrator) {
            revert NotAdministrator();
        }
        _;
    }

    // Constructor to initialize the store owner and maxAdmins
    constructor(uint _maxAdmins) {
        storeOwner = msg.sender;
        maxAdmins = _maxAdmins; // Set max admin limit on deployment
        adminCount = 0; // No admins initially
    }

    // Event to log important actions
    event StaffAdded(uint indexed staffID, address indexed staffAddr, string name, Role role);
    event StaffRemoved(uint indexed staffID, address indexed staffAddr);
    event RoleUpdated(uint indexed staffID, address indexed staffAddr, Role newRole);
    event AdminLimitUpdated(uint newLimit);

    // Function to update the max admin limit (only accessible by the store owner)
    function updateAdminLimit(uint _newLimit) public onlyOwner {
        maxAdmins = _newLimit;
        emit AdminLimitUpdated(_newLimit);
    }

    // Function to add new staff (only accessible by the store owner)
    function addStaff(address _addr, string memory _name, Role _role) public onlyOwner {
        // Checks for address zero
        require(_addr != address(0), "Invalid address");
        // Ensure the address is not already a staff member
        require(staffIDByAddress[_addr] == 0, "Staff already exists");

        staffCount++;
        uint staffID = staffCount;

        staffDetails[staffID] = Staff({
            staffID: staffID,
            addr: _addr,
            name: _name,
            role: _role
        });

        staffIDByAddress[_addr] = staffID; // Map address to staffID
        activeStaff[staffID] = true;  // Mark the staff as active

        // If adding an admin, increment the admin count
        if (_role == Role.Administrator) {
            if (adminCount >= maxAdmins) revert TooManyAdmins();
            adminCount++;
        }

        emit StaffAdded(staffID, _addr, _name, _role);
    }

    // Function to get staff details by staff ID (accessible by SalesRep or Administrator)
    function getStaffDetails(uint _staffID) public view onlySalesRepOrAdmin returns (Staff memory) {
        if (!activeStaff[_staffID]) revert StaffNotFound(_staffID);
        return staffDetails[_staffID];
    }

    // Function to remove staff by ID (only accessible by store owner)
    function removeStaff(uint _staffID) public onlyOwner {
        if (!activeStaff[_staffID]) revert StaffNotFound(_staffID);

        address staffAddr = staffDetails[_staffID].addr;

        // Remove the staff record
        delete staffDetails[_staffID];
        delete staffIDByAddress[staffAddr]; // Remove mapping from address to staffID
        delete activeStaff[_staffID]; // Mark the staff as inactive

        // Decrement staff count and admin count if necessary
        staffCount--;
        if (staffDetails[_staffID].role == Role.Administrator) {
            adminCount--;
        }

        emit StaffRemoved(_staffID, staffAddr);
    }

    // Function to promote or demote staff (only accessible by store owner or administrator)
    function setRole(uint _staffID, Role _role) public {
        address staffAddr = staffDetails[_staffID].addr;
        if (staffAddr == address(0)) revert StaffNotFound(_staffID);

        if (msg.sender != storeOwner) {
            revert NotAdministrator();  // Only store owner can promote/demote staff roles
        }

        // Handle admin count limit
        if (_role == Role.Administrator) {
            if (adminCount >= maxAdmins) revert TooManyAdmins();
            adminCount++;
        }

        // If the previous role was Administrator, decrement the admin count
        if (staffDetails[_staffID].role == Role.Administrator) {
            adminCount--;
        }

        staffDetails[_staffID].role = _role;
        emit RoleUpdated(_staffID, staffAddr, _role);
    }

    // Function to get all active staff
    function getAllStaff() public view onlyOwner returns (Staff[] memory) {
        uint activeStaffCount = 0;
        // First, count the number of active staff members
        for (uint i = 1; i <= staffCount; i++) {
            if (activeStaff[i]) {
                activeStaffCount++;
            }
        }

        Staff[] memory allStaff = new Staff[](activeStaffCount);
        uint index = 0;

        // Then, populate the array with active staff
        for (uint i = 1; i <= staffCount; i++) {
            if (activeStaff[i]) {
                allStaff[index] = staffDetails[i];
                index++;
            }
        }

        return allStaff;
    }
}
//P.S : if you have any contribution/concerns, pls shoot!