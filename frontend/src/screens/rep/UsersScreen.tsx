"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import UserTable from "@/components/users-table";
// import ProductOrderTable from "@/components/product-order-table";
import { navigation } from "@/lib/data";

const UserScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <DashboardHeader
        title="Users"
        subtitle="View and take actions on all newly added users."
        showSearch={true}
        showExport={false}
        showAddUser={true}
        showAddProduct={false}
        showMainExport={false}
        showProceed={false}
        showSortProduct={false}
        period="Last 360 days"
        onSearchClick={() => {}}
        onAddUserClick={() => {}}
        onAddProductClick={() => {}}
        showApproveAll={false}
        onApproveAllClick={() => {}}
      />

      <UserTable />
    </DashboardLayout>
  );
};

export default UserScreen;
