// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";
import { SalesContract } from "./SalesContract.sol";
// import { InventoryManagement } from "./InventoryManagement.sol";
import { StaffManagement } from "./StaffMangement.sol";

contract SaleSphere is SalesContract, StaffManagement {
    constructor(uint16 maxAdmins, uint16 productLowMargin) {
        SalesStorage.setInitials(maxAdmins, productLowMargin);
    }
}
