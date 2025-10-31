"use client"

import { useState } from "react"

interface TeamMember {
  id: string
  name: string
  role: string
  specialty: string
  status: "available" | "busy" | "break"
  patientsAssigned: number
  currentPatient?: string
  avatar: string
}

interface Assignment {
  id: string
  patientName: string
  patientId: string
  severity: "critical" | "high" | "medium" | "low"
  assignedTo: string
  status: "pending" | "in-progress" | "completed"
  priority: number
}

export default function ClinicianTeamView() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)

  const teamMembers: TeamMember[] = [
    {
      id: "T001",
      name: "Dr. Sarah Mitchell",
      role: "Attending Physician",
      specialty: "Emergency Medicine",
      status: "busy",
      patientsAssigned: 4,
      currentPatient: "John Smith (P001)",
      avatar: "SM",
    },
    {
      id: "T002",
      name: "Dr. James Chen",
      role: "Resident",
      specialty: "Emergency Medicine",
      status: "available",
      patientsAssigned: 2,
      avatar: "JC",
    },
    {
      id: "T003",
      name: "Nurse Patricia",
      role: "RN - Triage",
      specialty: "Triage & Assessment",
      status: "busy",
      patientsAssigned: 6,
      currentPatient: "Emily Davis (P004)",
      avatar: "PN",
    },
    {
      id: "T004",
      name: "Nurse Michael",
      role: "RN - Treatment",
      specialty: "Patient Care",
      status: "available",
      patientsAssigned: 3,
      avatar: "NM",
    },
    {
      id: "T005",
      name: "Tech Lisa",
      role: "Imaging Tech",
      specialty: "Radiology",
      status: "busy",
      patientsAssigned: 5,
      currentPatient: "CT Scan - P007",
      avatar: "TL",
    },
  ]

  const assignments: Assignment[] = [
    {
      id: "A001",
      patientName: "John Smith",
      patientId: "P001",
      severity: "high",
      assignedTo: "Dr. Sarah Mitchell",
      status: "in-progress",
      priority: 1,
    },
    {
      id: "A002",
      patientName: "Emily Davis",
      patientId: "P004",
      severity: "critical",
      assignedTo: "Nurse Patricia",
      status: "in-progress",
      priority: 1,
    },
    {
      id: "A003",
      patientName: "James Taylor",
      patientId: "P007",
      severity: "high",
      assignedTo: "Tech Lisa",
      status: "in-progress",
      priority: 2,
    },
    {
      id: "A004",
      patientName: "Sarah Johnson",
      patientId: "P002",
      severity: "medium",
      assignedTo: "Dr. James Chen",
      status: "pending",
      priority: 3,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700 border-green-300"
      case "busy":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "break":
        return "bg-gray-100 text-gray-700 border-gray-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "low":
        return "bg-green-100 text-green-700 border-green-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Team Members Grid */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">ED Team Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
              className="border border-border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Specialty:</span>
                  <span className="font-medium text-foreground">{member.specialty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Patients:</span>
                  <span className="font-bold text-primary">{member.patientsAssigned}</span>
                </div>
                {member.currentPatient && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-gray-600 mb-1">Currently:</p>
                    <p className="text-xs font-medium text-foreground">{member.currentPatient}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              {selectedMember === member.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <button className="w-full btn-secondary py-2 text-xs">Assign Patient</button>
                  <button className="w-full btn-secondary py-2 text-xs">Send Message</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Assignments */}
      <div className="bg-white border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Active Assignments</h2>
          <button onClick={() => setShowAssignmentModal(true)} className="btn-primary py-2 px-4 text-sm">
            + New Assignment
          </button>
        </div>

        <div className="space-y-3">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getSeverityColor(assignment.severity)}`}>
                    {assignment.severity.toUpperCase()}
                  </span>
                  <p className="font-bold text-foreground">{assignment.patientName}</p>
                  <p className="text-xs text-gray-600">({assignment.patientId})</p>
                </div>
                <p className="text-sm text-gray-600">Assigned to: {assignment.assignedTo}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    assignment.status === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {assignment.status}
                </span>
                <button className="btn-secondary py-1 px-3 text-xs">Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-border rounded-lg max-w-md w-full shadow-xl">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Create New Assignment</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Patient</label>
                <select className="w-full px-4 py-2 bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
                  <option>John Smith (P001) - High</option>
                  <option>Sarah Johnson (P002) - Medium</option>
                  <option>Michael Brown (P003) - Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assign To</label>
                <select className="w-full px-4 py-2 bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
                  <option>Dr. James Chen</option>
                  <option>Nurse Michael</option>
                  <option>Tech Lisa</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button onClick={() => setShowAssignmentModal(false)} className="btn-secondary flex-1 py-2">
                  Cancel
                </button>
                <button onClick={() => setShowAssignmentModal(false)} className="btn-primary flex-1 py-2">
                  Create Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
