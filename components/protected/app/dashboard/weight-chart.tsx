"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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


const chartConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface WeightChartProps {
  personalInfoId: string
}

type ChartData = {
  month: string
  weight: number
}
export function WeightChart({ personalInfoId }: WeightChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  useEffect(()=>{
    startTransition(async () => {
      const data = await MonthlyAvgWeight(personalInfoId)
      if(data.success){
        setChartData(data.chartData)
      }
      else{
        router.refresh()
      }
    })
  },[])

  const currentYear = new Date().getFullYear()
  if(isPending){
    return <Card>
      <CardHeader>
        <CardTitle>{currentYear} Weight Average</CardTitle>
        <CardDescription>
          Showing the average weight per month
        </CardDescription>
      </CardHeader>
      <CardContent>
      <Skeleton className="w-[300px] h-[300px]"/>

      </CardContent>
    </Card>
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentYear} Weight Average</CardTitle>
        <CardDescription>
          Showing the average weight per month
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
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
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
