"use client";
import ComingSoon from "@/components/Coming-Soon";
import { DashboardLayout } from "@/components/DashboardLayout";
import { adminNavigation } from "@/lib/data";

const SettingsScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={adminNavigation}>
      <ComingSoon />
    </DashboardLayout>
  );
};

export default SettingsScreen;
