// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { Test, console } from "forge-std/Test.sol";
import { SaleSphere } from "../../src/SaleSphere.sol";

contract CounterTest is Test {
    SaleSphere public saleSphere;

    function setUp() public {
        saleSphere = new SaleSphere();
        saleSphere.setNumber(0);
    }

    function test_Increment() public {
        saleSphere.increment();
        assertEq(saleSphere.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        saleSphere.setNumber(x);
        assertEq(saleSphere.number(), x);
    }
}
