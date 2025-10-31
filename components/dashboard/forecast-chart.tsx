"use client"

export default function ForecastChart() {
  const forecastData = [
    { hour: "12 AM", arrivals: 8, confidence: 0.92 },
    { hour: "1 AM", arrivals: 6, confidence: 0.88 },
    { hour: "2 AM", arrivals: 5, confidence: 0.85 },
    { hour: "3 AM", arrivals: 4, confidence: 0.82 },
    { hour: "4 AM", arrivals: 7, confidence: 0.8 },
    { hour: "5 AM", arrivals: 12, confidence: 0.78 },
    { hour: "6 AM", arrivals: 18, confidence: 0.75 },
    { hour: "7 AM", arrivals: 24, confidence: 0.72 },
  ]

  const maxArrivals = Math.max(...forecastData.map((d) => d.arrivals))

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-bold text-foreground">72-Hour Arrival Forecast</h2>
        <p className="text-gray-600 text-sm mt-1">Predicted patient arrivals with confidence intervals</p>
      </div>

      <div className="space-y-4">
        {forecastData.map((data, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{data.hour}</span>
              <div className="flex items-center gap-2">
                <span className="text-foreground font-bold">{data.arrivals}</span>
                <span className="text-xs text-gray-500">{Math.round(data.confidence * 100)}% confidence</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                style={{ width: `${(data.arrivals / maxArrivals) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
