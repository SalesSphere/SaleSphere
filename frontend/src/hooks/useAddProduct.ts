import { CONTRACTADDRESS } from "@/lib/constants";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { client } from "@/app/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toBigInt } from "ethers";
import useProduct from "./useReadContract";

const liskSepolia = defineChain(4202);

const formSchema = z.object({
  _productName: z.string().min(1, {
    message: "This field is required",
  }),
  _productPrice: z.string().min(1, {
    message: "This field is required",
  }),
  _quantity: z.string().min(1, {
    message: "This field is required",
  }),
  _barcode: z.string().min(1, {
    message: "This field is required",
  }),
});

export const useAddProduct = () => {
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _productName: "",
      _productPrice: "",
      _quantity: "",
      _barcode: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const transaction = prepareContractCall({
      contract,
      method:
        "function addNewProduct(uint256 _productID, string memory _productName, uint256 _productPrice, uint256 _quantity, string memory _barcode ) public",
      params: [
        toBigInt(Math.floor(Math.random() * 1000000)),
        values._productName,
        toBigInt(values._productPrice),
        toBigInt(values._quantity),
        values._barcode,
      ], // type safe params
    });
    sendTransaction(transaction).then((res) => {
      console.log(res);
      allProductRefetch();
      form.reset();
      form.setValue("_barcode", "");
      form.setValue("_productName", "");
      form.setValue("_productPrice", "");
      form.setValue("_quantity", "");
    });
  }

  return {
    form,
    onSubmit,
    isError,
    isPending,
    error,
  };
};
