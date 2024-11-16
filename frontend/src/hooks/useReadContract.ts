import { CHAIN } from "@/app/chain";
import { client } from "@/app/client";
import { CONTRACTADDRESS } from "@/lib/constants";
import { getContract, defineChain } from "thirdweb";
import {
  useActiveAccount,
  useReadContract,
  useWalletBalance,
} from "thirdweb/react";

const liskSepolia = defineChain(4202);

export default function useProduct(productId?: number) {
  const contract = getContract({
    client,
    address: CONTRACTADDRESS,
    chain: liskSepolia,
  });

  const {
    data: allProductData,
    isLoading: allProductLoading,
    error: allProductError,
  } = useReadContract({
    contract,
    method:
      "function getAllProduct() view returns ((uint256 productID, string productName, uint256 productPrice, uint256 quantity, address uploader, uint256 dateAdded, string barcode)[])",
    params: [],
  });

 
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
  };
}
