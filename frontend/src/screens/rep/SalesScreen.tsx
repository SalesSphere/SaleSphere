"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import SaleTable from "@/components/sale-table";
import { navigation } from "@/lib/data";

const SalesScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <div className="space-y-6">
        <DashboardHeader
          title="Sales History"
          subtitle="View and edit all product info present in your store"
          showSearch={true}
          showExport={false}
          showAddUser={false}
          showAddProduct={false}
          showProceed={false}
          showMainExport={true}
          showSortProduct={true}
          period="Last 360 days"
          onSearchClick={() => {}}
          onAddUserClick={() => {}}
          onAddProductClick={() => {}}
        />

        <SaleTable />
      </div>
    </DashboardLayout>
  );
};

export default SalesScreen;
