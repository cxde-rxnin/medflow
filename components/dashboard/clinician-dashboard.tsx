"use client"

import { useState } from "react"
import PatientFlowVisualization from "./patient-flow-visualization"
import ClinicianTeamView from "./clinician-team-view"
import PatientTimeline from "./patient-timeline"

export default function ClinicianDashboard() {
  const [activeView, setActiveView] = useState<"overview" | "team" | "timeline">("overview")

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Header with User Info */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clinician Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive patient management and team coordination</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium text-foreground">Dr. Sarah Mitchell</p>
            <p className="text-sm text-gray-600">Emergency Medicine</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            SM
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: "overview", label: "Patient Flow Overview" },
          { id: "team", label: "Team & Assignments" },
          { id: "timeline", label: "Patient Timeline" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as any)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeView === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-600 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeView === "overview" && <PatientFlowVisualization />}
      {activeView === "team" && <ClinicianTeamView />}
      {activeView === "timeline" && <PatientTimeline />}
    </div>
  )
}
