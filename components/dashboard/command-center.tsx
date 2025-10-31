"use client"

import { useState } from "react"
import MetricsGrid from "./metrics-grid"
import AlertsPanel from "./alerts-panel"
import ForecastChart from "./forecast-chart"
import RecommendationPanel from "./recommendation-panel"
import HITLReviewModal from "./hitl-review-modal"
import CreatePatientModal from "./create-patient-modal"

export default function CommandCenter() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [showRecommendation, setShowRecommendation] = useState(false)
  const [showHITLReview, setShowHITLReview] = useState(false)
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null)
  const [showCreatePatient, setShowCreatePatient] = useState(false)

  const handleRecommendationClick = (recommendation: any) => {
    setSelectedRecommendation(recommendation)
    setShowHITLReview(true)
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Command Center</h1>
          <p className="text-gray-600 mt-1">Real-time ED optimization dashboard</p>
        </div>
        <button className="btn-primary ml-4" onClick={() => setShowCreatePatient(true)}>
          + Create Patient
        </button>
      </div>

      {/* Create Patient Modal */}
      <CreatePatientModal open={showCreatePatient} onClose={() => setShowCreatePatient(false)} />

      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <div className="lg:col-span-2">
          <ForecastChart />
        </div>

        {/* Alerts Panel */}
        <div>
          <AlertsPanel onSelectAlert={setSelectedAlert} onShowRecommendation={() => setShowRecommendation(true)} />
        </div>
      </div>

      {/* Recommendation Panel Modal */}
      {showRecommendation && (
        <RecommendationPanel
          onClose={() => setShowRecommendation(false)}
          onRecommendationClick={handleRecommendationClick}
        />
      )}

      {/* HITL Review Modal */}
      {showHITLReview && selectedRecommendation && (
        <HITLReviewModal
          recommendation={selectedRecommendation}
          onClose={() => {
            setShowHITLReview(false)
            setSelectedRecommendation(null)
          }}
          onApprove={() => { throw new Error("Function not implemented.") }}
        />
      )}
    </div>
  )
}
