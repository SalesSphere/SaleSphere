"use client";

import { useEffect, useState } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import RepLeaderboard from "@/components/rep-leaderboard";
import SalesChart from "@/components/sales-chart";
import SalesTable from "@/components/sales-table";
import StatsCard from "@/components/stats-card";
import useGetStaffs from "@/hooks/useGetStaffs";
import useProduct from "@/hooks/useReadContract";
import { adminNavigation } from "@/lib/data";
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<{
    allStaffData: any[] | null;
    allProductData: any[] | null;
    salesData: any[] | null;
  }>({
    allStaffData: null,
    allProductData: null,
    salesData: null,
  });

  const { allStaffData, allStaffLoading, allStaffError } = useGetStaffs();
  const {
    allProductData,
    allProductLoading,
    allProductError,
    salesData,
    salesLoading,
    salesError,
  } = useProduct();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls (replace with actual API calls if needed)
        await new Promise(resolve => setTimeout(resolve, 1000));

        setDashboardData({
          allStaffData: allStaffData ?? null,
          allProductData: allProductData ? [...allProductData] : [],
          salesData: salesData ? [...salesData] : [],
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching data.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [allStaffData, allProductData, salesData]);

  console.log("Dashboard data:", dashboardData);

  if (isLoading) {
    return (
      <DashboardLayout showHeader={true} navigation={adminNavigation}>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (error || allStaffError || allProductError || salesError) {
    console.error("Dashboard errors:", { error, allStaffError, allProductError, salesError });
    return (
      <DashboardLayout showHeader={true} navigation={adminNavigation}>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error || allStaffError?.message || allProductError?.message || salesError?.message || "An error occurred"}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboardData.allStaffData || dashboardData.allStaffData.length === 0 || 
      !dashboardData.allProductData || !dashboardData.salesData) {
    console.log("No data available:", dashboardData);
    return (
      <DashboardLayout showHeader={true} navigation={adminNavigation}>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">No Data Available</h2>
          <p>There is no data to display at the moment.</p>
        </div>
      </DashboardLayout>
    );
  }

  const totalStaffCount = dashboardData.allStaffData.length;
  const totalProductCount = dashboardData.allProductData.length;
  const totalSales = dashboardData.salesData.reduce((sum, sale) => sum + sale.amount, 0);

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
            value={totalProductCount.toString()}
            change={-20}
            data={[30, 25, 35, 30, 22, 20, 18, 15, 17, 16]}
            period="Last 360 days"
            type="Decreased by"
            lineColor="#FF1900"
          />
          <StatsCard
            title="Total sales"
            value={totalSales.toFixed(2)}
            change={20}
            data={[30, 25, 55, 30, 22, 20, 18, 15, 17, 16]}
            period="Last 360 days"
            type="Increased by"
            lineColor="#00D103"
          />
          <StatsCard
            title="Total Member"
            value={totalStaffCount.toString()}
            change={0}
            data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            period="Last 360 days"
            type="Static"
            lineColor="#E2AE29"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4 md:p-3">
          <div className="col-span-4 lg:col-span-3">
            <SalesChart salesData={dashboardData.salesData} />
          </div>
          <RepLeaderboard 
            className="col-span-4 lg:col-span-1" 
            salesData={dashboardData.salesData}
            allStaffData={dashboardData.allStaffData}
          />
        </div>

        <SalesTable salesData={dashboardData.salesData} />
      </div>
    </DashboardLayout>
  );
}



 const totalSales = salesData.reduce(
    (sum, sale) => sum + Number(sale.productPrice),
    0
  );