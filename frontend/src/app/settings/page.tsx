"use client";
import { DashboardLayout } from "@/components/DashboardLayout";
import { navigation } from "@/lib/data";

const page = () => {
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      Settings
    </DashboardLayout>
  );
};

export default page;
