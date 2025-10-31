"use client"

import { useState } from "react"

interface HITLReviewModalProps {
  recommendation: any
  onClose: () => void
  onApprove: () => void
}

export default function HITLReviewModal({ recommendation, onClose, onApprove }: HITLReviewModalProps) {
  const [notes, setNotes] = useState("")
  const [approvers, setApprovers] = useState(["clinician"])
  const [signed, setSigned] = useState(false)

  const handleSign = () => {
    setSigned(true)
    setTimeout(() => {
      onApprove()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6">
          <h2 className="text-2xl font-bold text-foreground">Human-in-the-Loop Review</h2>
          <p className="text-gray-600 text-sm mt-1">Review and approve the recommended action</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recommendation Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-lg text-foreground mb-2">{recommendation.action}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 text-xs mb-1">Expected Impact</p>
                <p className="font-medium text-accent">{recommendation.impact}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Confidence</p>
                <p className="font-medium text-foreground">{Math.round(recommendation.confidence * 100)}%</p>
              </div>
            </div>
          </div>

          {/* Explainability */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-3">Why This Recommendation?</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-accent">→</span>
                <span className="text-foreground">Current occupancy at 87% (threshold: 85%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">→</span>
                <span className="text-foreground">Predicted 24 arrivals in next 4 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">→</span>
                <span className="text-foreground">Average LOS trending upward (+12%)</span>
              </div>
            </div>
          </div>

          {/* Patient Data Snapshot */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-3">Current ED State</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600 text-xs mb-1">Total Patients</p>
                <p className="text-2xl font-bold text-primary">34</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Avg Wait Time</p>
                <p className="text-2xl font-bold text-primary">42 min</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Available Beds</p>
                <p className="text-2xl font-bold text-primary">5</p>
              </div>
            </div>
          </div>

          {/* Simulation */}
          <div className="border border-border rounded-lg p-4 bg-green-50">
            <h3 className="font-bold text-foreground mb-3">Expected Outcome (if approved)</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 text-xs mb-1">Wait Time Reduction</p>
                <p className="text-lg font-bold text-accent">~15 min</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-1">Throughput Increase</p>
                <p className="text-lg font-bold text-accent">+20%</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Clinical Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any clinical context or concerns..."
              className="w-full px-4 py-2 bg-white border border-border rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
              rows={3}
            />
          </div>

          {/* Approvers */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Required Approvals</label>
            <div className="space-y-2">
              {["clinician", "manager"].map((approver) => (
                <label key={approver} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={approvers.includes(approver)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setApprovers([...approvers, approver])
                      } else {
                        setApprovers(approvers.filter((a) => a !== approver))
                      }
                    }}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-foreground capitalize">{approver} Sign-off</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button onClick={onClose} className="btn-secondary flex-1 py-2">
              Cancel
            </button>
            <button
              onClick={handleSign}
              disabled={signed}
              className="btn-primary flex-1 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signed ? "Approved ✓" : "Sign & Approve"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
