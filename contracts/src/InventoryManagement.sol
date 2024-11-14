// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract InventoryManagement {
    error ProductDoesNotExist();
    error AddressZeroDetected();

    struct Products {
        uint256 productID;
        string productName;
        uint256 productPrice;
        uint256 quantity;
        address uploader;
        uint256 dateAdded;
        string barcode;
    }

    mapping(uint256 => Products) private products;
    uint256[] private productIDs;
    uint256 private nextProductID = 1;

    event ProductAdded(
        uint256 indexed productID,
        string indexed productName,
        uint256 productPrice,
        uint256 quantity,
        address uploader,
        uint256 dateAdded
    );
    
    event ProductUpdated(uint256 indexed productID, string indexed productName, uint256 productPrice, uint256 quantity);
    event ProductDeleted(uint256 indexed productID);
    // event StockLow(uint256 indexed productID, string indexed productName, uint256 quantity);

    function addNewProduct(
        string memory _productName,
        uint256 _productPrice,
        uint256 _quantity,
        string _barcode
    ) public {
        if(msg.sender == address(0)) revert AddressZeroDetected();

        uint256 productID = nextProductID++;

        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";

        products[productID] = Products({
            productID: productID,
            productName: _productName,
            productPrice: _productPrice,
            quantity: _quantity,
            uploader: msg.sender,
            dateAdded: block.timestamp,
            barcode: barcode
        });

        productIDs.push(productID);

        emit ProductAdded(productID, _productName, _productPrice, _quantity, msg.sender, block.timestamp);
    }

    function updateProduct(
        uint256 productID,
        string memory _productName,
        uint256 _productPrice,
        uint256 _quantity,
        string _barcode
    ) public {
        if(msg.sender == address(0)) revert AddressZeroDetected();

        if(products[productID].productID == 0) revert ProductDoesNotExist();

        string memory barcode = bytes(_barcode).length > 0 ? _barcode : "";

        products[productID].productName = _productName;
        products[productID].productPrice = _productPrice;
        products[productID].quantity = _quantity;
        products[productID].barcode = barcode;

        emit ProductUpdated(productID, _productName, _productPrice, _quantity);
    }

    function getProduct(uint256 productID) public view returns (Products memory) {
        if(msg.sender == address(0)) revert AddressZeroDetected();

       if(products[productID].productID == 0) revert ProductDoesNotExist();
        return products[productID];
    }

    function getAllProduct() public view returns (Products[] memory) {
        if(msg.sender == address(0)) revert AddressZeroDetected();

        Products[] memory allProducts = new Products[](productIDs.length);
        for (uint256 i = 0; i < productIDs.length; i++) {
            allProducts[i] = products[productIDs[i]];
        }
        return allProducts;
    }

    function deleteProduct(uint256 productID) public {
        if(msg.sender == address(0)) revert AddressZeroDetected();

        if (products[productID].productID == 0) revert ProductDoesNotExist();

        delete products[productID];

        emit ProductDeleted(productID);
    }

    // Internal function to check stock levels and emit alert if below reorder point
    // function _checkStockLevels(uint256 productID) internal {
    //     Products storage product = products[productID];
    //     if (product.quantity <= product.reorderPoint) {
    //         emit StockLow(productID, product.productName, product.quantity);
    //     }
    // }
}
