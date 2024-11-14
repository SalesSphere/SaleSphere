"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import RepLeaderboard from "@/components/rep-leaderboard";
import SalesChart from "@/components/sales-chart";
import SalesTable from "@/components/sales-table";
import StatsCard from "@/components/stats-card";
import { navigation } from "@/lib/data";

export default function DashboardPage() {
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <div className="space-y-6">
        <DashboardHeader
          title="Welcome Chinyere 👋"
          subtitle="Dive into real-time insights and watch your sales soar"
          showSearch={true}
          showExport={false}
          showAddUser={true}
          showAddProduct={true}
          showProceed={false}
          showMainExport={false}
          showSortProduct={false}
          period="Last 360 days"
          onSearchClick={() => console.log("Search clicked")}
          onAddUserClick={() => console.log("Add user clicked")}
          onAddProductClick={() => console.log("Add product clicked")}
          showApproveAll={false}
          onApproveAllClick={() => console.log("Approve all clicked")}
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

        <div className="grid gap-4 md:grid-cols-4 p-3">
          <div className="md:col-span-3">
            <SalesChart />
          </div>
          <RepLeaderboard />
        </div>

        <SalesTable />
      </div>
    </DashboardLayout>
  );
}
