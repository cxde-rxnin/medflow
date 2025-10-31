"use client"

import { useState } from "react"

interface TimelineEvent {
  id: string
  timestamp: string
  event: string
  stage: string
  clinician: string
  notes?: string
  status: "completed" | "in-progress" | "pending"
}

export default function PatientTimeline() {
  const [selectedPatient, setSelectedPatient] = useState("P001")
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const patients = [
    { id: "P001", name: "John Smith", severity: "high" },
    { id: "P002", name: "Sarah Johnson", severity: "medium" },
    { id: "P004", name: "Emily Davis", severity: "critical" },
  ]

  const timelineEvents: TimelineEvent[] = [
    {
      id: "E001",
      timestamp: "14:32",
      event: "Patient Arrival",
      stage: "Registration",
      clinician: "Front Desk - Maria",
      notes: "Walk-in patient, chief complaint: chest pain",
      status: "completed",
    },
    {
      id: "E002",
      timestamp: "14:38",
      event: "Triage Assessment",
      stage: "Triage",
      clinician: "Nurse Patricia",
      notes: "Vitals: BP 145/92, HR 98, Temp 98.6°F, O2 98%",
      status: "completed",
    },
    {
      id: "E003",
      timestamp: "14:45",
      event: "Physician Evaluation",
      stage: "Initial Assessment",
      clinician: "Dr. Sarah Mitchell",
      notes: "Suspected acute coronary syndrome, ordered ECG and troponin",
      status: "completed",
    },
    {
      id: "E004",
      timestamp: "14:52",
      event: "ECG Performed",
      stage: "Diagnostics",
      clinician: "Tech Lisa",
      notes: "ECG shows ST elevation in leads II, III, aVF",
      status: "completed",
    },
    {
      id: "E005",
      timestamp: "15:10",
      event: "Lab Results",
      stage: "Diagnostics",
      clinician: "Lab - David",
      notes: "Troponin elevated at 2.5 ng/mL (normal <0.04)",
      status: "completed",
    },
    {
      id: "E006",
      timestamp: "15:15",
      event: "Cardiology Consult Requested",
      stage: "Consultation",
      clinician: "Dr. Sarah Mitchell",
      notes: "STEMI protocol activated, cath lab notified",
      status: "in-progress",
    },
    {
      id: "E007",
      timestamp: "15:30",
      event: "Awaiting Cardiology",
      stage: "Treatment",
      clinician: "Nurse Michael",
      notes: "Patient on aspirin, heparin, and nitroglycerin",
      status: "in-progress",
    },
    {
      id: "E008",
      timestamp: "TBD",
      event: "Cardiac Catheterization",
      stage: "Intervention",
      clinician: "Cardiology Team",
      notes: "Pending cath lab availability",
      status: "pending",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓"
      case "in-progress":
        return "●"
      case "pending":
        return "○"
      default:
        return "○"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const selectedPatientData = patients.find((p) => p.id === selectedPatient)

  return (
    <div className="space-y-6">
      {/* Patient Selector */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Select Patient</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {patients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient.id)}
              className={`p-4 border-2 rounded-lg transition-all text-left ${
                selectedPatient === patient.id ? "border-primary bg-blue-50" : "border-border hover:border-primary"
              }`}
            >
              <p className="font-bold text-foreground">{patient.name}</p>
              <p className="text-xs text-gray-600 mt-1">{patient.id}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                  patient.severity === "critical"
                    ? "bg-red-100 text-red-700"
                    : patient.severity === "high"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {patient.severity.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Patient Journey - {selectedPatientData?.name}</h2>

        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline Line */}
              {index < timelineEvents.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-12 bg-border" />}

              {/* Event */}
              <div
                onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                className={`relative pl-16 pb-4 cursor-pointer transition-all ${
                  expandedEvent === event.id ? "bg-blue-50 p-4 rounded-lg" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white border-4 border-white ${
                    event.status === "completed"
                      ? "bg-green-500"
                      : event.status === "in-progress"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                  }`}
                >
                  {getStatusIcon(event.status)}
                </div>

                {/* Event Content */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-foreground">{event.event}</p>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(event.status)}`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{event.stage}</p>
                    <p className="text-xs text-gray-500 mt-1">By: {event.clinician}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{event.timestamp}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedEvent === event.id && event.notes && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-foreground">{event.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Time in ED", value: "58 min", color: "bg-blue-50 border-blue-200" },
          { label: "Completed Steps", value: "5/8", color: "bg-green-50 border-green-200" },
          { label: "Current Stage", value: "Treatment", color: "bg-orange-50 border-orange-200" },
          { label: "Est. Discharge", value: "16:45", color: "bg-purple-50 border-purple-200" },
        ].map((stat, index) => (
          <div key={index} className={`border-2 ${stat.color} rounded-lg p-4`}>
            <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
