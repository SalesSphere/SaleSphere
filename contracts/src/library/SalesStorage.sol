// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

library SalesStorage {
    // Custom errors
    error InsufficientStock(uint256 productId, uint256 requested, uint256 available);

    enum ModeOfPayment {
        POS,
        Cash,
        BankTransfer
    }

    struct SaleItem {
        uint256 productId;
        uint256 quantity;
    }

    struct Sale {
        SaleItem[] items;
        uint256 totalAmount;
        uint256 timestamp;
        address cashierId;
        ModeOfPayment paymentMode;
    }

    struct Product {
        uint256 productID;
        string productName;
        uint256 productPrice;
        uint256 quantity;
        address uploader;
        uint256 dateAdded;
        string barcode;
    }

    struct State {
        uint256 saleCounter; // Counter to track the sale ID
        mapping(uint256 => Sale) sales; // Mapping of sale ID to Sale struct
        uint256 productCounter; // Counter to track the products ID
        mapping(uint256 => Product) products; // Mapping of productId to products struct
    }

    // Function to retrieve storage
    function getState() internal pure returns (State storage state) {
        bytes32 position = keccak256("sales.storage.state");
        assembly {
            state.slot := position
        }
    }
}
