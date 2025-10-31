"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import CommandCenter from "./command-center";
import ClinicianDashboard from "./clinician-dashboard";
import TriageAssistant from "./triage-assistant";
import AuditLog from "./audit-log";
import Settings from "./settings";
import PatientFlowDashboard from "./patient-flow-dashboard";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"dashboard" | "clinician" | "triage" | "audit" | "settings">("dashboard");

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    if (typeof window !== "undefined") router.push("/auth/signin");
    return null;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {activeTab === "dashboard" && (
          <>
            <CommandCenter />
            <div className="mt-6 px-6 mb-4">
              <PatientFlowDashboard />
            </div>
          </>
        )}
        {activeTab === "clinician" && <ClinicianDashboard />}
        {activeTab === "triage" && <TriageAssistant />}
        {activeTab === "audit" && <AuditLog />}
        {activeTab === "settings" && <Settings />}
      </main>
    </div>
  );
}
