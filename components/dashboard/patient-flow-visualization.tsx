"use client"

import { useState } from "react"

interface PatientFlowStage {
  id: string
  name: string
  count: number
  avgTime: string
  color: string
  patients: Array<{
    id: string
    name: string
    severity: "critical" | "high" | "medium" | "low"
    waitTime: string
  }>
}

export default function PatientFlowVisualization() {
  const [expandedStage, setExpandedStage] = useState<string | null>(null)

  const stages: PatientFlowStage[] = [
    {
      id: "arrival",
      name: "Arrival/Registration",
      count: 8,
      avgTime: "5 min",
      color: "bg-blue-100 border-blue-300",
      patients: [
        { id: "P001", name: "John Smith", severity: "high", waitTime: "3 min" },
        { id: "P002", name: "Sarah Johnson", severity: "medium", waitTime: "5 min" },
        { id: "P003", name: "Michael Brown", severity: "low", waitTime: "8 min" },
      ],
    },
    {
      id: "triage",
      name: "Triage Assessment",
      count: 12,
      avgTime: "8 min",
      color: "bg-yellow-100 border-yellow-300",
      patients: [
        { id: "P004", name: "Emily Davis", severity: "critical", waitTime: "2 min" },
        { id: "P005", name: "Robert Wilson", severity: "high", waitTime: "6 min" },
        { id: "P006", name: "Lisa Anderson", severity: "medium", waitTime: "10 min" },
      ],
    },
    {
      id: "diagnostics",
      name: "Diagnostics/Imaging",
      count: 15,
      avgTime: "45 min",
      color: "bg-orange-100 border-orange-300",
      patients: [
        { id: "P007", name: "James Taylor", severity: "high", waitTime: "25 min" },
        { id: "P008", name: "Patricia Martinez", severity: "medium", waitTime: "42 min" },
        { id: "P009", name: "Christopher Lee", severity: "low", waitTime: "55 min" },
      ],
    },
    {
      id: "treatment",
      name: "Treatment/Observation",
      count: 18,
      avgTime: "120 min",
      color: "bg-red-100 border-red-300",
      patients: [
        { id: "P010", name: "Jennifer White", severity: "high", waitTime: "85 min" },
        { id: "P011", name: "Daniel Harris", severity: "medium", waitTime: "120 min" },
        { id: "P012", name: "Nancy Clark", severity: "low", waitTime: "145 min" },
      ],
    },
    {
      id: "disposition",
      name: "Disposition/Discharge",
      count: 6,
      avgTime: "15 min",
      color: "bg-green-100 border-green-300",
      patients: [
        { id: "P013", name: "Mark Lewis", severity: "low", waitTime: "10 min" },
        { id: "P014", name: "Sandra Walker", severity: "low", waitTime: "15 min" },
      ],
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Patient Flow Visualization</h2>
        <p className="text-gray-600 text-sm mt-1">Real-time patient journey through ED stages</p>
      </div>

      {/* Flow Diagram */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center gap-4">
              {/* Stage Box */}
              <div
                onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                className={`${stage.color} border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all min-w-[200px]`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground text-sm">{stage.name}</h3>
                  <span className="bg-white px-2 py-1 rounded text-xs font-bold text-foreground">{stage.count}</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">Avg: {stage.avgTime}</p>

                {/* Patient Indicators */}
                <div className="flex flex-wrap gap-2">
                  {stage.patients.slice(0, 3).map((patient) => (
                    <div
                      key={patient.id}
                      className={`${getSeverityColor(patient.severity)} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold`}
                      title={`${patient.name} - ${patient.severity}`}
                    >
                      {stage.patients.indexOf(patient) + 1}
                    </div>
                  ))}
                  {stage.count > 3 && (
                    <div className="bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      +{stage.count - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Arrow */}
              {index < stages.length - 1 && <div className="text-2xl text-gray-400">→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Stage Details */}
      {expandedStage && (
        <div className="mt-6 border-t border-border pt-6">
          <div className="bg-gray-50 border border-border rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-4">
              {stages.find((s) => s.id === expandedStage)?.name} - Detailed View
            </h3>
            <div className="space-y-2">
              {stages
                .find((s) => s.id === expandedStage)
                ?.patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 bg-white border border-border rounded"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${getSeverityColor(patient.severity)} w-4 h-4 rounded-full`} />
                      <div>
                        <p className="font-medium text-foreground text-sm">{patient.name}</p>
                        <p className="text-xs text-gray-600">{patient.id}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">Wait: {patient.waitTime}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs font-medium text-gray-600 mb-3">Severity Legend:</p>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Critical", color: "bg-red-500" },
            { label: "High", color: "bg-orange-500" },
            { label: "Medium", color: "bg-yellow-500" },
            { label: "Low", color: "bg-green-500" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`${item.color} w-3 h-3 rounded-full`} />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
