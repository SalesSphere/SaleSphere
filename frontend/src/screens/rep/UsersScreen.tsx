"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
// import ProductOrderTable from "@/components/product-order-table";
import { navigation } from "@/lib/data";

const UserScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <DashboardHeader
        title="Users"
        subtitle="View all user info present in your store"
        showSearch={true}
        showExport={false}
        showAddUser={false}
        showAddProduct={false}
        showMainExport={false}
        showProceed={true}
        showSortProduct={false}
        showApproveAll={false}
        onApproveAllClick={() => {}}
        period="Last 360 days"
        onSearchClick={() => {}}
        onAddUserClick={() => {}}
        onAddProductClick={() => {}}
      />
      {/* <div className="space-y-6">
        <ProductOrderTable />
      </div> */}
    </DashboardLayout>
  );
};

export default UserScreen;
