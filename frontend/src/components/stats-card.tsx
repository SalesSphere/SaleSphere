"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparklines, SparklinesLine, SparklinesCurve } from "react-sparklines";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MemoArrowUp from "@/icons/ArrowUp";
import MemoArrowDown from "@/icons/ArrowDown";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  data: number[];
  period?: string;
  type?: string;
  lineColor?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  data,
  period,
  type,
  lineColor,
}: StatsCardProps) {
  const isNegative = change < 0;
  const isPositive = change > 0;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Select defaultValue={period}>
          <SelectTrigger className="h-8 w-[140px] border-none text-xs text-muted-foreground">
            <SelectValue placeholder={period} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 360 days">Last 360 days</SelectItem>
            <SelectItem value="Last 90 days">Last 90 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground">{type}</span>
            <div className="flex items-center">
              {isPositive && <MemoArrowUp className="h-4 w-4 text-green-600" />}
              {isNegative && <MemoArrowDown className="h-4 w-4 text-red-600" />}
              {change === 0 && <span className=""></span>}
              {change === 0 ? (
                <span className="text-[#E2AE29] text-sm">(no changes)</span>
              ) : (
                `${Math.abs(change)}%`
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-16">
          <Sparklines data={data} margin={6}>
            <SparklinesCurve
              style={{
                fill: "none",
                strokeWidth: 1.5,
                stroke: lineColor,
              }}
            />
          </Sparklines>
        </div>
      </CardContent>
    </Card>
  );
}
