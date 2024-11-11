"use client";

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
import { sales } from "@/lib/data";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function SaleTable() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hidden md:grid md:grid-cols-6 md:gap-4 bg-[#292D321A] pt-4 pb-1 rounded-md">
            <TableHead className="text-left">Sales ID</TableHead>
            <TableHead className="text-left">Product name</TableHead>
            <TableHead className="text-left">Product price</TableHead>
            <TableHead className="text-left">Quantity</TableHead>
            <TableHead className="text-left">Seller</TableHead>
            <TableHead className="text-left">Mode of payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow
              key={sale.id}
              className="flex flex-col md:grid md:grid-cols-6 md:gap-4 border-b  py-2">
              <TableCell className="font-medium flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Sales ID:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base">{sale.id}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(sale.id)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy sales ID</span>
                  </Button>
                  {copiedId === sale.id && (
                    <span className="text-xs text-green-500">Copied!</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Product name:</span>
                {sale.productName}
              </TableCell>
              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Product price:</span>₦
                {sale.price.toLocaleString()}
              </TableCell>
              <TableCell className="flex justify-between items-center md:block md:text-left">
                <span className="md:hidden font-bold">Quantity:</span>
                {sale.quantity}
              </TableCell>
              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Seller:</span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={sale.rep.avatar}
                      alt={sale.rep.name}
                    />
                    <AvatarFallback>{sale.rep.name[0]}</AvatarFallback>
                  </Avatar>
                  {sale.rep.name}
                </div>
              </TableCell>
              <TableCell className="flex justify-between items-center md:block md:text-left">
                <span className="md:hidden font-bold">Mode of payment:</span>
                {sale.paymentMode}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
