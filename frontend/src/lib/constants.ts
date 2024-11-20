// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";

contract StaffManagement {
    // Custom errors
    error StaffIdMustBePositiveInteger();
    error StaffIdExist();
    error StaffAlreadyExist();
    error StaffNotFound(uint256 staffID);
    error InvalidRoleAssignment(uint256 staffID, SalesStorage.Role currentRole);
    error TooManyAdmins();
    error InvalidStaffID(uint256 staffID);
    error StaffIdAlreadyUsed();
    error CannotUpdateOwnStatus();

    event StaffAdded(uint256 indexed staffID, address indexed staffAddr, string name, SalesStorage.Role role);
    event StaffRemoved(uint256 indexed staffID, address indexed staffAddr);
    event RoleUpdated(uint256 indexed staffID, address indexed staffAddr, SalesStorage.Role newRole);
    event AdminLimitUpdated(uint256 newLimit);
    event NewOwnerProposed(address proposedOwner);
    event StaffStatusUpdated(uint256 indexed staffID, address indexed staffAddr, SalesStorage.Status newStatus);

    modifier onlySuperAdmin() {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        SalesStorage.Staff memory caller = staffState.staffDetails[msg.sender];
        require(caller.role == SalesStorage.Role.Administrator, SalesStorage.NotAnAdministrator());
        _;
    }

    // Function to update the max admin limit (only accessible by the store owner)
    function updateAdminLimit(uint16 _newLimit) public {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        staffState.maxAdmins = _newLimit;
        emit AdminLimitUpdated(_newLimit);
    }

    // Function to add new staff (only accessible by the store owner)
    function addStaff(
        address _addr,
        uint256 _staffID,
        string memory _name,
        string memory _email,
        uint _phoneNumber,
        SalesStorage.Role _role
    ) public {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        require(_addr != address(0), SalesStorage.AddressZeroDetected());

        require(_staffID > 0, StaffIdMustBePositiveInteger());

        require(staffState.staffIDToAddress[_staffID] == address(0), StaffIdAlreadyUsed());

        require(staffState.staffDetails[_addr].staffID == 0, StaffIdExist());

        staffState.staffDetails[_addr] = SalesStorage.Staff({
            staffID: _staffID,
            name: _name,
            email: _email,
            phoneNumber: _phoneNumber,
            status: SalesStorage.Status.Active, // Automatically set to Active (0) when added
            dateJoined: block.timestamp,
            role: _role
        });
        staffState.staffAddressArray.push(_addr);
        staffState.staffIDToAddress[_staffID] = _addr;

        if (_role == SalesStorage.Role.Administrator) {
            if (staffState.adminCount >= staffState.maxAdmins) revert TooManyAdmins();
            staffState.adminCount++;
        }

        emit StaffAdded(_staffID, _addr, _name, _role);
    }

    // Function to remove staff by ID (only accessible by store owner)
    // function removeStaffById(uint256 _staffID) public {
    //     SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
    //     require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

    //     address staffAddr = staffState.staffIDToAddress[_staffID];

    //     if (staffAddr == address(0)) revert StaffNotFound(_staffID);

    //     SalesStorage.deleteStaffIDFromArray(staffAddr);
    //     delete staffState.staffDetails[staffAddr];
    //     delete staffState.staffIDToAddress[_staffID];

    //     if (staffState.staffDetails[staffAddr].role == SalesStorage.Role.Administrator) {
    //         staffState.adminCount--;
    //     }

    //     emit StaffRemoved(_staffID, staffAddr);
    // }

    // Function to promote or demote staff (only accessible by store owner)
    function setRole(uint256 _staffID, SalesStorage.Role _role) public {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        address staffAddr = staffState.staffIDToAddress[_staffID];

        if (staffAddr == address(0)) revert StaffNotFound(_staffID);

        SalesStorage.Staff memory staff = staffState.staffDetails[staffAddr];

        if (_role == SalesStorage.Role.Administrator) {
            if (staffState.adminCount >= staffState.maxAdmins) revert TooManyAdmins();
            staffState.adminCount++;
        }

        if (staff.role == SalesStorage.Role.Administrator) {
            staffState.adminCount--;
        }

        staffState.staffDetails[staffAddr].role = _role;
        emit RoleUpdated(_staffID, staffAddr, _role);
    }

    // Function to update staff status (only accessible by Admin)
    function updateStaffStatus(uint256 _staffID, SalesStorage.Status _status) public onlySuperAdmin {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(
            staffState.staffDetails[msg.sender].status == SalesStorage.Status.Active,
            SalesStorage.NotActiveStaff()
        );

        address staffAddr = staffState.staffIDToAddress[_staffID];
        require(staffAddr != address(0), StaffNotFound(_staffID));

        if (staffAddr == msg.sender) revert CannotUpdateOwnStatus();

        staffState.staffDetails[staffAddr].status = _status;

        emit StaffStatusUpdated(_staffID, staffAddr, _status);
    }

    // Function to get all active staff (returns only those with "Active" status)
    function getAllActiveStaffs() public view returns (SalesStorage.Staff[] memory activeStaffs) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();

        uint256 staffCount = staffState.staffAddressArray.length;
        uint256 activeCount = 0;

        for (uint256 i = 0; i < staffCount; i++) {
            address staffAddr = staffState.staffAddressArray[i];
            if (staffState.staffDetails[staffAddr].status == SalesStorage.Status.Active) {
                activeCount++;
            }
        }

        activeStaffs = new SalesStorage.Staff[](activeCount);
        uint256 index = 0;

        for (uint256 i = 0; i < staffCount; i++) {
            address staffAddr = staffState.staffAddressArray[i];
            if (staffState.staffDetails[staffAddr].status == SalesStorage.Status.Active) {
                activeStaffs[index] = staffState.staffDetails[staffAddr];
                index++;
            }
        }
    }

    // Function to get staff details by staff ID (accessible by SalesRep or Administrator)
    // function getStaffDetailsByID(uint256 _staffID) public view returns (SalesStorage.Staff memory) {
    //     SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();

    //     address staffAddr = staffState.staffIDToAddress[_staffID];
    //     if (staffAddr == address(0)) revert StaffNotFound(_staffID);

    //     SalesStorage.Staff memory staff = staffState.staffDetails[staffAddr];
    //     return staff;
    // }

    // Function to get all staff details (accessible by SalesRep or Administrator)
    function getAllStaff() public view returns (SalesStorage.Staff[] memory allStaffs) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();

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
}
