"use client"

import { useState } from "react"

export default function AuditLog() {
  const [filterType, setFilterType] = useState("all")

  const auditEvents = [
    {
      id: 1,
      timestamp: "15:32:45",
      actor: "Dr. Sarah Chen",
      action: "Approved recommendation",
      details: "Called in 2 additional nurses",
      modelVersion: "v2.1.0",
      confidence: 0.92,
      outcome: "Approved",
    },
    {
      id: 2,
      timestamp: "15:28:12",
      actor: "Nurse John Smith",
      action: "Overrode triage level",
      details: "Changed from Medium to High for patient P001",
      modelVersion: "v2.1.0",
      confidence: 0.85,
      outcome: "Override",
    },
    {
      id: 3,
      timestamp: "15:22:33",
      actor: "System",
      action: "Generated recommendation",
      details: "Convert 4 beds to fast-track",
      modelVersion: "v2.1.0",
      confidence: 0.78,
      outcome: "Generated",
    },
    {
      id: 4,
      timestamp: "15:15:44",
      actor: "Manager Lisa Wong",
      action: "Rejected recommendation",
      details: "Redirect low-acuity to urgent care",
      modelVersion: "v2.1.0",
      confidence: 0.78,
      outcome: "Rejected",
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Audit Log</h1>
        <p className="text-gray-600 mt-1">Immutable record of all system actions and decisions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "approved", "rejected", "override"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === type
                ? "bg-primary text-white"
                : "bg-white border border-border text-foreground hover:bg-gray-50"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Audit Events */}
      <div className="space-y-3">
        {auditEvents.map((event) => (
          <div key={event.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-500">{event.timestamp}</span>
                  <span className="font-bold text-foreground">{event.actor}</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-foreground">{event.action}</span>
                </div>
                <p className="text-foreground mb-2">{event.details}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span>Model: {event.modelVersion}</span>
                  <span>Confidence: {Math.round(event.confidence * 100)}%</span>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`badge-${
                    event.outcome === "Approved" ? "success" : event.outcome === "Rejected" ? "danger" : "warning"
                  }`}
                >
                  {event.outcome}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-border">
              <button className="text-xs text-primary hover:text-blue-700 font-medium transition-colors">
                View Details
              </button>
              <button className="text-xs text-primary hover:text-blue-700 font-medium transition-colors">Export</button>
              <button className="text-xs text-primary hover:text-blue-700 font-medium transition-colors">
                Flag for Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Export Section */}
      <div className="card">
        <h3 className="font-bold text-foreground mb-3">Export Audit Report</h3>
        <div className="flex gap-2">
          <button className="btn-secondary flex-1 py-2">Export as CSV</button>
          <button className="btn-secondary flex-1 py-2">Export as PDF</button>
          <button className="btn-secondary flex-1 py-2">Send to Ethics Committee</button>
        </div>
      </div>
    </div>
  )
}
