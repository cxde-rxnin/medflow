'use client'
import { useSession, signOut } from 'next-auth/react'
import Dashboard from '@/components/dashboard/dashboard'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/auth/login')
    return null
  }

  return <Dashboard user={session.user} onLogout={() => signOut()} />
}
