"use client"

export default function MetricsGrid() {
  const metrics = [
    {
      label: "Current Occupancy",
      value: "87%",
      change: "+5%",
      status: "warning",
      icon: "🏥",
    },
    {
      label: "Avg Wait Time",
      value: "42 min",
      change: "-8%",
      status: "success",
      icon: "⏱️",
    },
    {
      label: "Predicted Arrivals (4h)",
      value: "24",
      change: "+12%",
      status: "info",
      icon: "📈",
    },
    {
      label: "LWBS Rate",
      value: "3.2%",
      change: "-1.5%",
      status: "success",
      icon: "📊",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <div key={idx} className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{metric.icon}</span>
            <span className={`badge-${metric.status}`}>{metric.change}</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
          <p className="text-2xl font-bold text-foreground">{metric.value}</p>
        </div>
      ))}
    </div>
  )
}
