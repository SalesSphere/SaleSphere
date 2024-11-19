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

    // function recordSale(
    //     SalesStorage.SaleItem[] calldata items,
    //     uint256 totalAmount,
    //     SalesStorage.ModeOfPayment paymentMode
    // ) external onlySalesRep {
    //     SalesStorage.StoreState storage state = SalesStorage.getStoreState();

    //     // Increment sale ID and create new sale
    //     state.saleCounter++;
    //     SalesStorage.Sale storage newSale = state.sales[state.saleCounter];
    //     newSale.timestamp = block.timestamp;
    //     newSale.totalAmount = totalAmount;
    //     newSale.cashierId = msg.sender;
    //     newSale.paymentMode = paymentMode;

    //     // Directly assign the items array to newSale.items and reduce product count
    //     for (uint256 i = 0; i < items.length; i++) {
    //         newSale.items.push(items[i]);
    //         _reduceProductCount(items[i].productId, items[i].quantity);
    //     }

    //     // Emit SaleRecorded event with specified indexed fields
    //     emit SaleRecorded(state.saleCounter, msg.sender, totalAmount, block.timestamp, paymentMode);
    // }

     function recordSale(
        SalesStorage.SaleItem[] calldata items,
        uint256 totalAmount,
        SalesStorage.ModeOfPayment paymentMode
    ) external onlySalesRep returns (string memory) {
        require(items.length > 0, "No items in sale");
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();

        // saleCounter++;
        state.saleCounter++;
        SalesStorage.Sale storage newSale = state.sales[state.saleCounter];
        newSale.timestamp = block.timestamp;
        newSale.totalAmount = totalAmount;
        newSale.cashierId = msg.sender;
        newSale.paymentMode = paymentMode;

        for (uint256 i = 0; i < items.length; i++) {
            SalesStorage.Product storage product = state.products[items[i].productId];
            if (product.uploader == address(0)) revert SalesStorage.ProductDoesNotExist(items[i].productId);
            newSale.items.push(items[i]);
            _reduceProductCount(items[i].productId, items[i].quantity);
        }

        emit SaleRecorded(state.saleCounter, msg.sender, totalAmount, block.timestamp, paymentMode);

        return _generateSaleId(state.saleCounter, block.timestamp);

    }

    function getAllSalesDisplay(uint256 startIndex, uint256 endIndex) 
        external 
        view 
        returns (SalesStorage.SaleDisplay[] memory) 
    {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        
        require(startIndex <= endIndex && endIndex <= state.saleCounter, "Invalid range");

        // Calculate total number of items across all requested sales
        uint256 totalItems = 0;
        for (uint256 i = startIndex; i <= endIndex; i++) {
            totalItems += state.sales[i].items.length;
        }

        SalesStorage.SaleDisplay[] memory displaySales = new SalesStorage.SaleDisplay[](totalItems);
        uint256 currentIndex = 0;

        // Process each sale
        for (uint256 saleIndex = startIndex; saleIndex <= endIndex; saleIndex++) {
            SalesStorage.Sale storage sale = state.sales[saleIndex];
            string memory saleId = _generateSaleId(saleIndex, sale.timestamp);
            
            // Process each item in the sale
            for (uint256 itemIndex = 0; itemIndex < sale.items.length; itemIndex++) {
                SalesStorage.SaleItem storage item = sale.items[itemIndex];
                SalesStorage.Product storage product = state.products[item.productId];
                SalesStorage.Staff storage cashier = staffState.staffDetails[sale.cashierId];

                displaySales[currentIndex] = SalesStorage.SaleDisplay({
                    saleId: saleId,
                    productName: product.productName,
                    productPrice: product.productPrice,
                    quantity: item.quantity,
                    seller: cashier.name,
                    modeOfPayment: _modeOfPaymentToString(sale.paymentMode)
                });

                currentIndex++;
            }
        }

        return displaySales;
    }

    function getSingleSale(uint256 saleIndex) external view returns (
        string memory saleId,
        string memory productName,
        uint256 productPrice,
        uint256 quantity,
        string memory seller,
        string memory paymentMode,
        uint256 timestamp,
        uint256 totalAmount
    ) {
    SalesStorage.StoreState storage state = SalesStorage.getStoreState();
    
    require(saleIndex < state.saleCounter, "Invalid sale index");
    
    SalesStorage.Sale storage sale = state.sales[saleIndex];
    
    // Get item details (assuming we want first item for single sale display)
    SalesStorage.SaleItem storage item = sale.items[0];
    SalesStorage.Product storage product = state.products[item.productId];
    
    SalesStorage.Staff storage cashier = SalesStorage.getStaffState().staffDetails[sale.cashierId];
    
    return (
        _generateSaleId(saleIndex, sale.timestamp), 
        product.productName,
        product.productPrice,
        item.quantity,
        cashier.name,
        _modeOfPaymentToString(sale.paymentMode),
        sale.timestamp,
        sale.totalAmount
    );
}

    // Function to get a single sale by ID
    // function getSaleById(string memory saleId) external view onlyAdminAndSalesRep returns (SalesStorage.Sale memory sale) {
    //     SalesStorage.StoreState storage state = SalesStorage.getStoreState();
    //     sale = state.sale[saleId];
    // }

    // Function to get all sales (returns an array of Sale structs)
    // function getAllSales() external view onlyAdminAndSalesRep returns (SalesStorage.Sale[] memory allSales) {
    //     SalesStorage.StoreState storage state = SalesStorage.getStoreState();

    //     uint256 totalSales = state.saleCounter;
    //     allSales = new SalesStorage.Sale[](totalSales);

    //     for (uint256 i = 1; i <= totalSales; i++) {
    //         allSales[i - 1] = state.sales[i];
    //     }
    // }

    

     function getTotalSales() external view returns (uint256) {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        return state.saleCounter;
    }



    // Helper function to generate sale ID
    function _generateSaleId(uint256 saleIndex, uint256 timestamp) internal pure returns (string memory) {
        bytes32 hash = keccak256(abi.encodePacked(saleIndex, timestamp));
        return bytes32ToHexString(hash);
    }

    // Helper function to convert bytes32 to hex string (first 16 characters)
    function bytes32ToHexString(bytes32 _bytes32) internal pure returns (string memory) {
        bytes memory HEX = "0123456789abcdef";
        bytes memory _string = new bytes(16);
        for (uint i = 0; i < 8; i++) {
            _string[i*2] = HEX[uint8(_bytes32[i] >> 4)];
            _string[i*2+1] = HEX[uint8(_bytes32[i] & 0x0f)];
        }
        return string(_string);
    }

     // Helper function to convert ModeOfPayment to string
    function _modeOfPaymentToString(SalesStorage.ModeOfPayment paymentMode) internal pure returns (string memory) {
        if (paymentMode == SalesStorage.ModeOfPayment.POS) return "POS";
        if (paymentMode == SalesStorage.ModeOfPayment.Cash) return "Cash";
        if (paymentMode == SalesStorage.ModeOfPayment.BankTransfer) return "Bank transfer";
        return "";
    }
}
