"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import RepLeaderboard from "@/components/rep-leaderboard";
import SalesChart from "@/components/sales-chart";
import SalesTable from "@/components/sales-table";
import StatsCard from "@/components/stats-card";
import useGetStaffs from "@/hooks/useGetStaffs";
import { adminNavigation } from "@/lib/data";

export default function DashboardPage() {
  const { allStaffData, allStaffError,  } = useGetStaffs();

  console.log("Staff Data:", allStaffData?.length);

  // if (allStaffLoading) {
  //   return <LoadingSkeleton />;
  // }

  if (allStaffError) {
    return <div>Error: {allStaffError.message}</div>;
  }

  if (!allStaffData || allStaffData.length === 0) {
    return <div>No User found</div>;
  }
  return (
    <DashboardLayout showHeader={true} navigation={adminNavigation}>
      <div className="space-y-6">
        <DashboardHeader
          title="Welcome Chinyere 👋"
          subtitle="Dive into real-time insights and watch your sales soar"
          showSearch={true}
          showAddUser={true}
          showAddProduct={true}
          period="Last 360 days"
          onSearchClick={() => console.log("Search clicked")}
          onAddUserClick={() => console.log("Add user clicked")}
          onAddProductClick={() => console.log("Add product clicked")}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Product"
            value="2,000"
            change={-20}
            data={[30, 25, 35, 30, 22, 20, 18, 15, 17, 16]}
            period="Last 360 days"
            type="Decreased by"
            lineColor="#FF1900"
          />
          <StatsCard
            title="Total sales"
            value="5,000"
            change={20}
            data={[30, 25, 55, 30, 22, 20, 18, 15, 17, 16]}
            period="Last 360 days"
            type="Increased by"
            lineColor="#00D103"
          />
          <StatsCard
            title="Total Member"
            value="10"
            change={0}
            data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            period="Last 360 days"
            type="Static"
            lineColor="#E2AE29"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4 md:p-3">
          <div className="col-span-4 lg:col-span-3">
            <SalesChart />
          </div>
          <RepLeaderboard className="col-span-4 lg:col-span-1" />
        </div>

        <SalesTable />
      </div>
    </DashboardLayout>
  );
}
