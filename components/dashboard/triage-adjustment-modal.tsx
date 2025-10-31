"use client"

import { useState } from "react"

interface TriageAdjustmentModalProps {
  patient: any
  onClose: () => void
  onConfirm: (newSeverity: string) => void
}

export default function TriageAdjustmentModal({ patient, onClose, onConfirm }: TriageAdjustmentModalProps) {
  const [selectedSeverity, setSelectedSeverity] = useState(patient.predictedSeverity)
  const [justification, setJustification] = useState("")

  const severityLevels = [
    { value: "Low", label: "Low Priority", color: "bg-green-100 border-green-300" },
    { value: "Medium", label: "Medium Priority", color: "bg-yellow-100 border-yellow-300" },
    { value: "High", label: "High Priority", color: "bg-red-100 border-red-300" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Adjust Triage Level</h2>
          <p className="text-gray-600 text-sm mt-1">Patient: {patient.name}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Current Severity */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Current AI Prediction</p>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-medium">{patient.predictedSeverity}</span> ({Math.round(patient.confidence * 100)}
                % confidence)
              </p>
            </div>
          </div>

          {/* Severity Selection */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Select New Level</p>
            <div className="space-y-2">
              {severityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedSeverity(level.value)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedSeverity === level.value
                      ? `${level.color} border-current`
                      : "bg-white border-border hover:bg-gray-50"
                  }`}
                >
                  <p className="font-medium text-foreground">{level.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Justification */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Justification (Required)</label>
            <textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explain why you're adjusting the triage level..."
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedSeverity)}
            disabled={!justification.trim()}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Adjustment
          </button>
        </div>
      </div>
    </div>
  )
}
