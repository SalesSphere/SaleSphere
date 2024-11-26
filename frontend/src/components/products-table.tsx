/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React from "react";
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
import useProduct from "@/hooks/useReadContract";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/types";
import EditCash from "./EditMoney";
import PaginationComp from "./PaginationComp";
import { getTotalPagesByLimit } from "@/lib/utils";
import { MEDIUM_PAGE_LIMIT } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { useAddProductStore } from "@/store/addProduct";

const avatar = "/salesUser.svg";
export default function ProductsTable() {
  const pathname = usePathname();

  const params = useAddProductStore((state) => state.params);
  const setParams = useAddProductStore((state) => state.setParams);

  const {
    allProductData = [],
    allProductLoading,
    allProductError,
    // account,
    // balance,
  } = useProduct();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (allProductLoading) {
    return <LoadingSkeleton />;
  }

  if (allProductError) {
    return <div>Error: {allProductError.message}</div>;
  }

  if (!allProductData || allProductData.length === 0) {
    return <div>No products found</div>;
  }

  const totalPage = getTotalPagesByLimit(
    allProductData.length || 0,
    MEDIUM_PAGE_LIMIT
  );

  const currentProducts = allProductData.toReversed().slice(
    // @ts-ignore
    (params.page - 1) * MEDIUM_PAGE_LIMIT,
    // @ts-ignore
    params.page * MEDIUM_PAGE_LIMIT
  );

  return (
    <div className="space-y-4">
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
            {currentProducts.map((product: Product) => (
              <TableRow
                key={product.productID.toString()}
                className="lg:grid lg:grid-cols-7 lg:gap-4 lg:py-2"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <EditCash amount={product.productID} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        copyToClipboard(product.productID.toString())
                      }
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy product ID</span>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>
                  ₦{Number(product.productPrice).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatar} alt={avatar} />
                      <AvatarFallback>
                        {product.uploader.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {`${product.uploader.slice(
                      0,
                      6
                    )}...${product.uploader.slice(-4)}`}
                  </div>
                </TableCell>
                <TableCell className="p-3.5">
                  <EditCash amount={product.quantity} />
                </TableCell>
                <TableCell className="shrink-0 !w-52">
                  <p>
                    {new Date(Number(product.dateAdded) * 1000).toDateString()}
                  </p>
                </TableCell>
                <TableCell className="text-left">
                  <a
                    href={`#${product.barcode}`}
                    className="inline-flex items-center gap-2 text-blue-500 hover:underline"
                  >
                    {product.barcode}
                    <Link2 className="h-4 w-4" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationComp
          totalPage={totalPage}
          onAction={(e) => {
            setParams({ ...params, page: e });
          }}
          page={params?.page || 0}
          url={pathname}
        />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  );
}
