"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
// import ProductOrderTable from "@/components/product-order-table";
import { adminNavigation } from "@/lib/data";

const UserScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={adminNavigation}>
      <DashboardHeader
        title="Checkout page"
        subtitle="View and edit all product info present in your store"
        showSearch={true}
        showExport={false}
        showAddUser={false}
        showAddProduct={false}
        showMainExport={false}
        showProceed={true}
        showSortProduct={false}
        period="Last 360 days"
        onSearchClick={() => {}}
        onAddUserClick={() => {}}
        onAddProductClick={() => {}}
        showApproveAll={false}
        onApproveAllClick={() => {}}
      />
      {/* <div className="space-y-6">
        <ProductOrderTable />
      </div> */}
      users
    </DashboardLayout>
  );
};

export default UserScreen;
