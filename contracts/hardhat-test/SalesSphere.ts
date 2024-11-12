import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("SalesSphere contract", function () {
  async function deployTokenFixture() {
    // Get the Signers here.
    const [owner] = await ethers.getSigners();

    const salesSphere = await ethers.deployContract("SalesSphere", owner);
    await salesSphere.waitForDeployment();

    return { salesSphere, owner };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { salesSphere, owner } = await loadFixture(deployTokenFixture);

      expect(await salesSphere.owner()).to.equal(owner);
    });
  });
});
