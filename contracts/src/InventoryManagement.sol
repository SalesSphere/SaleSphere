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
        SalesStorage.Staff memory caller = staffState.staffDetails[msg.sender];
        require(caller.role == SalesStorage.Role.Administrator, SalesStorage.NotAnAdministrator());
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
        string calldata _productName,
        uint256 _productPrice,
        uint256 _quantity,
        string calldata _barcode
    ) external onlyAdmin validAddress(msg.sender) productNotExists(_productID) {
        if (bytes(_productName).length == 0) revert EmptyProductName();
        if (_productPrice <= MINIMUM_PRICE) revert InvalidPrice();
        if (_quantity > MAXIMUM_QUANTITY) revert InvalidQuantity();

        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";
    require(
    SalesStorage.getStaffState().staffDetails[msg.sender].status == SalesStorage.Status.Active,
    NotActiveStaff());

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

    if (state.products[_productID].uploader == address(0)) revert ProductDoesNotExist();

        state.products[_productID].productName = _productName;
        state.products[_productID].productPrice = _productPrice;
        state.products[_productID].barcode = barcode;

        emit ProductUpdated(_productID, _productName, _productPrice, _barcode);
    }

function restockProduct(SalesStorage.SaleItem[] calldata _products) public onlyAdmin {
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
        
        product.quantity = newQuantity;
    }
}