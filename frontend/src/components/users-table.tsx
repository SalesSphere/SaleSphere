/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import useGetStaffs from "@/hooks/useGetStaffs";
import { User } from "@/lib/types";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { extractAddressParts, getTotalPagesByLimit } from "@/lib/utils";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useAddUserStore } from "@/store/addUser";
import { MEDIUM_PAGE_LIMIT } from "@/lib/constants";
import PaginationComp from "./PaginationComp";

const avatar = "/salesUser.svg";
export default function UserTable() {
  const pathname = usePathname();

  const params = useAddUserStore((state) => state.params);
  const setParams = useAddUserStore((state) => state.setParams);

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

  const totalPage = getTotalPagesByLimit(
    allStaffData.length || 0,
    MEDIUM_PAGE_LIMIT
  );

  const currentProducts = allStaffData.toReversed().slice(
    // @ts-ignore
    (params.page - 1) * MEDIUM_PAGE_LIMIT,
    // @ts-ignore
    params.page * MEDIUM_PAGE_LIMIT
  );

  return (
    <div className="space-y-4 my-8">
      <div className="overflow-x-auto px-10">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="lg:gap-4 bg-[#292D321A] pt-4 pb-1 rounded-md">
              <TableHead className="text-left">User ID</TableHead>
              <TableHead className="text-left">User name</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-left">Phone number</TableHead>
              <TableHead className="text-left">Address</TableHead>
              <TableHead className="text-left">User status</TableHead>
              <TableHead className="text-left">Date joined</TableHead>
              <TableHead className="text-left">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((user: User) => (
              <TableRow
                key={user.staffID.toString()}
                className="lg:gap-4 lg:py-2">
                <TableCell className="font-medium ">
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
                <TableCell className="flex items-center gap-1.5">
                  {extractAddressParts(user?.addr || "")}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        navigator.clipboard.writeText(user.addr.toString());
                        toast.success("Copied");
                      }}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy user address</span>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {STATUS_MAPPING[user.status] || "Unknown Role"}
                </TableCell>

                <TableCell className="text-left">
                  {new Date(Number(user.dateJoined) * 1000).toDateString()}
                </TableCell>
                <TableCell className="text-left">
                  {ROLE_MAPPING[user.role] || "Unknown Role"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationComp
          totalPage={totalPage}
          onAction={(e) => {
            setParams({ ...params, page: e });
          }}
          page={params?.page || 0}
          url={pathname}
        />
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
