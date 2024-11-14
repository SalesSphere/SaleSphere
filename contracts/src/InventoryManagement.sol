// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";

contract InventoryManagement {
    error ProductDoesNotExist();
    error AddressZeroDetected();

    uint8 constant LOW_MARGIN = 10;

    event ProductAdded(
        uint256 indexed productID,
        string indexed productName,
        uint256 productPrice,
        uint256 quantity,
        address uploader,
        uint256 dateAdded
    );
    event ProductStockIsLow(uint256 indexed productID, uint256 indexed quantity);
    event ProductUpdated(uint256 indexed productID, string indexed productName, uint256 productPrice, uint256 quantity);
    event ProductDeleted(uint256 indexed productID);
    // event StockLow(uint256 indexed productID, string indexed productName, uint256 quantity);

    function addNewProduct(string memory _productName, uint256 _productPrice, uint256 _quantity, string memory _barcode)
        public
    {
        if (msg.sender == address(0)) revert AddressZeroDetected();
        SalesStorage.State storage state = SalesStorage.getState();
        uint256 productID = ++state.productCounter;
        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";

        state.products[productID] = SalesStorage.Product({
            productID: productID,
            productName: _productName,
            productPrice: _productPrice,
            quantity: _quantity,
            uploader: msg.sender,
            dateAdded: block.timestamp,
            barcode: barcode
        });

        emit ProductAdded(productID, _productName, _productPrice, _quantity, msg.sender, block.timestamp);
    }

    function updateProduct(
        uint256 productID,
        string memory _productName,
        uint256 _productPrice,
        uint256 _quantity,
        string memory _barcode
    ) public {
        if (msg.sender == address(0)) revert AddressZeroDetected();
        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";

        SalesStorage.State storage state = SalesStorage.getState();
        if (state.products[productID].productID == 0) revert ProductDoesNotExist();

        state.products[productID].productName = _productName;
        state.products[productID].productPrice = _productPrice;
        state.products[productID].quantity = _quantity;
        state.products[productID].barcode = barcode;

        emit ProductUpdated(productID, _productName, _productPrice, _quantity);
    }

    function getProduct(uint256 productID) public view returns (SalesStorage.Product memory) {
        if (msg.sender == address(0)) revert AddressZeroDetected();

        SalesStorage.State storage state = SalesStorage.getState();

        if (state.products[productID].productID == 0) revert ProductDoesNotExist();
        return state.products[productID];
    }

    function getAllProduct() public view returns (SalesStorage.Product[] memory) {
        if (msg.sender == address(0)) revert AddressZeroDetected();

        SalesStorage.State storage state = SalesStorage.getState();
        uint256 productCount = state.productCounter;

        SalesStorage.Product[] memory allProducts = new SalesStorage.Product[](productCount);
        for (uint256 i = 0; i < productCount; i++) {
            allProducts[i] = state.products[i + 1];
        }
        return allProducts;
    }

    function deleteProduct(uint256 productID) public {
        if (msg.sender == address(0)) revert AddressZeroDetected();
        SalesStorage.State storage state = SalesStorage.getState();

        if (state.products[productID].productID == 0) revert ProductDoesNotExist();

        delete state.products[productID];

        emit ProductDeleted(productID);
    }

    function reduceProductCount(uint256 productId, uint256 quantity) internal {
        SalesStorage.State storage state = SalesStorage.getState();
        uint256 availableStock = state.products[productId].quantity;

        if (availableStock == 0) revert ProductDoesNotExist();
        require(availableStock >= quantity, SalesStorage.InsufficientStock(productId, quantity, availableStock));

        if ((availableStock - quantity) <= LOW_MARGIN) emit ProductStockIsLow(productId, (availableStock - quantity));
        state.products[productId].quantity -= quantity;
    }

    // Internal function to check stock levels and emit alert if below reorder point
    // function _checkStockLevels(uint256 productID) internal {
    //     Products storage product = products[productID];
    //     if (product.quantity <= product.reorderPoint) {
    //         emit StockLow(productID, product.productName, product.quantity);
    //     }
    // }
}
