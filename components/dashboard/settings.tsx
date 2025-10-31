"use client"

import { useState } from "react"

export default function Settings() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.8)
  const [fairnessEnabled, setFairnessEnabled] = useState(true)
  const [dataRetention, setDataRetention] = useState("7years")
  const [showFairnessTest, setShowFairnessTest] = useState(false)

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings & Policies</h1>
        <p className="text-gray-600 mt-1">Configure system behavior, governance, and compliance</p>
      </div>

      {/* Governance Settings */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-foreground">Decision Governance</h2>
        </div>

        <div className="space-y-6">
          {/* Confidence Threshold */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              AI Confidence Threshold: {Math.round(confidenceThreshold * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="0.95"
              step="0.05"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number.parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-xs text-gray-600 mt-2">Recommendations below this threshold require human review</p>
          </div>

          {/* Fairness Constraints */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={fairnessEnabled}
                onChange={(e) => setFairnessEnabled(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="font-medium text-foreground">Enable Fairness Constraints</span>
            </label>
            <p className="text-xs text-gray-600 mt-2 ml-7">Enforce equity constraints in optimization engine</p>
          </div>

          {/* Data Retention */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Data Retention Policy</label>
            <select
              value={dataRetention}
              onChange={(e) => setDataRetention(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            >
              <option value="30days">30 Days</option>
              <option value="90days">90 Days</option>
              <option value="1year">1 Year</option>
              <option value="7years">7 Years (HIPAA Compliant)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-foreground">Privacy & Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Encryption at Rest</p>
              <p className="text-xs text-gray-600">AES-256</p>
            </div>
            <span className="badge-success">Enabled</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Encryption in Transit</p>
              <p className="text-xs text-gray-600">TLS 1.3</p>
            </div>
            <span className="badge-success">Enabled</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Field-Level Tokenization</p>
              <p className="text-xs text-gray-600">PHI Protection</p>
            </div>
            <span className="badge-success">Enabled</span>
          </div>

          <button className="w-full btn-secondary py-2 mt-4">Rotate Encryption Keys</button>
        </div>
      </div>

      {/* Compliance & Audits */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-foreground">Compliance & Audits</h2>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowFairnessTest(true)}
            className="w-full btn-secondary py-2 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span>Run Fairness Test</span>
            <span>→</span>
          </button>
          <button className="w-full btn-secondary py-2 text-left flex items-center justify-between hover:bg-gray-50">
            <span>Generate Compliance Report</span>
            <span>→</span>
          </button>
          <button className="w-full btn-secondary py-2 text-left flex items-center justify-between hover:bg-gray-50">
            <span>View Model Versions</span>
            <span>→</span>
          </button>
          <button className="w-full btn-secondary py-2 text-left flex items-center justify-between hover:bg-gray-50">
            <span>Ethics Committee Review</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* No-Discrimination Policy */}
      <div className="card border-2 border-accent">
        <div className="card-header">
          <h2 className="text-xl font-bold text-accent">No-Discrimination Policy</h2>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-accent mt-1">✓</span>
            <span className="text-foreground">
              Protected characteristics (race, religion, sexual orientation) are never used as direct inputs
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-accent mt-1">✓</span>
            <span className="text-foreground">
              Fairness constraints enforce parity on wait times across demographic groups
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-accent mt-1">✓</span>
            <span className="text-foreground">Quarterly external fairness audits conducted</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-accent mt-1">✓</span>
            <span className="text-foreground">Hospital ethics oversight committee reviews all policy changes</span>
          </div>
        </div>

        <button className="w-full btn-accent py-2 mt-4">View Full Policy Document</button>
      </div>

      {/* Fairness Test Modal */}
      {showFairnessTest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-border rounded-lg max-w-md w-full shadow-xl">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Fairness Test Results</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Demographic Parity</span>
                  <span className="badge-success">Pass</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Equal Opportunity</span>
                  <span className="badge-success">Pass</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Calibration</span>
                  <span className="badge-success">Pass</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Overall Status:</span> All fairness constraints satisfied
                </p>
              </div>
              <button onClick={() => setShowFairnessTest(false)} className="w-full btn-primary py-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
