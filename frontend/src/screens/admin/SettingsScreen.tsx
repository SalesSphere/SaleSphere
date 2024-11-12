"use client";
import { DashboardLayout } from "@/components/DashboardLayout";
import { adminNavigation } from "@/lib/data";

const SettingsScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={adminNavigation}>
      Settings
    </DashboardLayout>
  );
};

export default SettingsScreen;
