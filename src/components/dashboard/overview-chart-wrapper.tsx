"use client"

import dynamic from "next/dynamic"

const OverviewChart = dynamic(() => import("./overview-chart").then(mod => mod.OverviewChart), {
    loading: () => <div className="h-[300px] w-full bg-muted/10 animate-pulse rounded-xl" />,
    ssr: false
})

export function OverviewChartWrapper({ data }: { data: any }) {
    return <OverviewChart data={data} />
}
