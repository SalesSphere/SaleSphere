// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Script, console } from "forge-std/Script.sol";
import { SaleSphere } from "../src/SaleSphere.sol";

contract SaleSphereScript is Script {
    SaleSphere public saleSphere;

    function setUp() public { }

    function run() public {
        vm.startBroadcast(vm.envUint("DO_NOT_LEAK"));

        saleSphere = new SaleSphere();

        vm.stopBroadcast();
    }
}
