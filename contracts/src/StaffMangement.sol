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
    error StaffIdAlreadyUsed();

    event StaffAdded(uint256 indexed staffID, address indexed staffAddr, string name, SalesStorage.Role role);
    event StaffRemoved(uint256 indexed staffID, address indexed staffAddr);
    event RoleUpdated(uint256 indexed staffID, address indexed staffAddr, SalesStorage.Role newRole);
    event AdminLimitUpdated(uint256 newLimit);
    event NewOwnerProposed(address proposedOwner);

    // Function to update the max admin limit (only accessible by the store owner)
    function updateAdminLimit(uint16 _newLimit) public {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        staffState.maxAdmins = _newLimit;
        emit AdminLimitUpdated(_newLimit);
    }

    // Function to add new staff (only accessible by the store owner)
    function addStaff(address _addr, uint256 _staffID, string memory _name, SalesStorage.Role _role) public {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        require(_addr != address(0), SalesStorage.AddressZeroDetected());

        require(_staffID > 0, StaffIdMustBePositiveInteger());

        require(staffState.staffIDToAddress[_staffID] == address(0), StaffIdAlreadyUsed());

        require(staffState.staffDetails[_addr].staffID == 0, StaffIdExist());

        staffState.staffDetails[_addr] = SalesStorage.Staff({ staffID: _staffID, name: _name, role: _role });
        staffState.staffAddressArray.push(_addr);
        staffState.staffIDToAddress[_staffID] = _addr;

        if (_role == SalesStorage.Role.Administrator) {
            if (staffState.adminCount >= staffState.maxAdmins) revert TooManyAdmins();
            staffState.adminCount++;
        }

        emit StaffAdded(_staffID, _addr, _name, _role);
    }

    // Function to remove staff by ID (only accessible by store owner)
    function removeStaffById(uint256 _staffID) public {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        address staffAddr = staffState.staffIDToAddress[_staffID];

        if (staffAddr == address(0)) revert StaffNotFound(_staffID);

        SalesStorage.deleteStaffIDFromArray(staffAddr);
        delete staffState.staffDetails[staffAddr];
        delete staffState.staffIDToAddress[_staffID]; // Remove mapping from address to staffID

        if (staffState.staffDetails[staffAddr].role == SalesStorage.Role.Administrator) {
            staffState.adminCount--;
        }

        emit StaffRemoved(_staffID, staffAddr);
    }

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

    // Function to get staff details by staff ID (accessible by SalesRep or Administrator)
    function getStaffDetailsByID(uint256 _staffID) public view returns (SalesStorage.Staff memory) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();

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

    function getAllStaff() public view returns (SalesStorage.Staff[] memory allStaffs) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();

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
        require(newOwner != address(0), SalesStorage.AddressZeroDetected());

        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.storeOwner, SalesStorage.NotStoreOwner());

        staffState.proposedOwner = newOwner;
        emit NewOwnerProposed(newOwner);
    }

    function acceptOwnership() external {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        require(msg.sender == staffState.proposedOwner, SalesStorage.NotProposedOwner());

        staffState.proposedOwner = address(0);
        staffState.storeOwner = msg.sender;
    }
}
