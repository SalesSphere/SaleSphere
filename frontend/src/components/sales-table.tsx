"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sales } from "@/lib/data";
import { StatsTableProps } from "@/lib/types";

export default function SalesTable() {
  return (
    <div className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">Recent Sales</CardTitle>
        <Select defaultValue="today">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="overflow-auto">
        <Table>
          <TableHeader className="bg-[#292D321A]  rounded-md">
            <TableRow className="">
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Sales ID</TableHead>
              <TableHead>Sales rep</TableHead>
              <TableHead>Product name</TableHead>
              <TableHead>Product price</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale: StatsTableProps, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {sale.id}
                    <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={sale.rep.avatar} alt={sale.rep.name} />
                      <AvatarFallback>{sale.rep.name[0]}</AvatarFallback>
                    </Avatar>
                    {sale.rep.name}
                  </div>
                </TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>₦{sale.price.toLocaleString()}</TableCell>
                <TableCell>{sale.time}</TableCell>
                <TableCell>{sale.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
}
