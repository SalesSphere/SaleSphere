// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Test } from "forge-std/Test.sol";
import { SaleSphere } from "../../src/SaleSphere.sol";
import { SalesStorage } from "../../src/library/SalesStorage.sol";
import { SalesContract } from "../../src/SalesContract.sol";

contract SaleSphereTest is Test {
    SaleSphere saleSphere;

    function setUp() public {
        saleSphere = new SaleSphere();
        saleSphere.setNumber(0);

        // Initialize inventory using setInventory function
        saleSphere.addNewProduct("Product 1", 20, 10, ""); // productId 1, price 20, quantity 10
        saleSphere.addNewProduct("Product 2", 15, 5, ""); // productId 2, price 15, quantity 5
    }

    function test_Increment() public {
        saleSphere.increment();
        assertEq(saleSphere.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        saleSphere.setNumber(x);
        assertEq(saleSphere.number(), x);
    }

    function testRecordSaleSuccess() public {
        SalesStorage.SaleItem[] memory items = new SalesStorage.SaleItem[](2);
        items[0] = SalesStorage.SaleItem({ productId: 1, quantity: 3 });
        items[1] = SalesStorage.SaleItem({ productId: 2, quantity: 4 });

        uint256 totalAmount = 100;
        SalesStorage.ModeOfPayment paymentMode = SalesStorage.ModeOfPayment.Cash;
        uint256 saleCounter = 1;

        // Expect the SaleRecorded event to be emitted with correct values
        vm.expectEmit(true, true, true, false);
        emit SalesContract.SaleRecorded(saleCounter, address(this), totalAmount, block.timestamp, paymentMode);

        // Call recordSale function to execute the saleSphere
        saleSphere.recordSale(items, totalAmount, paymentMode);
    }

    function testRecordSaleInsufficientStock() public {
        SalesStorage.SaleItem[] memory items = new SalesStorage.SaleItem[](2);
        items[0] = SalesStorage.SaleItem({ productId: 1, quantity: 3 });
        items[1] = SalesStorage.SaleItem({ productId: 2, quantity: 10 }); // Exceeds available stock

        uint256 totalAmount = 100;
        SalesStorage.ModeOfPayment paymentMode = SalesStorage.ModeOfPayment.Cash;

        // Expect the InsufficientStock error to be reverted with specific parameters
        vm.expectRevert(
            abi.encodeWithSelector(
                SalesStorage.InsufficientStock.selector,
                2, // productId
                10, // requested quantity
                5 // available stock
            )
        );

        // Attempt to call recordSale, which should revert due to insufficient stock
        saleSphere.recordSale(items, totalAmount, paymentMode);
    }
}
