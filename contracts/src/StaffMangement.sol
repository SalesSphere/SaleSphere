// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";

contract StaffManagement {
    // Custom errors
    error NotStoreOwner();
    error NotAdministrator();
    error NotSalesRepOrAdministrator();
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

    // Function to update the max admin limit (only accessible by the store owner)
    function updateAdminLimit(uint16 _newLimit) public {
        // Check if it is the storeOwner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        if (msg.sender != staffState.storeOwner) revert NotStoreOwner();

        staffState.maxAdmins = _newLimit;
        emit AdminLimitUpdated(_newLimit);
    }

    // Function to add new staff (only accessible by the store owner)
    function addStaff(address _addr, string memory _name, SalesStorage.Role _role) public {
        // Check if it is the storeOwner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        if (msg.sender != staffState.storeOwner) revert NotStoreOwner();

        // Checks for address zero
        require(_addr != address(0), SalesStorage.AddressZeroDetected());

        // Ensure the address is not already a staff member
        require(staffState.staffIDByAddress[_addr] == 0, StaffAlreadyExist());

        staffState.staffCount++;
        uint256 staffID = staffState.staffCount;

        staffState.staffDetails[staffID] =
            SalesStorage.Staff({ staffID: staffID, addr: _addr, name: _name, role: _role });

        staffState.staffIDByAddress[_addr] = staffID; // Map address to staffID
        staffState.activeStaff[staffID] = true; // Mark the staff as active

        // If adding an admin, increment the admin count
        if (_role == SalesStorage.Role.Administrator) {
            if (staffState.adminCount >= staffState.maxAdmins) revert TooManyAdmins();
            staffState.adminCount++;
        }

        emit StaffAdded(staffID, _addr, _name, _role);
    }

    // Function to get staff details by staff ID (accessible by SalesRep or Administrator)
    function getStaffDetails(uint256 _staffID) public view returns (SalesStorage.Staff memory) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();

        // Allow only sales rep or administrator
        uint256 callerId = staffState.staffIDByAddress[msg.sender];
        SalesStorage.Staff memory caller = staffState.staffDetails[callerId];
        require(
            caller.role == SalesStorage.Role.SalesRep || caller.role == SalesStorage.Role.Administrator,
            NotSalesRepOrAdministrator()
        );

        if (!staffState.activeStaff[_staffID]) revert StaffNotFound(_staffID);
        return staffState.staffDetails[_staffID];
    }

    // Function to remove staff by ID (only accessible by store owner)
    function removeStaff(uint256 _staffID) public {
        // Check if it is the storeOwner
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        if (msg.sender != staffState.storeOwner) revert NotStoreOwner();

        if (!staffState.activeStaff[_staffID]) revert StaffNotFound(_staffID);

        address staffAddr = staffState.staffDetails[_staffID].addr;

        // Remove the staff record
        delete staffState.staffDetails[_staffID];
        delete staffState.staffIDByAddress[staffAddr]; // Remove mapping from address to staffID
        delete staffState.activeStaff[_staffID]; // Mark the staff as inactive

        // Decrement staff count and admin count if necessary
        staffState.staffCount--;
        if (staffState.staffDetails[_staffID].role == SalesStorage.Role.Administrator) {
            staffState.adminCount--;
        }

        emit StaffRemoved(_staffID, staffAddr);
    }

    // Function to promote or demote staff (only accessible by store owner or administrator)
    function setRole(uint256 _staffID, SalesStorage.Role _role) public {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        // Check if it is the storeOwner
        if (msg.sender != staffState.storeOwner) revert NotStoreOwner();

        // The staff to update role
        SalesStorage.Staff memory staff = staffState.staffDetails[_staffID];

        if (staff.addr == address(0)) revert StaffNotFound(_staffID);

        if (msg.sender != staffState.storeOwner) {
            revert NotAdministrator(); // Only store owner can promote/demote staff roles
        }

        // Handle admin count limit
        if (_role == SalesStorage.Role.Administrator) {
            if (staffState.adminCount >= staffState.maxAdmins) revert TooManyAdmins();
            staffState.adminCount++;
        }

        // If the previous role was Administrator, decrement the admin count
        if (staff.role == SalesStorage.Role.Administrator) {
            staffState.adminCount--;
        }

        staffState.staffDetails[_staffID].role = _role;
        emit RoleUpdated(_staffID, staff.addr, _role);
    }

    // Function to get all active staff
    function getAllStaff() public view returns (SalesStorage.Staff[] memory) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        uint256 activeStaffCount = 0;
        // First, count the number of active staff members
        for (uint256 i = 1; i <= staffState.staffCount; i++) {
            if (staffState.activeStaff[i]) {
                activeStaffCount++;
            }
        }

        SalesStorage.Staff[] memory allStaff = new SalesStorage.Staff[](activeStaffCount);
        uint256 index = 0;

        // Then, populate the array with active staff
        for (uint256 i = 1; i <= staffState.staffCount; i++) {
            if (staffState.activeStaff[i]) {
                allStaff[index] = staffState.staffDetails[i];
                index++;
            }
        }

        return allStaff;
    }
}
//P.S : if you have any contribution/concerns, pls shoot!
