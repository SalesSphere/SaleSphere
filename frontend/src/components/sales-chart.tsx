/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { DataPoint } from "@/lib/types";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

// Generate sample data

// @ts-expect-error
const data: DataPoint[] = Array.from({ length: 100 }, (_, i) => ({
  date: new Date(2024, 0, i + 1),
  value: 1000 + Math.floor(Math.random() * 500) + i * 30,
  Product: { name: "Sample Product", category: "Sample Category" },
}));

// Add the specific point we want to highlight
data[60] = {
  date: new Date(2024, 6, 29), // July 29, 2024
  value: 3000,
  highlight: true,
  // @ts-expect-error
  Product: { name: "Sample Product", category: "Sample Category" },
};

export default function SalesChart() {
  const [, setActivePoint] = useState<DataPoint | null>(null);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-muted-foreground">
        Sales Overview
      </h2>
      <h3 className="text-3xl font-bold">5,000 sales</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            onMouseMove={(e) => {
              if (e && e.activePayload) {
                setActivePoint(e.activePayload[0].payload);
              }
            }}
            onMouseLeave={() => {
              if (setActivePoint) {
                setActivePoint(null);
              }
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#17ABEC" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#17ABEC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <YAxis
              tickCount={6}
              domain={[0, 5000]}
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="text-sm text-muted-foreground">
                        {data.date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-base font-bold">
                          {data.value.toLocaleString()} sales
                        </div>
                        {data.highlight && (
                          <span className="text-sm text-green-500">+3.4%</span>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#17ABEC"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#17ABEC",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
