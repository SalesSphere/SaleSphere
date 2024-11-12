"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import ProductOrderTable from "@/components/product-order-table";
import { navigation } from "@/lib/data";

const CheckoutScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <div className="space-y-6">
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
        />
        <ProductOrderTable />
      </div>
    </DashboardLayout>
  );
};

export default CheckoutScreen;
