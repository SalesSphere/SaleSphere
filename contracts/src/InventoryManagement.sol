// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SalesStorage } from "./library/SalesStorage.sol";

contract InventoryManagement {
    // Custom errors
    error ProductExist(uint256 productId);
    error ProductOutOfStock(uint256 productId);
    error InsufficientStock(uint256 productId, uint256 requested, uint256 available);
    error EmptyProductName();
    error InvalidPrice();
    error InvalidQuantity();

    // Events
    event ProductAdded(
        uint256 indexed productID,
        string productName,
        uint256 productPrice,
        uint256 quantity,
        address indexed uploader,
        uint256 dateAdded
    );
    event ProductStockIsLow(uint256 indexed productID, uint256 quantity);
    event ProductUpdated(uint256 indexed productID, string productName, uint256 productPrice, string barcode);
    event ProductDeleted(uint256 indexed productID);
    event ProductRestocked(uint256 indexed productID, uint256 amountRestocked, uint256 currentStock);

    uint256 private constant MINIMUM_PRICE = 0;
    uint256 private constant MAXIMUM_QUANTITY = 1e6; // 1 million units as maximum quantity

    modifier onlyAdmin() {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        if (staffState.staffDetails[msg.sender].role != SalesStorage.Role.Administrator) {
            revert SalesStorage.NotAnAdministrator();
        }
        _;
    }

    modifier onlyAdminAndSalesRep() {
        SalesStorage.StaffState storage staffState = SalesStorage.getStaffState();
        SalesStorage.Role role = staffState.staffDetails[msg.sender].role;
        if (role != SalesStorage.Role.SalesRep || role != SalesStorage.Role.Administrator) {
            revert SalesStorage.NotSalesRepOrAdministrator();
        }
        _;
    }

    modifier validAddress(address account) {
        if (account == address(0)) revert SalesStorage.AddressZeroDetected();
        _;
    }

    function _getProduct(uint256 productId) private view returns (SalesStorage.Product storage) {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        return state.products[productId];
    }

    modifier productExists(uint256 productId) {
        if (_getProduct(productId).uploader == address(0)) {
            revert SalesStorage.ProductDoesNotExist(productId);
        }
        _;
    }

    modifier productNotExists(uint256 productId) {
        if (_getProduct(productId).uploader != address(0)) {
            revert ProductExist(productId);
        }
        _;
    }

    function addNewProduct(
        uint256 _productID,
        string calldata _productName,
        uint256 _productPrice,
        uint256 _quantity,
        string calldata _barcode
    ) external onlyAdmin validAddress(msg.sender) productNotExists(_productID) {
        if (bytes(_productName).length == 0) revert EmptyProductName();
        if (_productPrice <= MINIMUM_PRICE) revert InvalidPrice();
        if (_quantity > MAXIMUM_QUANTITY) revert InvalidQuantity();

        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";

        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
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
        string calldata _productName,
        uint256 _productPrice,
        string calldata _barcode
    ) external onlyAdmin validAddress(msg.sender) productExists(_productID) {
        if (bytes(_productName).length == 0) revert EmptyProductName();
        if (_productPrice <= MINIMUM_PRICE) revert InvalidPrice();

        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";

        SalesStorage.Product storage product = _getProduct(_productID);
        product.productName = _productName;
        product.productPrice = _productPrice;
        product.barcode = barcode;

        emit ProductUpdated(_productID, _productName, _productPrice, _barcode);
    }

    function restockProduct(
        SalesStorage.SaleItem[] calldata _products
    ) external onlyAdmin validAddress(msg.sender) {
        uint256 productsLength = _products.length;
        for (uint256 i; i < productsLength;) {
            uint256 productId = _products[i].productId;
            uint256 quantity = _products[i].quantity;
            
            if (quantity == 0 || quantity > MAXIMUM_QUANTITY) revert InvalidQuantity();
            
            SalesStorage.Product storage product = _getProduct(productId);
            if (product.uploader == address(0)) revert SalesStorage.ProductDoesNotExist(productId);
            
            // Check for overflow
            uint256 newQuantity = product.quantity + quantity;
            if (newQuantity > MAXIMUM_QUANTITY) revert InvalidQuantity();
            
            product.quantity = newQuantity;
            emit ProductRestocked(productId, quantity, newQuantity);
            
            unchecked { ++i; }
        }
    }

    function getAllProducts() external view returns (SalesStorage.Product[] memory) {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        uint256[] memory productIds = state.productsIDArray;
        uint256 noOfProducts = productIds.length;

        SalesStorage.Product[] memory allProducts = new SalesStorage.Product[](noOfProducts);
        for (uint256 i; i < noOfProducts;) {
            allProducts[i] = state.products[productIds[i]];
            unchecked { ++i; }
        }
        return allProducts;
    }

    function getProduct(
        uint256 _productID
    ) external view productExists(_productID) returns (SalesStorage.Product memory) {
        return _getProduct(_productID);
    }
    function deleteProduct(
        uint256 _productID
    ) external onlyAdmin validAddress(msg.sender) productExists(_productID) {
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        SalesStorage.deleteProductIdFromArray(_productID);
        delete state.products[_productID];
        emit ProductDeleted(_productID);
    }

    function _reduceProductCount(uint256 productId, uint256 quantity) internal {
        SalesStorage.Product storage product = _getProduct(productId);
        uint256 availableStock = product.quantity;

        if (availableStock == 0) revert ProductOutOfStock(productId);
        if (availableStock < quantity) revert InsufficientStock(productId, quantity, availableStock);

        uint256 newQuantity = availableStock - quantity;
        SalesStorage.StoreState storage state = SalesStorage.getStoreState();
        if (newQuantity <= state.productLowMargin) {
            emit ProductStockIsLow(productId, newQuantity);
        }
        
        product.quantity = newQuantity;
    }
}