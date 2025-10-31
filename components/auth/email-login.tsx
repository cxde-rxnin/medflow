"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

interface EmailLoginProps {
  onBack: () => void
}

export default function EmailLogin({ onBack }: EmailLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false)
    if (result?.error) {
      const message =
        result.error === "CredentialsSignin"
          ? "Invalid email or password"
          : result.error
      toast.error(message)
      setError(message)
    } else if (result?.ok) {
      toast.success("Signed in successfully!")
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-gray-50 to-white flex items-center justify-center p-4">
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
            <h2 className="text-2xl font-bold text-foreground">Sign in to MedFlow</h2>
            <p className="text-gray-600 text-sm mt-1">Enter your credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@metrogeneral.com"
                className="w-full px-4 py-2 bg-white border border-border rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-white border border-border rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
