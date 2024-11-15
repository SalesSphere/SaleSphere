// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

library SalesStorage {
    // Global custom errors
    error AddressZeroDetected();

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
        uint256 productID;
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
        address addr;
        string name;
        Role role;
    }

    struct StaffState {
        uint256 staffCount; // To track the total number of staff
        uint16 maxAdmins; // Max number of admins allowed (set by store owner)
        address storeOwner; // Store owner's address
        uint256 adminCount; // To track the number of administrators
        // Mapping to store staff details by staffID
        mapping(uint256 => Staff) staffDetails;
        mapping(address => uint256) staffIDByAddress; // Mapping from address to staffID
        mapping(uint256 => bool) activeStaff; // Track active staff IDs
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
}
