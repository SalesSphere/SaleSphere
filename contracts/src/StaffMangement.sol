// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";

contract StaffManagement {
    // Custom errors
    error StaffIdMustBePositiveInteger();
    error StaffIdExist();
    error NotAdministrator();
    error StaffAlreadyExist();
    error StaffNotFound(uint256 staffID);
    error InvalidRoleAssignment(uint256 staffID, SalesStorage.Role currentRole);
    error TooManyAdmins();
    error InvalidStaffID(uint256 staffID);

    // Event to log important actions
    event StaffAdded(uint256 indexed staffID, address indexed staffAddr, string name, SalesStorage.Role role);
    event StaffRemoved(uint256 indexed staffID, address indexed staffAddr);
    event RoleUpdated(uint256 indexed staffID, address indexed staffAddr, SalesStorage.Role newRole);
    event AdminLimitUpdated(uint256 newLimit);
    event NewOwnerProposed(address proposedOwner);

    // Function to update the max admin limit (only accessible by the store owner)
    function updateAdminLimit(uint16 _newLimit) public {
        // Check if it is the storeOwner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        staffState.maxAdmins = _newLimit;
        emit AdminLimitUpdated(_newLimit);
    }

    // Function to add new staff (only accessible by the store owner)
    function addStaff(address _addr, uint256 _staffID, string memory _name, SalesStorage.Role _role) public {
        // Check if it is the storeOwner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        // Checks for address zero
        require(_addr != address(0), SalesStorage.AddressZeroDetected());

        // Check to ensure zero is not passed for staffID
        require(_staffID > 0, StaffIdMustBePositiveInteger());
        // Check if staff not already exist
        require(staffState.staffDetails[_addr].staffID == 0, StaffIdExist());

        // Add staff to storage
        staffState.staffDetails[_addr] = SalesStorage.Staff({ staffID: _staffID, name: _name, role: _role });
        staffState.staffAddressArray.push(_addr);
        staffState.staffIDToAddress[_staffID] = _addr;

        // If adding an admin, increment the admin count
        if (_role == SalesStorage.Role.Administrator) {
            if (staffState.adminCount >= staffState.maxAdmins) revert TooManyAdmins();
            staffState.adminCount++;
        }

        emit StaffAdded(_staffID, _addr, _name, _role);
    }

    // Function to remove staff by ID (only accessible by store owner)
    function removeStaffById(uint256 _staffID) public {
        // Check if it is the storeOwner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        address staffAddr = staffState.staffIDToAddress[_staffID];

        if (staffAddr == address(0)) revert StaffNotFound(_staffID);

        // Remove the staff record
        SalesStorage.deleteStaffIDFromArray(staffAddr);
        delete staffState.staffDetails[staffAddr];
        delete staffState.staffIDToAddress[_staffID]; // Remove mapping from address to staffID

        // Decrement admin count if necessary
        if (staffState.staffDetails[staffAddr].role == SalesStorage.Role.Administrator) {
            staffState.adminCount--;
        }

        emit StaffRemoved(_staffID, staffAddr);
    }

    // Function to promote or demote staff (only accessible by store owner)
    function setRole(uint256 _staffID, SalesStorage.Role _role) public {
        // Check if it is the storeOwner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        address staffAddr = staffState.staffIDToAddress[_staffID];

        if (staffAddr == address(0)) revert StaffNotFound(_staffID);

        // The staff to update role
        SalesStorage.Staff memory staff = staffState.staffDetails[staffAddr];

        // Handle admin count limit
        if (_role == SalesStorage.Role.Administrator) {
            if (staffState.adminCount >= staffState.maxAdmins) revert TooManyAdmins();
            staffState.adminCount++;
        }

        // If the previous role was Administrator, decrement the admin count
        if (staff.role == SalesStorage.Role.Administrator) {
            staffState.adminCount--;
        }

        staffState.staffDetails[staffAddr].role = _role;
        emit RoleUpdated(_staffID, staffAddr, _role);
    }

    // Function to get staff details by staff ID (accessible by SalesRep or Administrator)
    function getStaffDetailsByID(uint256 _staffID) public view returns (SalesStorage.Staff memory) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();

        // Allow all staffs
        SalesStorage.Staff memory caller = staffState.staffDetails[msg.sender];
        require(
            msg.sender == staffState.storeOwner || caller.role == SalesStorage.Role.SalesRep
                || caller.role == SalesStorage.Role.Administrator,
            SalesStorage.NotSalesRepOrAdministrator()
        );

        address staffAddr = staffState.staffIDToAddress[_staffID];
        if (staffAddr == address(0)) revert StaffNotFound(_staffID);

        SalesStorage.Staff memory staff = staffState.staffDetails[staffAddr];
        return staff;
    }

    // Function to get all active staff
    function getAllStaff() public view returns (SalesStorage.Staff[] memory allStaffs) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();

        // Allow all staffs
        SalesStorage.Staff memory caller = staffState.staffDetails[msg.sender];
        require(
            msg.sender == staffState.storeOwner || caller.role == SalesStorage.Role.SalesRep
                || caller.role == SalesStorage.Role.Administrator,
            SalesStorage.NotSalesRepOrAdministrator()
        );

        address[] memory staffIDAddresses = staffState.staffAddressArray;
        uint256 staffCount = staffIDAddresses.length;
        allStaffs = new SalesStorage.Staff[](staffCount);

        for (uint256 i = 0; i < staffCount; i++) {
            address addr = staffIDAddresses[i];
            allStaffs[i] = staffState.staffDetails[addr];
        }
    }

    function getOwner() external view returns (address owner) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        owner = staffState.storeOwner;
    }

    function transferOwnership(address newOwner) external {
        // Checks for address zero
        require(newOwner != address(0), SalesStorage.AddressZeroDetected());

        // Check if it is the storeOwner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        staffState.proposedOwner = newOwner;
        emit NewOwnerProposed(newOwner);
    }

    function acceptOwnership() external {
        // Check if it is the proposed owner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.proposedOwner, SalesStorage.NotProposedOwner());

        staffState.proposedOwner = address(0);
        staffState.storeOwner = msg.sender;
    }
}
