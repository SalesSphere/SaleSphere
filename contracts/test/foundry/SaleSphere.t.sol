// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { SaleSphere } from "../../src/SaleSphere.sol";
import { SalesStorage } from "../../src/library/SalesStorage.sol";
import { InventoryManagement } from "../../src/InventoryManagement.sol";

contract SaleSphereTest is Test {
    SaleSphere saleSphere;
    address salesRep = vm.addr(1);

    // Constructor parameters for SaleSphere
    uint16 maxAdmins = 10;
    uint16 productLowMargin = 10;

    function setUp() public {
        // Deploy SaleSphere contract with constructor parameters
        saleSphere = new SaleSphere(maxAdmins, productLowMargin);

        // Initialize inventory using addNewProduct function
        saleSphere.addNewProduct(1, "Product 1", 20, 10, ""); // productId 1, price 20, quantity 10
        saleSphere.addNewProduct(2, "Product 2", 15, 5, ""); // productId 2, price 15, quantity 5

        // Add sales rep
        saleSphere.addStaff(salesRep, 1, "Tester", SalesStorage.Role.SalesRep);
    }

    function testRecordSaleInsufficientStock() public {
        // Prepare sale items with insufficient stock
        SalesStorage.SaleItem[] memory items = new SalesStorage.SaleItem[](2);
        items[0] = SalesStorage.SaleItem({ productId: 1, quantity: 3 });
        items[1] = SalesStorage.SaleItem({ productId: 2, quantity: 10 }); // Exceeds available stock

        uint256 totalAmount = 100;
        SalesStorage.ModeOfPayment paymentMode = SalesStorage.ModeOfPayment.Cash;

        // Expect the transaction to revert with the custom error 'InsufficientStock'
        vm.expectRevert(
            abi.encodeWithSelector(
                InventoryManagement.InsufficientStock.selector,
                2, // productId
                10, // requested quantity
                5 // available stock
            )
        );

        // Attempt to record the sale
        vm.prank(salesRep);
        saleSphere.recordSale(items, totalAmount, paymentMode);
    }

    function testRecordSaleSuccess() public {
        // Prepare sale items
        SalesStorage.SaleItem[] memory items = new SalesStorage.SaleItem[](2);
        items[0] = SalesStorage.SaleItem({ productId: 1, quantity: 3 });
        items[1] = SalesStorage.SaleItem({ productId: 2, quantity: 4 });

        uint256 totalAmount = 100; // Example total amount
        SalesStorage.ModeOfPayment paymentMode = SalesStorage.ModeOfPayment.Cash;

        vm.startPrank(salesRep);
        // Call recordSale function to execute the sale
        saleSphere.recordSale(items, totalAmount, paymentMode);

        // Fetch the product details
        SalesStorage.Product memory product1 = saleSphere.getProduct(1);
        SalesStorage.Product memory product2 = saleSphere.getProduct(2);
        vm.stopPrank();

        // Validate inventory updates
        assertEq(product1.quantity, 7, "Product 1 quantity mismatch"); // 10 - 3
        assertEq(product2.quantity, 1, "Product 2 quantity mismatch"); // 5 - 4
    }
}
