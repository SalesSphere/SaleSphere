"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import ProductsTable from "@/components/products-table";
import { navigation } from "@/lib/data";

const ProductScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <div className="space-y-6">
        <DashboardHeader
          title="Product"
          subtitle="View and edit all product info present in your store"
          showSearch={true}
          showExport={true}
          showAddUser={false}
          showProceed={false}
          showAddProduct={true}
          showMainExport={false}
          showSortProduct={true}
          showApproveAll={false}
          onApproveAllClick={() => {}}
          period="Last 360 days"
          onSearchClick={() => {}}
          onAddUserClick={() => {}}
          onAddProductClick={() => {}}
        />
        <ProductsTable />
      </div>
    </DashboardLayout>
  );
};

export default ProductScreen;
