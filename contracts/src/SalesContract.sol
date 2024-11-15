// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";
import { InventoryManagement } from "./InventoryManagement.sol";

contract SalesContract is InventoryManagement {
    event SaleRecorded(
        uint256 saleId,
        address indexed cashierId,
        uint256 indexed totalAmount,
        uint256 indexed timestamp,
        SalesStorage.ModeOfPayment paymentMode
    );

    function recordSale(
        SalesStorage.SaleItem[] calldata items,
        uint256 totalAmount,
        SalesStorage.ModeOfPayment paymentMode
    ) external {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();

        // Increment sale ID and create new sale
        state.saleCounter += 1;
        SalesStorage.Sale storage newSale = state.sales[state.saleCounter];
        newSale.timestamp = block.timestamp;
        newSale.totalAmount = totalAmount;
        newSale.cashierId = msg.sender;
        newSale.paymentMode = paymentMode;

        // Directly assign the items array to newSale.items

        // Update inventory for each item
        for (uint256 i = 0; i < items.length; i++) {
            newSale.items.push(items[i]);
            reduceProductCount(items[i].productId, items[i].quantity);
        }

        // Emit SaleRecorded event with specified indexed fields
        emit SaleRecorded(state.saleCounter, msg.sender, totalAmount, block.timestamp, paymentMode);
    }
}
