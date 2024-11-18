import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SaleSphereModule = buildModule("SaleSphereModule", (m) => {
    const maxAdmins = 10;
    const productLowMargin = 10;

    // Get the signer's address: using the address at index 0
    const owner = process.env.INITIAL_OWNER!;
    console.log("Contract owner: ", owner);

    // Deploy with constructor arguments
    const saleSphere = m.contract("SaleSphere", [owner, maxAdmins, productLowMargin]);

    return { saleSphere };
});

export default SaleSphereModule;
