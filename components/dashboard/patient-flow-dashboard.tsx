import React, { useState } from 'react';
import { Card } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

// Simulated patient flow data
const mockData = {
  currentWaitTime: 120, // minutes
  patientCount: 42,
  bottlenecks: [
    { area: 'Triage', count: 15 },
    { area: 'Treatment', count: 20 },
    { area: 'Discharge', count: 7 },
  ],
  waitTimeHistory: [80, 90, 100, 110, 120],
  lwbsTrend: [2, 3, 1, 4, 2], // Patients left without being seen (by hour)
};

// Transform data for Recharts
const chartData = [
  { time: "8am", waitTime: 80 },
  { time: "10am", waitTime: 90 },
  { time: "12pm", waitTime: 100 },
  { time: "2pm", waitTime: 110 },
  { time: "4pm", waitTime: 120 },
];

const chartConfig = {
  waitTime: {
    label: "Wait Time (min)",
    color: "hsl(var(--chart-1))",
  },
};

export default function PatientFlowDashboard() {
  const [data] = useState(mockData);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // Simulate data refresh here if needed
  };

  return (
    <Card className="p-6 w-full">
      <h2 className="text-xl font-bold mb-4">Patient Flow Analytics</h2>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</span>
        <button onClick={handleRefresh} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">Refresh</button>
      </div>
      
      <div className="mb-2">Current Wait Time: <b>{data.currentWaitTime} min</b></div>
      <div className="mb-4">Total Patients in ER: <b>{data.patientCount}</b></div>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3">Wait Time Trend</h3>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="time" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="waitTime" 
              stroke="var(--color-waitTime)" 
              strokeWidth={2}
              dot={{ fill: "var(--color-waitTime)" }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-3">LWBS Trend (Left Without Being Seen)</h3>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart data={data.lwbsTrend} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="time" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="lwbs" 
              stroke="var(--color-lwbs)" 
              strokeWidth={2}
              dot={{ fill: "var(--color-lwbs)" }}
            />
          </LineChart>
        </ChartContainer>
     

      <div>
        <h3 className="font-semibold mb-2">Flow Bottlenecks</h3>
        <ul className="space-y-1">
          {data.bottlenecks.map((b, idx) => (
            <li key={idx} className="text-sm">
              <span className="font-medium">{b.area}:</span> {b.count} patients
            </li>
          ))}
        </ul>
      </div>
      </div>
    </Card>
  );
}