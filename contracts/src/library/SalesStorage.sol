// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

library SalesStorage {
    // Global custom errors
    error AddressZeroDetected();
    error NotSalesRep();

    // Storage positions
    bytes32 constant STORE_STATE_POSITION = keccak256("sales.storage.store.state");
    bytes32 constant STAFF_STATE_POSITION = keccak256("sales.storage.staff.state");

    /**
     * Store storage
     */
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
        uint256 productId;
        string productName;
        uint256 productPrice;
        uint256 quantity;
        address uploader;
        uint256 dateAdded;
        string barcode;
    }

    struct StoreState {
        uint256 saleCounter; // Counter to track the sale ID
        mapping(uint256 => Sale) sales; // Mapping of sale ID to Sale struct
        uint256 productCounter; // Counter to track the products ID
        uint16 productLowMargin; // The margin to signal a low stock
        mapping(uint256 => Product) products; // Mapping of productId to products struct
        uint256[] productsIDArray;
    }

    // Function to retrieve store storage
    function getStoreState() internal pure returns (StoreState storage storeState) {
        bytes32 position = STORE_STATE_POSITION;
        assembly {
            storeState.slot := position
        }
    }

    /**
     * Staff storage
     */
    // Define roles using an enum
    enum Role {
        Administrator,
        SalesRep
    }

    struct Staff {
        uint256 staffID;
        string name;
        Role role;
    }

    struct StaffState {
        uint16 maxAdmins; // Max number of admins allowed (set by store owner)
        address storeOwner; // Store owner's address
        uint32 adminCount; // To track the number of administrators
        // Mapping to store staff details by staffID
        mapping(address => Staff) staffDetails;
        mapping(uint256 => address) staffIDToAddress;
        address[] staffAddressArray;
    }

    // Function to retrieve staff storage
    function getStaffState() internal pure returns (StaffState storage staffState) {
        bytes32 position = STAFF_STATE_POSITION;
        assembly {
            staffState.slot := position
        }
    }

    function setInitials(uint16 maxAdmins, uint16 productLowMargin) internal {
        StaffState storage staffState = getStaffState();
        staffState.storeOwner = msg.sender;
        staffState.maxAdmins = maxAdmins;

        StoreState storage state = getStoreState();
        state.productLowMargin = productLowMargin;
    }

    function deleteStaffIDFromArray(address _staffAddr) internal {
        StaffState storage staffState = getStaffState();
        address[] memory _staffsAddresses = staffState.staffAddressArray;
        uint256 staffsCount = _staffsAddresses.length;
        for (uint256 i = 0; i < staffsCount; i++) {
            if (_staffsAddresses[i] == _staffAddr) {
                staffState.staffAddressArray[i] = _staffsAddresses[staffsCount - 1];
                staffState.staffAddressArray.pop();
                break;
            }
        }
    }

    function deleteProductIdFromArray(uint256 _productId) internal {
        StoreState storage store = getStoreState();
        uint256[] memory productsIDs = store.productsIDArray;
        uint256 noOfProducts = productsIDs.length;
        for (uint256 i = 0; i < noOfProducts; i++) {
            if (productsIDs[i] == _productId) {
                store.productsIDArray[i] = productsIDs[noOfProducts - 1];
                store.productsIDArray.pop();
                break;
            }
        }
    }
}
