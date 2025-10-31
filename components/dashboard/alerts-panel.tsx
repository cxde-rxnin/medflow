"use client"

interface AlertsPanelProps {
  onSelectAlert: (alert: any) => void
  onShowRecommendation: () => void
}

export default function AlertsPanel({ onSelectAlert, onShowRecommendation }: AlertsPanelProps) {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "High Occupancy Alert",
      message: "ED occupancy at 87%, approaching capacity",
      time: "2 min ago",
      action: "View Recommendations",
    },
    {
      id: 2,
      type: "warning",
      title: "Staffing Gap",
      message: "Predicted need for 2 additional nurses in 2 hours",
      time: "5 min ago",
      action: "Schedule Staff",
    },
    {
      id: 3,
      type: "info",
      title: "Triage Queue",
      message: "8 patients waiting for triage assessment",
      time: "8 min ago",
      action: "View Queue",
    },
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const getAlertTextColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-red-700"
      case "warning":
        return "text-yellow-700"
      default:
        return "text-primary"
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-bold text-foreground">Active Alerts</h2>
        <p className="text-gray-600 text-sm mt-1">{alerts.length} alerts</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-semibold text-sm ${getAlertTextColor(alert.type)}`}>{alert.title}</h3>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
            <p className="text-sm text-foreground mb-3">{alert.message}</p>
            <button
              onClick={onShowRecommendation}
              className="text-xs font-medium text-primary hover:text-blue-700 transition-colors"
            >
              {alert.action} →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
