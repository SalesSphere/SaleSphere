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
import { inventory } from "@/lib/data";
import { CheckSquareIcon, XCircleIcon } from "lucide-react";
// import { useState } from "react";

export default function InventoryTable() {
  // const [copiedId, setCopiedId] = useState<string | null>(null);

  // const copyToClipboard = (text: string) => {
  //   navigator.clipboard.writeText(text);
  //   setCopiedId(text);
  //   setTimeout(() => setCopiedId(null), 2000);
  // };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="max-sm:hidden max-md:hidden md:grid md:grid-cols-7 md:gap-4 bg-[#292D321A] pt-4 pb-1 rounded-md">
            <TableHead className="text-left">Product Name</TableHead>
            <TableHead className="text-left">Product Price</TableHead>
            <TableHead className="text-left">Uploader</TableHead>
            <TableHead className="text-left">No Purchased</TableHead>
            <TableHead className="text-left">Date Added</TableHead>
            <TableHead className="text-left">Receipt</TableHead>
            <TableHead className="text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow
              key={item.id}
              className="flex flex-col md:grid md:grid-cols-7 md:gap-4 border-b py-2">
              <TableCell className="font-medium flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Product Name:</span>
                {item.productName}
              </TableCell>

              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Product Price:</span>₦
                {item.price.toLocaleString()}
              </TableCell>

              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Uploader:</span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.rep.avatar} alt={item.rep.name} />
                    <AvatarFallback>{item.rep.name[0]}</AvatarFallback>
                  </Avatar>
                  {item.rep.name}
                </div>
              </TableCell>

              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">No Purchased:</span>
                {item.quantity}
              </TableCell>

              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Date Added:</span>
                {item.date}
              </TableCell>

              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Receipt:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base text-blue-500">
                    {item.id}
                  </span>
                </div>
              </TableCell>

              <TableCell className="flex justify-between items-center md:block">
                <span className="md:hidden font-bold">Action:</span>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <XCircleIcon className="h-5 w-5" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-500">
                    <CheckSquareIcon className="h-5 w-5" />
                    <span className="sr-only">Reject</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
