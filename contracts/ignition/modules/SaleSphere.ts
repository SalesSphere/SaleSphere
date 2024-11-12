import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SaleSphereModule = buildModule("SaleSphereModule", (m) => {
    const saleSphere = m.contract("SaleSphere");

    return { saleSphere };
});

export default SaleSphereModule;
