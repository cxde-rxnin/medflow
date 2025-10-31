"use client"

import { useIsMobile } from '@/hooks/use-mobile'
import { useState } from 'react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
  user: any
  onLogout: () => void
}

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Command Center", icon: "📊" },
    { id: "clinician", label: "Clinician Dashboard", icon: "👨‍⚕️" },
    { id: "triage", label: "Triage Assistant", icon: "👥" },
    { id: "audit", label: "Audit Log", icon: "📋" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  // Hamburger trigger for mobile
  if (isMobile) {
    return (
      <>
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded bg-white shadow-md md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        {open && (
          <aside className="fixed inset-0 z-40 bg-black bg-opacity-40 flex md:hidden" onClick={() => setOpen(false)}>
            <div className="w-64 bg-white h-full shadow-lg" onClick={e => e.stopPropagation()}>
              {/* Logo */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="font-bold text-lg text-foreground">MedFlow</h1>
                    <p className="text-xs text-gray-500">AI Analytics</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-primary border-l-4 border-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* User Info */}
              <div className="p-4 border-t border-border space-y-4">
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Logged in as</p>
                  <p className="font-medium text-sm text-foreground">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button onClick={onLogout} className="w-full btn-secondary py-2 text-sm">
                  Sign Out
                </button>
              </div>
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-2 rounded bg-gray-100">Close</button>
            </div>
          </aside>
        )}
      </>
    )
  }

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">MedFlow</h1>
            <p className="text-xs text-gray-500">AI Analytics</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${
              activeTab === item.id
                ? "bg-blue-50 text-primary border-l-4 border-primary"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border space-y-4">
        <div className="px-4 py-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Logged in as</p>
          <p className="font-medium text-sm text-foreground">{user?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
        <button onClick={onLogout} className="w-full btn-secondary py-2 text-sm">
          Sign Out
        </button>
      </div>
    </aside>
  )
}
