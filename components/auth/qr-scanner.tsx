"use client"

import { useState } from "react"

interface QRScannerProps {
  onLogin: (userData: any) => void
  onBack: () => void
}

export default function QRScanner({ onLogin, onBack }: QRScannerProps) {
  const [scanning, setScanning] = useState(true)
  const [scanned, setScanned] = useState(false)

  const handleSimulatedScan = () => {
    setScanning(false)
    setScanned(true)

    setTimeout(() => {
      onLogin({
        id: "2",
        email: "nurse@metrogeneral.com",
        name: "Sarah Johnson",
        role: "nurse",
        department: "ED",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-blue-700 mb-8 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="card">
          <div className="card-header">
            <h2 className="text-2xl font-bold text-foreground">Scan QR Code</h2>
            <p className="text-gray-600 text-sm mt-1">Point camera at your ID badge</p>
          </div>

          {/* QR Scanner Simulation */}
          <div className="relative w-full aspect-square bg-white border-2 border-dashed border-blue-300 rounded-lg overflow-hidden mb-4">
            {scanning && (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-blue-300 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-gray-600 text-sm">Waiting for QR code...</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-transparent to-blue-100 animate-pulse" />
              </>
            )}

            {scanned && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-100">
                <div className="text-center">
                  <svg className="w-16 h-16 text-accent mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <p className="text-accent font-medium">QR Code Scanned!</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSimulatedScan}
            disabled={scanned}
            className="w-full btn-primary py-2 disabled:opacity-50"
          >
            {scanned ? "Authenticating..." : "Simulate QR Scan"}
          </button>

          <div className="mt-4 pt-4 border-t border-border text-center text-xs text-gray-600">
            In production, this would use device camera
          </div>
        </div>
      </div>
    </div>
  )
}
