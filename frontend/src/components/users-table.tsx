"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Link2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useGetStaffs from "@/hooks/useGetStaffs";
import { User } from "@/lib/types";

const avatar = "/salesUser.svg";
export default function UserTable() {
  const { allStaffData, allStaffError, allStaffLoading } = useGetStaffs();

  if (allStaffLoading) {
    return <LoadingSkeleton />;
  }

  if (allStaffError) {
    return <div>Error: {allStaffError.message}</div>;
  }

  if (!allStaffData || allStaffData.length === 0) {
    return <div>No User found</div>;
  }

  const ROLE_MAPPING: { [key: number]: string } = {
    0: "Administrator",
    1: "Sales Representative",
    3: "Moderator",
    4: "Guest",
  };
  const STATUS_MAPPING: { [key: number]: string } = {
    0: "Active",
    1: "leave",
    2: "Sick bed",
    4: "Guest",
  };

  return (
    <div className="space-y-4 my-8">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="lg:grid lg:grid-cols-7 lg:gap-4 bg-[#292D321A] pt-4 pb-1 rounded-md">
              <TableHead className="text-left">User ID</TableHead>
              <TableHead className="text-left">User name</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-left">Phone number</TableHead>
              <TableHead className="text-left">User status</TableHead>
              <TableHead className="text-left">Date joined</TableHead>
              <TableHead className="text-left">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allStaffData.map((user: User) => (
              <TableRow
                key={user.staffID.toString()}
                className="lg:grid lg:grid-cols-7 lg:gap-4 lg:py-2">
                <TableCell className="font-medium">
                  {user.staffID.toString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatar} alt={avatar} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </div>
                </TableCell>

                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {`0${user.phoneNumber}`}
                  </div>
                </TableCell>
                <TableCell>
                  {STATUS_MAPPING[user.status] || "Unknown Role"}
                </TableCell>

                <TableCell className="text-left">{user.dateJoined}</TableCell>
                <TableCell className="text-left">
                  {ROLE_MAPPING[user.role] || "Unknown Role"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  );
}
