// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

import { Script, console } from "forge-std/Script.sol";
import { SaleSphere } from "../src/SaleSphere.sol";

contract SaleSphereScript is Script {
    SaleSphere public saleSphere;
    uint16 maxAdmins = 10;
    uint16 productLowMargin = 10;

    function setUp() public { }

    function run() public {
        uint256 privateKey = vm.envUint("DO_NOT_LEAK");
        address owner = vm.envAddress("INITIAL_OWNER");
        console.log("Contract owner: ", owner);

        vm.startBroadcast(privateKey);

        saleSphere = new SaleSphere(owner, maxAdmins, productLowMargin);

        vm.stopBroadcast();
    }
}
