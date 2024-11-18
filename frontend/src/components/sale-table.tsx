'use client'

import { useState } from "react"
import { Copy } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import useProduct from "@/hooks/useReadContract"

interface SaleData {
  0: {
    productId: bigint;
    quantity: bigint;
  }[];
  1: bigint;
  2: bigint;
  3: string;
  4: number;
}

export default function SaleTable() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const { salesData, salesLoading, salesError } = useProduct()

  console.log('Sales Data:', salesData)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(text)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (salesLoading) return <LoadingSkeleton />
  if (salesError) return <div>Error: {salesError.message}</div>
  if (!salesData || Object.keys(salesData).length === 0) return <div>No sales found</div>
  const sale = salesData as unknown as SaleData

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="!bg-[#292D321A] rounded-md">
            <TableHead className="text-left">Sale ID</TableHead>
            <TableHead className="text-left">Product ID</TableHead>
            <TableHead className="text-left">Quantity</TableHead>
            <TableHead className="text-left">Total Amount</TableHead>
            <TableHead className="text-left">Seller Address</TableHead>
            <TableHead className="text-left">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <span className="md:hidden font-bold">Sale ID:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base">{sale[1].toString()}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(sale[1].toString())}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy sale ID</span>
                </Button>
                {copiedId === sale[1].toString() && (
                  <span className="text-xs text-green-500">Copied!</span>
                )}
              </div>
            </TableCell>
            <TableCell>
              <span className="md:hidden font-bold">Product ID:</span>
              {sale[0][0].productId.toString()}
            </TableCell>
            <TableCell>
              <span className="md:hidden font-bold">Quantity:</span>
              {sale[0][0].quantity.toString()}
            </TableCell>
            <TableCell>
              <span className="md:hidden font-bold">Total Amount:</span>
              {sale[2].toString()}
            </TableCell>
            <TableCell>
              <span className="md:hidden font-bold">Seller Address:</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{sale[3].slice(0, 2)}</AvatarFallback>
                </Avatar>
                {sale[3]}
              </div>
            </TableCell>
            <TableCell>
              <span className="md:hidden font-bold">Timestamp:</span>
              {new Date(sale[4] * 1000).toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  )
}