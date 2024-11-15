"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { adminNavigation } from "@/lib/data";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const NotificationScreen = () => {
  const [notification] = useState([
    {
      id: 1,
      description: "A new product has been added to the inventory",
      date: "November 12, 2024",
      avatar: "/salesUser.svg",
    },
    {
      id: 2,
      description:
        "We are excited to inform you that your latest sales report has been successfully generated, showcasing an in-depth analysis of your performance metrics and trending opportunities for growth!",
      date: "November 12, 2024",
      avatar: "/salesUser.svg",
    },
  ]);
  return (
    <DashboardLayout showHeader={true} navigation={adminNavigation}>
      <div className="space-y-10">
        <DashboardHeader
          title="Notification"
          subtitle="View and take actions on all newly added products."
          showSearch={true}
          showAddUser={true}
          period="Last 360 days"
          onSearchClick={() => console.log("Search clicked")}
        />
        <div className="w-11/12 md:w-full lg:w-6/12 mt-10 mx-auto">
          {notification.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 py-4 border-b "
            >
              <div className="flex h-10 w-10 items-center shrink-0 justify-center rounded-full bg-primary text-primary-foreground relative">
                <Image src={item.avatar} alt="Profile" fill />
              </div>
              <div className="w-11/12">
                <p className="font-semibold text-sm">{item.description}</p>
                <p className="font-light text-gray-400 text-xs mt-1">
                  {new Date().toDateString()}{" "}
                </p>
              </div>
              <Button variant={"ghost"}>
                <X />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationScreen;
