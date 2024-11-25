"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import useProduct from "@/hooks/useReadContract";

interface ISale {
  saleId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  seller: string;
  modeOfPayment: string;
}

const avatar = "/salesUser.svg";
export default function SaleTable() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { salesData, salesLoading, salesError } = useProduct();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (salesLoading) return <LoadingSkeleton />;
  if (salesError) return <div>Error: {salesError.message}</div>;
  if (!salesData || Object.keys(salesData).length === 0)
    return <div>No sales found</div>;
  const sale = salesData as unknown as ISale[];

  return (
    <div className="w-full overflow-x-auto px-10">
      <Table>
        <TableHeader>
          <TableRow className="!bg-[#292D321A] rounded-md">
            <TableHead className="text-left">Sales ID</TableHead>
            <TableHead className="text-left">Product Name</TableHead>
            <TableHead className="text-left">Product price</TableHead>
            <TableHead className="text-left">Quantity</TableHead>
            <TableHead className="text-center">Seller</TableHead>
            <TableHead className="text-center">Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sale.map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <span className="md:hidden font-bold">Sale ID:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base">{_.saleId}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(_.saleId.toString())}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy sale ID</span>
                  </Button>
                  {copiedId === _.saleId && (
                    <span className="text-xs text-green-500">Copied!</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="md:hidden font-bold">Product Name:</span>
                {_.productName}
              </TableCell>
              <TableCell>
                <span className="md:hidden font-bold">Total Amount:</span>
                <span className="mx-4">{_.productPrice}</span>
              </TableCell>
              <TableCell>
                <span className="md:hidden font-bold">Quantity:</span>
                <span className="mx-4">{_.quantity}</span>
              </TableCell>

              <TableCell>
                <span className="md:hidden font-bold">Seller</span>
                <div className="flex items-center justify-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt={avatar} />
                    <AvatarFallback>{_.seller}</AvatarFallback>
                  </Avatar>
                  <span>{_.seller}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="md:hidden font-bold">Mode of payment </span>
                <span className="flex items-center justify-center">
                  {_.modeOfPayment}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  );
}
