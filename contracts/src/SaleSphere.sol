// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";
import { SalesContract } from "./SalesContract.sol";
import { StaffManagement } from "./StaffManagement.sol";

contract SaleSphere is SalesContract, StaffManagement {
    constructor(uint16 maxAdmins, uint16 productLowMargin) {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        staffState.deployer = msg.sender;

        SalesStorage.setInitials(maxAdmins, productLowMargin);
    }
}

