// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract InventoryManagement {
    error ProductDoesNotExist();

    struct Products {
        uint256 productID;
        string productName;
        uint256 productPrice;
        uint256 quantity;
        address uploader;
        uint256 dateAdded;
        uint256 reorderPoint;
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
    event StockLow(uint256 indexed productID, string indexed productName, uint256 quantity);

    function addNewProduct(
        string memory _productName,
        uint256 _productPrice,
        uint256 _quantity,
        uint256 _reorderPoint
    ) public {
        uint256 productID = nextProductID++;

        products[productID] = Products({
            productID: productID,
            productName: _productName,
            productPrice: _productPrice,
            quantity: _quantity,
            uploader: msg.sender,
            dateAdded: block.timestamp,
            reorderPoint: _reorderPoint
        });

        productIDs.push(productID);

        emit ProductAdded(productID, _productName, _productPrice, _quantity, msg.sender, block.timestamp);

        _checkStockLevels(productID);
    }
}
