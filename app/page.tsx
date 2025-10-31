'use client'

import { useSession, signIn } from "next-auth/react"
import LoginScreen from "@/components/auth/login-screen"
import Dashboard from "@/components/dashboard/dashboard"
import LandingPage from './landing-page'

export default function Page() {
  // Always show landing page first
  return <LandingPage />
}
