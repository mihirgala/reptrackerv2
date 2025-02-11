"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState, useTransition } from "react"
import { MonthlyAvgWeight } from "@/actions/protected/app/weightavg"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { ClimbingBoxLoader, FadeLoader, MoonLoader } from "react-spinners"
import { HoverCard } from "@radix-ui/react-hover-card"
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"


const chartConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface WeightChartProps {
  chartData: ChartData[]
}

type ChartData = {
  month: string
  weight: number
}
export const WeightChart = ({ chartData }: WeightChartProps) => {

  const currentYear = new Date().getFullYear()

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{currentYear} Weight Average</CardTitle>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button className="m-0 p-0 hover:bg-transparent" variant={"ghost"}><Info size={20} /></Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" sideOffset={20}>
              <span className="text-muted-foreground text-sm font-semibold">You are able to update your weight once a day, and the weight average is calculated based on the last 30 days.</span>
            </HoverCardContent>
          </HoverCard>
        </div>
        <CardDescription>
        {chartData.length > 0 ? 
          <>
            <p className="text-sm text-muted-foreground">
              Showing the average weight per month
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated {chartData[chartData.length - 1].month}
            </p>
          </>
          :
          <p className="text-sm text-muted-foreground">
            No data available, update your weight in settings
          </p>
        }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer={false}
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="weight"
              type="linear"
              fill="var(--color-weight)"
              fillOpacity={0.4}
              stroke="var(--color-weight)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
