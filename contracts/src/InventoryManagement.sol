// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";

contract InventoryManagement {
    // Custom errors
    error ProductExist();
    error ProductDoesNotExist();
    error ProductOutOfStock();
    error InsufficientStock(uint256 productId, uint256 requested, uint256 available);

    // Events
    event ProductAdded(
        uint256 indexed productID,
        string indexed productName,
        uint256 productPrice,
        uint256 quantity,
        address uploader,
        uint256 dateAdded
    );
    event ProductStockIsLow(uint256 indexed productID, uint256 indexed quantity);
    event ProductUpdated(
        uint256 indexed productID, string indexed productName, uint256 indexed productPrice, string barcode
    );
    event ProductDeleted(uint256 indexed productID);
    event ProductRestocked(uint256 indexed _productID, uint256 indexed amountRestocked, uint256 indexed currentStock);

    modifier onlyStoreOwner() {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        if (msg.sender != staffState.storeOwner) revert SalesStorage.NotStoreOwner();
        _;
    }

    modifier onlyAdminAndSalesRep() {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        SalesStorage.Staff memory caller = staffState.staffDetails[msg.sender];
        require(
            caller.role == SalesStorage.Role.SalesRep || caller.role == SalesStorage.Role.Administrator,
            SalesStorage.NotSalesRepOrAdministrator()
        );
        _;
    }

    function addNewProduct(
        uint256 _productID,
        string memory _productName,
        uint256 _productPrice,
        uint256 _quantity,
        string memory _barcode
    ) public onlyStoreOwner {
        if (msg.sender == address(0)) revert SalesStorage.AddressZeroDetected();
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";

        // Check if product already exists
        require(state.products[_productID].uploader == address(0), ProductExist());

        state.productsIDArray.push(_productID);
        state.products[_productID] = SalesStorage.Product({
            productId: _productID,
            productName: _productName,
            productPrice: _productPrice,
            quantity: _quantity,
            uploader: msg.sender,
            dateAdded: block.timestamp,
            barcode: barcode
        });

        emit ProductAdded(_productID, _productName, _productPrice, _quantity, msg.sender, block.timestamp);
    }

    function updateProduct(
        uint256 _productID,
        string memory _productName,
        uint256 _productPrice,
        string memory _barcode
    ) public onlyStoreOwner {
        if (msg.sender == address(0)) revert SalesStorage.AddressZeroDetected();
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";

        if (state.products[_productID].uploader == address(0)) revert ProductDoesNotExist();

        state.products[_productID].productPrice = _productPrice;
        state.products[_productID].barcode = barcode;

        emit ProductUpdated(_productID, _productName, _productPrice, _barcode);
    }

    function restockProduct(SalesStorage.SaleItem[] calldata _products) public onlyStoreOwner {
        if (msg.sender == address(0)) revert SalesStorage.AddressZeroDetected();
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();

        for (uint256 i = 0; i < _products.length; i++) {
            SalesStorage.Product storage product = state.products[_products[i].productId];
            if (product.uploader == address(0)) revert ProductDoesNotExist();
            product.quantity += _products[i].quantity;
            emit ProductRestocked(_products[i].productId, _products[i].quantity, product.quantity);
        }
    }

    function getProduct(uint256 _productID) public view onlyAdminAndSalesRep returns (SalesStorage.Product memory) {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();

        if (state.products[_productID].uploader == address(0)) revert ProductDoesNotExist();
        return state.products[_productID];
    }

    function getAllProduct() public view onlyAdminAndSalesRep returns (SalesStorage.Product[] memory) {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        uint256[] memory productIds = state.productsIDArray;
        uint256 noOfProducts = productIds.length;

        SalesStorage.Product[] memory allProducts = new SalesStorage.Product[](noOfProducts);
        for (uint256 i = 0; i < noOfProducts; i++) {
            allProducts[i] = state.products[productIds[i]];
        }
        return allProducts;
    }

    function deleteProduct(uint256 _productID) public onlyStoreOwner {
        if (msg.sender == address(0)) revert SalesStorage.AddressZeroDetected();
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();

        if (state.products[_productID].uploader == address(0)) revert ProductDoesNotExist();

        SalesStorage.deleteProductIdFromArray(_productID);
        delete state.products[_productID];

        emit ProductDeleted(_productID);
    }

    function _reduceProductCount(uint256 productId, uint256 quantity) internal {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        uint256 availableStock = state.products[productId].quantity;

        if (availableStock == 0) revert ProductOutOfStock();
        require(availableStock >= quantity, InsufficientStock(productId, quantity, availableStock));

        if ((availableStock - quantity) <= state.productLowMargin) {
            emit ProductStockIsLow(productId, (availableStock - quantity));
        }
        state.products[productId].quantity -= quantity;
    }
}
