'use client'

import { useSession, signIn } from "next-auth/react"
import LoginScreen from "@/components/auth/login-screen"
import Dashboard from "@/components/dashboard/dashboard"

export default function Page() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <LoginScreen onLogin={() => signIn()} />
  }

  return <Dashboard user={session.user} onLogout={() => {}} />
}
