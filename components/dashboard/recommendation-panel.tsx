"use client"

import { useState } from "react"
import HITLReviewModal from "./hitl-review-modal"

interface RecommendationPanelProps {
  onClose: () => void
  onRecommendationClick?: (recommendation: any) => void
}

export default function RecommendationPanel({ onClose, onRecommendationClick }: RecommendationPanelProps) {
  const [showHITL, setShowHITL] = useState(false)
  const [selectedAction, setSelectedAction] = useState<any>(null)

  const recommendations = [
    {
      id: 1,
      action: "Call in 2 additional nurses",
      impact: "Reduce wait time by ~15 min",
      confidence: 0.92,
      cost: "High",
      timeToEffect: "30 min",
      fairnessScore: 0.95,
    },
    {
      id: 2,
      action: "Convert 4 beds to fast-track",
      impact: "Increase throughput by 20%",
      confidence: 0.85,
      cost: "Low",
      timeToEffect: "10 min",
      fairnessScore: 0.98,
    },
    {
      id: 3,
      action: "Redirect low-acuity to urgent care",
      impact: "Free up 6 ED beds",
      confidence: 0.78,
      cost: "Medium",
      timeToEffect: "15 min",
      fairnessScore: 0.92,
    },
  ]

  const handleApprove = (action: any) => {
    setSelectedAction(action)
    if (onRecommendationClick) {
      onRecommendationClick(action)
    } else {
      setShowHITL(true)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Prescriptive Recommendations</h2>
              <p className="text-gray-600 text-sm mt-1">AI-generated actions to optimize ED flow</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-foreground">{rec.action}</h3>
                  <span className="badge-info">{Math.round(rec.confidence * 100)}% confidence</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Expected Impact</p>
                    <p className="font-medium text-accent">{rec.impact}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Cost</p>
                    <p className="font-medium text-foreground">{rec.cost}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Time to Effect</p>
                    <p className="font-medium text-foreground">{rec.timeToEffect}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Fairness Score</p>
                    <p className="font-medium text-accent">{Math.round(rec.fairnessScore * 100)}%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleApprove(rec)} className="btn-primary flex-1 py-2 text-sm">
                    Approve & Review
                  </button>
                  <button className="btn-secondary flex-1 py-2 text-sm">Schedule</button>
                  <button className="btn-secondary py-2 px-4 text-sm">More Info</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HITL Review Modal */}
      {showHITL && selectedAction && (
        <HITLReviewModal
          recommendation={selectedAction}
          onClose={() => {
            setShowHITL(false)
            setSelectedAction(null)
          }}
          onApprove={() => {
            setShowHITL(false)
            setSelectedAction(null)
            onClose()
          }}
        />
      )}
    </>
  )
}
