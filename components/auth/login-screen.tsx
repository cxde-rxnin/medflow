"use client"

import { useState } from "react"
import QRScanner from "./qr-scanner"
import EmailLogin from "./email-login"

interface LoginScreenProps {
  onLogin: (userData: any) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [loginMethod, setLoginMethod] = useState<"email" | "qr" | null>(null)

  if (loginMethod === "email") {
    return <EmailLogin onBack={() => setLoginMethod(null)} />
  }

  if (loginMethod === "qr") {
    return <QRScanner onBack={() => setLoginMethod(null)} onLogin={onLogin} />
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">MedFlow AI</h1>
          <p className="text-gray-600">Emergency Department Optimization</p>
        </div>

        {/* Login Options */}
        <div className="space-y-4">
          <button
            onClick={() => setLoginMethod("email")}
            className="w-full btn-primary flex items-center justify-center gap-3 py-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Sign in with Email
          </button>

          <button
            onClick={() => setLoginMethod("qr")}
            className="w-full btn-secondary flex items-center justify-center gap-3 py-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Scan QR Code
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-gray-600">
          <p>Secure healthcare analytics platform</p>
          <p className="mt-2">HIPAA compliant • Encrypted • Audited</p>
        </div>
      </div>
    </div>
  )
}