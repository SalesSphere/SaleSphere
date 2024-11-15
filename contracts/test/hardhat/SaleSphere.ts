import { expect } from "chai";
import { ethers } from "hardhat";
import { SaleSphere } from "../../typechain-types";

describe("SalesSphere contract", function () {
    describe("SaleSphere contract", function () {
        let saleSphere: SaleSphere;
        const maxAdmins = 10;
        const productLowMargin = 10;

        beforeEach(async function () {
            // Deploy the SaleSphere contract with constructor parameters
            saleSphere = await ethers.deployContract("SaleSphere", [maxAdmins, productLowMargin]);
            await saleSphere.waitForDeployment();

            // Initialize inventory using addNewProduct function
            await saleSphere.addNewProduct("Product 1", 20, 10, ""); // productId 1, price 20, quantity 10
            await saleSphere.addNewProduct("Product 2", 15, 5, ""); // productId 2, price 15, quantity 5
        });

        it("Should correctly add new products", async function () {
            // Fetch product details
            const product1 = await saleSphere.getProduct(1);
            const product2 = await saleSphere.getProduct(2);

            // Validate product 1
            expect(product1.productName).to.equal("Product 1");
            expect(product1.productPrice).to.equal(20);
            expect(product1.quantity).to.equal(10);
            expect(product1.barcode).to.equal("");

            // Validate product 2
            expect(product2.productName).to.equal("Product 2");
            expect(product2.productPrice).to.equal(15);
            expect(product2.quantity).to.equal(5);
            expect(product2.barcode).to.equal("");
        });

        it("Should successfully record a sale", async function () {
            // Prepare sale items
            const items = [
                { productId: 1, quantity: 3 },
                { productId: 2, quantity: 4 },
            ];

            const totalAmount = 100; // Example total amount
            const paymentMode = 0; // 0 represents Cash in SalesStorage.ModeOfPayment enum

            // Record the sale
            await saleSphere.recordSale(items, totalAmount, paymentMode);

            // Validate inventory updates
            const product1 = await saleSphere.getProduct(1);
            const product2 = await saleSphere.getProduct(2);

            expect(product1.quantity).to.equal(7); // 10 - 3
            expect(product2.quantity).to.equal(1); // 5 - 4
        });

        it("Should revert when stock is insufficient", async function () {
            // Prepare sale items with insufficient stock
            const items = [
                { productId: 1, quantity: 3 },
                { productId: 2, quantity: 10 }, // Exceeds available stock
            ];

            const totalAmount = 100;
            const paymentMode = 0; // 0 represents Cash in SalesStorage.ModeOfPayment enum

            // Expect the transaction to revert due to insufficient stock
            await expect(saleSphere.recordSale(items, totalAmount, paymentMode))
                .to.be.revertedWithCustomError(saleSphere, "InsufficientStock")
                .withArgs(2, 10, 5);
        });
    });
});
