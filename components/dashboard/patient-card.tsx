"use client"

import { useState } from "react"

interface PatientCardProps {
  patient: any
  onClose: () => void
}

export default function PatientCard({ patient, onClose }: PatientCardProps) {
  const [showConsultModal, setShowConsultModal] = useState(false)
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false)
  const [consultSubmitted, setConsultSubmitted] = useState(false)
  const [diagnosticsSubmitted, setDiagnosticsSubmitted] = useState(false)

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
              <p className="text-gray-600 text-sm mt-1">Patient ID: {patient.id}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Demographics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-xs mb-1">Age</p>
                <p className="font-bold text-foreground">{patient.age} years</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Gender</p>
                <p className="font-bold text-foreground">{patient.gender}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Language</p>
                <p className="font-bold text-foreground">{patient.language}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Arrival Time</p>
                <p className="font-bold text-foreground">{patient.arrivalTime}</p>
              </div>
            </div>

            {/* Chief Complaint */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-bold text-foreground mb-2">Chief Complaint</h3>
              <p className="text-foreground">{patient.chiefComplaint}</p>
            </div>

            {/* Vitals */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-bold text-foreground mb-4">Vital Signs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-600 text-xs mb-1">Blood Pressure</p>
                  <p className="text-lg font-bold text-foreground">{patient.vitals.bp}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">Heart Rate</p>
                  <p className="text-lg font-bold text-foreground">{patient.vitals.hr} bpm</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">Temperature</p>
                  <p className="text-lg font-bold text-foreground">{patient.vitals.temp}°F</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs mb-1">O₂ Saturation</p>
                  <p className="text-lg font-bold text-foreground">{patient.vitals.o2}%</p>
                </div>
              </div>
            </div>

            {/* AI Predictions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-foreground mb-3">AI Predictions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Predicted Severity</span>
                  <span className="font-bold text-red-600">{patient.predictedSeverity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Predicted LOS</span>
                  <span className="font-bold text-accent">{patient.predictedLOS}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Model Confidence</span>
                  <span className="font-bold text-accent">{Math.round(patient.confidence * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Explainability */}
            <div className="border border-border rounded-lg p-4">
              <h3 className="font-bold text-foreground mb-3">Why This Prediction?</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-accent">→</span>
                  <span className="text-foreground">Elevated BP and HR indicate acute condition</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">→</span>
                  <span className="text-foreground">Chief complaint matches high-acuity patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-accent">→</span>
                  <span className="text-foreground">Similar cases averaged 180 min LOS</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <button onClick={() => setShowConsultModal(true)} className="btn-primary py-2 text-sm">
                Request Consult
              </button>
              <button onClick={() => setShowDiagnosticsModal(true)} className="btn-primary py-2 text-sm">
                Order Diagnostics
              </button>
              <button className="btn-secondary py-2 text-sm">Send to Fast-Track</button>
              <button className="btn-secondary py-2 text-sm">Request Human Review</button>
            </div>
          </div>
        </div>
      </div>

      {/* Consult Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-border rounded-lg max-w-md w-full shadow-xl">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Request Specialist Consult</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Specialty</label>
                <select className="w-full px-4 py-2 bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>General Surgery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                <select className="w-full px-4 py-2 bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100">
                  <option>Urgent</option>
                  <option>Standard</option>
                  <option>Routine</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button onClick={() => setShowConsultModal(false)} className="btn-secondary flex-1 py-2">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setConsultSubmitted(true)
                    setTimeout(() => {
                      setShowConsultModal(false)
                      setConsultSubmitted(false)
                    }, 1500)
                  }}
                  className="btn-primary flex-1 py-2"
                >
                  {consultSubmitted ? "Submitted ✓" : "Submit Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diagnostics Modal */}
      {showDiagnosticsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-border rounded-lg max-w-md w-full shadow-xl">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Order Diagnostics</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                {["ECG", "Chest X-Ray", "Blood Work", "CT Scan"].map((test) => (
                  <label key={test} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                    <span className="text-sm text-foreground">{test}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2 pt-4">
                <button onClick={() => setShowDiagnosticsModal(false)} className="btn-secondary flex-1 py-2">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setDiagnosticsSubmitted(true)
                    setTimeout(() => {
                      setShowDiagnosticsModal(false)
                      setDiagnosticsSubmitted(false)
                    }, 1500)
                  }}
                  className="btn-primary flex-1 py-2"
                >
                  {diagnosticsSubmitted ? "Ordered ✓" : "Order Tests"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
