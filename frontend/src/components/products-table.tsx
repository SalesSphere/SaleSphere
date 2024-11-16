"use client";
import React from "react";

import { CHAIN } from "@/app/chain";
import { client } from "@/app/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Link2 } from "lucide-react";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useActiveAccount, useReadContract, useWalletBalance } from "thirdweb/react";
import { inventory } from "@/lib/data";

export default function ProductsTable() {



  const account = useActiveAccount();

  // Wallet balance hook
  const { data: balance, isLoading: balanceLoading } = useWalletBalance({
    client: client,
    chain: CHAIN,
    address: account?.address,
  });

  // Define contract with proper ABI
  const contract = getContract({
    client,
    chain: defineChain(4202),
    address: "0xDABf6D27b49D1b8a5d8De0E7beF6D6a7dD743ec2",
    abi: [
      {
        name: "getString",
        type: "function",
        inputs: [],
        outputs: [{ type: "string" }],
        stateMutability: "view",
      },
      {
        name: "getNumber",
        type: "function",
        inputs: [],
        outputs: [{ type: "uint256" }], // Changed from "number" to "uint256"
        stateMutability: "view",
      },
    ],
  });

  // Read contract hooks
  const { data: contractString, isLoading: contractStringLoading, error: stringError } = useReadContract({
    contract,
    method: "getString",
    params: [],
  });

  const { data: contractNumber, isLoading: contractNumberLoading, error: numberError } = useReadContract({
    contract,
    method: "getNumber",
    params: [],
  });

  // Error handling
  const combinedError = stringError || numberError;
  if (combinedError) {
    console.error("Contract error:", combinedError);
  }

  // Loading states
  if (balanceLoading || contractStringLoading || contractNumberLoading) {
    return <div>Loading...</div>;
  }

  log

  // const contract = getContract({
  //   client,
  //   chain: defineChain(4202),
  //   address: "0xcD7530ae96194c9ebc486C23d1c711A84D1AEb59",
  //   abi: [
  //     {
  //       name: "getAllProduct",
  //       type: "function",
  //       inputs: [],
  //       outputs: [{ type: "string" }],
  //       stateMutability: "view",
  //     },
  //   ],
  // });
  // const contract = getContract({
  //   client,
  //   chain: defineChain(4202),
  //   address: "0xcD7530ae96194c9ebc486C23d1c711A84D1AEb59",

  //   abi: [
  //     {
  //       name: "getAllProduct",
  //       type: "function",
  //       inputs: [],
  //       outputs: [
  //         {
  //           components: [
  //             { name: "productID", type: "uint256" },
  //             { name: "productName", type: "string" },
  //             { name: "productPrice", type: "uint256" },
  //             { name: "quantity", type: "uint256" },
  //             { name: "uploader", type: "address" },
  //             { name: "dateAdded", type: "uint256" },
  //             { name: "barcode", type: "string" },
  //           ],
  //           type: "tuple[]",
  //         },
  //       ],
  //       stateMutability: "view",
  //     },
  //   ],
  // });

  // const { data, isPending, error } = useReadContract({
  //   contract,
  //   method: "getAllProduct",
  //   params: [],
  // });

  // if (isPending) {
  //   return <div>Loading products...</div>;
  // }

  // if (isError) {
  //   return <div>Error loading products</div>;
  // }

  // if (!data) {
  //   return <div>No products found</div>;
  // }

  // console.log("Products:", data);
  // console.log("Error loading products", error);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="lg:grid lg:grid-cols-7 lg:gap-4 bg-[#292D321A] pt-4 pb-1 rounded-md">
            <TableHead className="text-left">Product ID</TableHead>
            <TableHead className="text-left">Product name</TableHead>
            <TableHead className="text-left">Product price</TableHead>
            <TableHead className="text-left">Uploader</TableHead>
            <TableHead className="text-left">Quantity</TableHead>
            <TableHead className="text-left shrink-0">Date added</TableHead>
            <TableHead className="text-left">Barcode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((product) => (
            <TableRow
              key={product.id}
              className="lg:grid lg:grid-cols-7 lg:gap-4 lg:py-2">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {product.id}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(product.id)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy product ID</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>₦{product.price.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={product.rep.avatar}
                      alt={product.rep.name}
                    />
                    <AvatarFallback>{product.rep.name[0]}</AvatarFallback>
                  </Avatar>
                  {product.rep.name}
                </div>
              </TableCell>
              <TableCell className="text-left">{product.quantity}</TableCell>
              <TableCell className="shrink-0 !w-52">
                <p>{product.date}</p>
              </TableCell>
              <TableCell className="text-left">
                <a
                  href={`#${product.barcode}`}
                  className="inline-flex items-center gap-2 text-blue-500 hover:underline">
                  {product.barcode}
                  <Link2 className="h-4 w-4" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
