"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SaleTable from "./sale-table";

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
        <SaleTable />
      </CardContent>
    </div>
  );
}
