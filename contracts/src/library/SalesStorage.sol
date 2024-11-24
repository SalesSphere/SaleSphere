// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";
import { SalesContract } from "./SalesContract.sol";
import { StaffManagement } from "./StaffMangement.sol";

contract SaleSphere is SalesContract, StaffManagement {
    constructor(address owner, uint16 maxAdmins, uint16 productLowMargin) {
        SalesStorage.setInitials(owner, maxAdmins, productLowMargin);
    }
}
