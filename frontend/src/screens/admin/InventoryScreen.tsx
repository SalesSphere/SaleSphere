"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import InventoryTable from "@/components/inventory-table";
import { adminNavigation } from "@/lib/data";

const InventoryScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={adminNavigation}>
      <div className="space-y-6">
        <DashboardHeader
          title="New Inventory Page"
          subtitle="View and take actions on all newly added products."
          showSearch={true}
          showExport={false}
          showAddUser={false}
          showAddProduct={false}
          showProceed={false}
          showMainExport={false}
          showSortProduct={true}
          showApproveAll={true}
          period="Last 360 days"
          onSearchClick={() => {}}
          onAddUserClick={() => {}}
          onAddProductClick={() => {}}
          onApproveAllClick={() => {}}
        />

        <InventoryTable />
      </div>
    </DashboardLayout>
  );
};

export default InventoryScreen;
