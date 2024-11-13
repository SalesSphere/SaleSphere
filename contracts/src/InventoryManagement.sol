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

    function updateProduct(
        uint256 productID,
        string memory _productName,
        uint256 _productPrice,
        uint256 _quantity,
        uint256 _reorderPoint
    ) public {
        if (products[productID].productID == 0) revert ProductDoesNotExist();

        products[productID].productName = _productName;
        products[productID].productPrice = _productPrice;
        products[productID].quantity = _quantity;
        products[productID].reorderPoint = _reorderPoint;

        emit ProductUpdated(productID, _productName, _productPrice, _quantity);

        _checkStockLevels(productID);
    }

    function getProduct(uint256 productID) public view returns (Products memory) {
        if (products[productID].productID == 0) revert ProductDoesNotExist();
        return products[productID];
    }

    function getAllProduct() public view returns (Products[] memory) {
        Products[] memory allProducts = new Products[](productIDs.length);
        for (uint256 i = 0; i < productIDs.length; i++) {
            allProducts[i] = products[productIDs[i]];
        }
        return allProducts;
    }
}
