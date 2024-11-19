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

    modifier onlySalesRep() {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        SalesStorage.Staff memory caller = staffState.staffDetails[msg.sender];
        require(caller.role == SalesStorage.Role.SalesRep, SalesStorage.NotSalesRep());
        _; // continue execution
    }

    function recordSale(
        SalesStorage.SaleItem[] calldata items,
        uint256 totalAmount,
        SalesStorage.ModeOfPayment paymentMode
    ) external onlySalesRep {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        require(
        SalesStorage.getStaffState().staffDetails[msg.sender].status == SalesStorage.Status.Active,
        NotActiveStaff());

        // Increment sale ID and create new sale
        state.saleCounter++;
        SalesStorage.Sale storage newSale = state.sales[state.saleCounter];
        newSale.timestamp = block.timestamp;
        newSale.totalAmount = totalAmount;
        newSale.cashierId = msg.sender;
        newSale.paymentMode = paymentMode;

        // Directly assign the items array to newSale.items and reduce product count
        for (uint256 i = 0; i < items.length; i++) {
            newSale.items.push(items[i]);
            _reduceProductCount(items[i].productId, items[i].quantity);
        }

        // Emit SaleRecorded event with specified indexed fields
        emit SaleRecorded(state.saleCounter, msg.sender, totalAmount, block.timestamp, paymentMode);
    }

    // Function to get a single sale by ID
    function getSaleById(uint256 saleId) external view onlyActiveStaff returns (SalesStorage.Sale memory sale) {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        sale = state.sales[saleId];
    }

    // Function to get all sales (returns an array of Sale structs)
    function getAllSales() external view onlyActiveStaff returns (SalesStorage.Sale[] memory allSales) {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();

        uint256 totalSales = state.saleCounter;
        allSales = new SalesStorage.Sale[](totalSales);

        for (uint256 i = 1; i <= totalSales; i++) {
            allSales[i - 1] = state.sales[i];
        }
    }
}
