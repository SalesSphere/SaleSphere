import { CONTRACTADDRESS } from "@/lib/constants";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { client } from "@/app/client";
import { toBigInt } from "ethers";
import useProduct from "./useReadContract";

const liskSepolia = defineChain(4202);

export const useRecordSales = () => {
  const { allProductRefetch } = useProduct();
  const contract = getContract({
    client,
    address: CONTRACTADDRESS,
    chain: liskSepolia,
  });

  const {
    mutateAsync: sendTransaction,
    isError,
    isPending,
    error,
  } = useSendTransaction();

  const recordSale = async (
    items: { productId: number; quantity: number }[],
    totalAmount: number,
    paymentMode: number
  ) => {
    try {
      const transaction = await prepareContractCall({
        contract,
        method:
          "function recordSale((uint256 productId, uint256 quantity)[] items, uint256 totalAmount, uint8 paymentMode) returns (string)",
        params: [
          items.map((item) => ({
            productId: toBigInt(item.productId),
            quantity: toBigInt(item.quantity),
          })),
          toBigInt(totalAmount),
          paymentMode,
        ],
      });

      await sendTransaction(transaction);
      await allProductRefetch();
    } catch (err) {
      console.error("Error recording sale:", err);
    }
  };

  return {
    recordSale,
    isError,
    isPending,
    error,
  };
};
