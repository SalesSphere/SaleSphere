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
  console.log("RepLeaderboard props:", { salesData, allStaffData });

  if (!allStaffData || !salesData) {
    console.log("Data is undefined:", { salesData, allStaffData });
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
    console.log("Data arrays are empty:", {
      staffDataLength: allStaffData.length,
      salesDataLength: salesData.length,
    });
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

  // Calculate total sales for each staff member
  const staffSales = allStaffData.map((staff) => {
    const totalSales = salesData
      .filter((sale) => sale.staffId === staff.id)
      .reduce((sum, sale) => sum + sale.amount, 0);
    return { ...staff, totalSales };
  });

  console.log("Calculated staffSales:", staffSales);

  // Sort staff by total sales in descending order
  const sortedStaff = staffSales.sort((a, b) => b.totalSales - a.totalSales);

  // Take top 3 performers
  const topPerformers = sortedStaff.slice(0, 3);

  console.log("Top performers:", topPerformers);

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
          {/* <div className="text-sm font-medium">Total sales</div> */}
          <div className="text-sm text-center font-medium">Trend</div>
        </div>
        <div className="divide-y">
          {topPerformers.map((staff, index) => (
            <div
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
              {/* <div className="flex items-center justify-center text-sm">
                ${staff.totalSales}
              </div> */}
              <div className="flex justify-center">
                {index === 0 && (
                  <MemoArrowUp className="h-4 w-4 text-green-500" />
                )}
                {index === 1 && (
                  <MemoArrowDown className="h-4 w-4 text-red-500" />
                )}
                {index === 2 && <div className="h-4 w-4" />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
