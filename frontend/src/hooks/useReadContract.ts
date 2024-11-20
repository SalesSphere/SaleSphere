import { CHAIN } from "@/app/chain";
import { client } from "@/app/client";
import { CONTRACTADDRESS } from "@/lib/constants";
import { toBigInt } from "ethers";
import { getContract, defineChain } from "thirdweb";
import {
  useActiveAccount,
  useReadContract,
  useWalletBalance,
} from "thirdweb/react";

const liskSepolia = defineChain(4202);

export default function useProduct() {
  const contract = getContract({
    client,
    address: CONTRACTADDRESS,
    chain: liskSepolia,
  });

  const {
    data: allProductData,
    isLoading: allProductLoading,
    error: allProductError,
    refetch: allProductRefetch,
  } = useReadContract({
    contract,
    method:
      "function getAllProducts() view returns ((uint256 productID, string productName, uint256 productPrice, uint256 quantity, address uploader, uint256 dateAdded, string barcode)[])",
    params: [],
  });

  const {
    data: salesData,
    isLoading: salesLoading,
    error: salesError,
  } = useReadContract({
    contract,
    method:
      "function getAllSalesDisplay(uint256 startIndex, uint256 endIndex) view returns ((uint256 saleId, string productName, uint256 productPrice, uint256 quantity, string seller, string modeOfPayment)[])",
    params: [toBigInt(1), toBigInt(5)],
  });

  console.log(salesData);
  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useReadContract({
    contract,
    method:
      "function getProduct(uint256 productID) view returns ((uint256 productID, string productName, uint256 productPrice, uint256 quantity, address uploader, uint256 dateAdded, string barcode))",
    params: [BigInt(2)],
  });

  const account = useActiveAccount();

  // Wallet balance hook
  const { data: balance, isLoading: balanceLoading } = useWalletBalance({
    client: client,
    chain: CHAIN,
    address: account?.address,
  });
  return {
    allProductData,
    allProductLoading,
    allProductError,
    productData,
    productLoading,
    productError,
    balance,
    account,
    salesData,
    salesLoading,
    salesError,
    allProductRefetch,
    balanceLoading,
  };
}
