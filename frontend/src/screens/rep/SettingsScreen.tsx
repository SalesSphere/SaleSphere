"use client";
import ComingSoon from "@/components/Coming-Soon";
import { DashboardLayout } from "@/components/DashboardLayout";
import { navigation } from "@/lib/data";

const SettingsScreen = () => {
  return (
    <DashboardLayout showHeader={true} navigation={navigation}>
      <ComingSoon />
    </DashboardLayout>
  );
};

export default SettingsScreen;
