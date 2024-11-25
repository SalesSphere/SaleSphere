"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MemoArrowDown from "@/icons/ArrowDown";
import MemoArrowUp from "@/icons/ArrowUp";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface SalesData {
  staffId: string;
  amount: number;
}

interface StaffData {
  id: string;
  name: string;
  avatar: string;
}

interface RepLeaderboardProps {
  salesData?: SalesData[];
  allStaffData?: StaffData[];
  className?: string;
}

export default function RepLeaderboard({
  salesData,
  allStaffData,
  className,
}: RepLeaderboardProps) {
  const [topPerformers, setTopPerformers] = useState<
    (StaffData & { totalSales: number })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!allStaffData || !salesData) {
      setIsLoading(true);
      return;
    }

    // Calculate total sales for each staff member
    const staffSales = allStaffData.map((staff) => {
      const totalSales = salesData
        .filter((sale) => sale.staffId === staff.id)
        .reduce((sum, sale) => sum + sale.amount, 0);
      return { ...staff, totalSales };
    });

    // Sort staff by total sales in descending order and take top 3
    const sorted = staffSales
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 3);

    setTopPerformers(sorted);
    setIsLoading(false);
  }, [allStaffData, salesData]);

  if (isLoading || !allStaffData || !salesData) {
    return (
      <Card className={cn("w-full max-w-[22rem]", className)}>
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#292D3280]">
            Rep Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40">
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (allStaffData.length === 0 || salesData.length === 0) {
    return (
      <Card className={cn("w-full max-w-[22rem]", className)}>
        <CardHeader>
          <CardTitle className="text-base font-medium text-[#292D3280]">
            Rep Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">No data available</CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full max-w-[22rem]", className)}>
      <CardHeader>
        <CardTitle className="text-base font-medium text-[#292D3280]">
          Rep Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="grid grid-cols-3 bg-[#292D321A] p-3"
          style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
          <div className="text-sm font-medium">Sales rep</div>
          <div className="text-sm text-center font-medium">Trend</div>
        </div>
        <ul className="divide-y">
          {topPerformers.map((staff, index) => (
            <li
              key={staff.id}
              className="grid grid-cols-3 items-center p-3"
              style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
              <div className="flex items-center gap-2">
                <Image
                  src={staff.avatar || `/1.png`}
                  width={20}
                  height={20}
                  alt={`${staff.name}'s avatar`}
                  className="rounded-full"
                />
                <span className="text-sm font-medium truncate">
                  {staff.name}
                </span>
              </div>
              <div className="flex justify-center">
                {index === 0 && (
                  <MemoArrowUp className="h-4 w-4 text-green-500" />
                )}
                {index === 1 && (
                  <MemoArrowDown className="h-4 w-4 text-red-500" />
                )}
                {index === 2 && <div className="h-4 w-4" />}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
