"use client"

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
