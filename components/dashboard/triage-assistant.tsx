"use client"

import React, { useState, useEffect } from "react"
import PatientCard from "./patient-card"
import TriageAdjustmentModal from "./triage-adjustment-modal"
import { toast } from "react-hot-toast"

export default function TriageAssistant() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showPatientDetail, setShowPatientDetail] = useState(false)
  const [showAdjustment, setShowAdjustment] = useState(false)
  const [adjustingPatient, setAdjustingPatient] = useState<any>(null)
  const [aiLoadingMap, setAiLoadingMap] = useState<{ [id: string]: boolean }>({})
  const [aiResultMap, setAiResultMap] = useState<{ [id: string]: string | null }>({})
  const [aiSuggestedLevelMap, setAiSuggestedLevelMap] = useState<{ [id: string]: string | null }>({})
  const [patients, setPatients] = useState<any[]>([])
  const [loadingPatients, setLoadingPatients] = useState(true)
  const [triagedPatients, setTriagedPatients] = useState<any[]>([])
  const [triageStartTimes, setTriageStartTimes] = useState<{ [id: string]: number }>({})
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const paginatedPatients = patients.slice((page - 1) * pageSize, page * pageSize)

  // Fetch patients from backend
  useEffect(() => {
    async function fetchPatients() {
      setLoadingPatients(true)
      try {
        const res = await fetch("/api/patients")
        const data = await res.json()
        // Ensure each patient has a unique ID and _id for DB updates
        const patientsWithIds = data.map((p: any, index: number) => ({
          ...p,
          id: p.id || p._id || `patient-${index}-${Date.now()}`,
          _id: p._id // always set _id for DB updates
        }))
        console.log('Loaded patients:', patientsWithIds.map((p: any) => ({ id: p.id, _id: p._id, name: p.name })))
        setPatients(patientsWithIds)
      } catch (err) {
        toast.error("Failed to load patients")
      } finally {
        setLoadingPatients(false)
      }
    }
    fetchPatients()
  }, [])

  useEffect(() => {
    if (!loadingPatients) {
      // Set triage start time for each patient when loaded
      setTriageStartTimes((prev) => {
        const newTimes = { ...prev }
        patients.forEach((p) => {
          if (!newTimes[p.id]) newTimes[p.id] = Date.now()
        })
        return newTimes
      })
    }
  }, [loadingPatients, patients])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      default:
        return "text-green-600"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return "badge-danger"
      case "Medium":
        return "badge-warning"
      default:
        return "badge-success"
    }
  }

  const handleAcceptTriage = async (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    if (patient) {
      // Mark patient as triaged in DB
      try {
        await fetch('/api/patients', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: patient._id, triaged: true })
        })
        toast.success('Patient marked as triaged!')
      } catch (err: any) {
        toast.error('Failed to update triage status')
      }
      setTriagedPatients((prev) => [
        ...prev,
        {
          ...patient,
          triageTime: triageStartTimes[patientId] ? (Date.now() - triageStartTimes[patientId]) / 1000 : undefined,
        },
      ])
    }
    setPatients((prev) => prev.filter((p) => p.id !== patientId))
  }

  const handleAdjustLevel = (patient: any) => {
    setAdjustingPatient(patient)
    setShowAdjustment(true)
  }

  async function handleAIAssist(patient: any) {
    console.log('AI Assist clicked for patient:', patient.id, patient.name)
    setAiLoadingMap((prev) => ({ ...prev, [patient.id]: true }))
    setAiResultMap((prev) => ({ ...prev, [patient.id]: null }))
    setAiSuggestedLevelMap((prev) => ({ ...prev, [patient.id]: null }))
    try {
      const vitals = patient.vitals || {}
      const context = `Patient: ${patient.name}, Age: ${patient.age}, Gender: ${patient.gender}, Complaint: ${patient.chiefComplaint}, Vitals: BP ${vitals.bp ?? "N/A"}, HR ${vitals.hr ?? "N/A"}, Temp ${vitals.temp ?? "N/A"}, O2 ${vitals.o2 ?? "N/A"}`
      console.log('Sending context to API:', context)
      const res = await fetch("/api/openai-triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context }),
      })
      const data = await res.json()
      console.log('API response:', data)
      if (!res.ok) throw new Error(data.error || "AI error")
      setAiResultMap((prev) => {
        console.log('Setting AI result for patient:', patient.id)
        return { ...prev, [patient.id]: data.answer }
      })
      
      // Extract suggested triage level from AI response (flexible regex patterns)
      const patterns = [
        /(?:Triage Level|Level|Priority):?\s*(\d+|Low|Medium|High|Urgent|Critical|Emergency)/i,
        /(?:recommend|suggest|assign)(?:ed|ing)?\s+(?:Level\s+)?(\d+|Low|Medium|High|Urgent|Critical|Emergency)/i,
        /\b(High|Medium|Low|Urgent|Critical|Emergency)\s+(?:priority|urgency|level)/i,
        /Level\s+(\d+)/i
      ]
      
      let suggestedLevel = null
      for (const pattern of patterns) {
        const match = data.answer.match(pattern)
        if (match && match[1]) {
          suggestedLevel = match[1]
          break
        }
      }
      
      if (suggestedLevel) {
        console.log('Extracted triage level:', suggestedLevel)
        setAiSuggestedLevelMap((prev) => ({ ...prev, [patient.id]: suggestedLevel }))
      } else {
        console.warn('Could not extract triage level from AI response:', data.answer)
      }
    } catch (err: any) {
      console.error('AI Assist error:', err)
      toast.error(err.message || "Failed to get AI triage")
    } finally {
      setAiLoadingMap((prev) => ({ ...prev, [patient.id]: false }))
    }
  }

  async function handleAcceptAITriage(patientId: string) {
    const suggested = aiSuggestedLevelMap[patientId]
    const aiText = aiResultMap[patientId] || ''
    // Extract confidence from AI response
    const confMatch = aiText.match(/Confidence: (\d+)%/i)
    const confidence = confMatch ? parseInt(confMatch[1], 10) / 100 : undefined
    const triageTime = triageStartTimes[patientId] ? (Date.now() - triageStartTimes[patientId]) / 1000 : undefined
    const patient = patients.find((p) => p.id === patientId)
    if (patient) {
      // Save triage to database
      try {
        // Save AI triage result
        const res = await fetch('/api/save-triage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            context: `Patient: ${patient.name}, Age: ${patient.age}, Gender: ${patient.gender}, Complaint: ${patient.chiefComplaint}, Vitals: BP ${patient.vitals?.bp ?? "N/A"}, HR ${patient.vitals?.hr ?? "N/A"}, Temp ${patient.vitals?.temp ?? "N/A"}, O2 ${patient.vitals?.o2 ?? "N/A"}`,
            answer: aiText
          })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to save triage')
        // Persist triaged: true in DB
        await fetch('/api/patients', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: patient._id, triaged: true })
        })
        toast.success('AI triage saved & patient marked as triaged!')
      } catch (err: any) {
        toast.error(err.message || 'Failed to save AI triage')
      }
      setTriagedPatients((prev) => [
        ...prev,
        {
          ...patient,
          predictedSeverity: suggested,
          confidence: confidence ?? patient.confidence,
          triageTime,
        },
      ])
    }
    setPatients((prev) => prev.filter((p) => p.id !== patientId))
    // Clear the AI result for this patient after accepting
    setAiResultMap((prev) => ({ ...prev, [patientId]: null }))
    setAiSuggestedLevelMap((prev) => ({ ...prev, [patientId]: null }))
  }

  // Stats
  const highPriorityCount = patients.filter((p) => p.predictedSeverity === "High" || p.triageLevel === 1).length
  const avgConfidence = triagedPatients.length
    ? Math.round(
        triagedPatients.reduce((sum, p) => sum + (p.confidence ? p.confidence * 100 : 0), 0) / triagedPatients.length
      )
    : 0
  const avgTriageTime = triagedPatients.length
    ? Math.round(
        triagedPatients.reduce((sum, p) => sum + (p.triageTime || 0), 0) / triagedPatients.length
      )
    : 0

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Triage Assistant</h1>
        <p className="text-gray-600 mt-1">AI-assisted patient triage with NLP analysis</p>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Waiting for Triage</p>
          <p className="text-3xl font-bold text-primary">{patients.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">High Priority</p>
          <p className="text-3xl font-bold text-red-600">{highPriorityCount}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Avg Triage Time</p>
          <p className="text-3xl font-bold text-primary">{avgTriageTime} sec</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Avg Model Confidence</p>
          <p className="text-3xl font-bold text-accent">{avgConfidence}%</p>
        </div>
      </div>

      {/* Patient Queue */}
      <div className="space-y-3">
        {loadingPatients ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">Loading patients...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">All patients triaged successfully!</p>
          </div>
        ) : (
          paginatedPatients.map((patient, index) => (
            <div key={`${patient.id}-${index}`} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-foreground">{patient.name}</h3>
                    <span className="badge-info">
                      {patient.age}y {patient.gender}
                    </span>
                    {patient.language !== "English" && <span className="badge-info">{patient.language}</span>}
                    {patient.biasFlag && <span className="badge-warning">⚠️ Bias Check</span>}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{patient.chiefComplaint}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Arrived: {patient.arrivalTime || "N/A"}</span>
                    <span>BP: {patient.vitals?.bp ?? "N/A"}</span>
                    <span>HR: {patient.vitals?.hr ?? "N/A"}</span>
                    <span>O₂: {patient.vitals?.o2 ?? "N/A"}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`${getSeverityBadge(patient.predictedSeverity)} mb-2 block`}>
                    {patient.predictedSeverity}
                  </span>
                  <p className="text-xs text-gray-500 mb-1">{Math.round(patient.confidence * 100)}% confidence</p>
                  <p className="text-sm font-medium text-foreground">Est. LOS: {patient.predictedLOS}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border">
                <button onClick={() => handleAcceptTriage(patient.id)} className="btn-primary flex-1 py-2 text-sm">
                  Accept Triage
                </button>
                <button onClick={() => handleAdjustLevel(patient)} className="btn-secondary flex-1 py-2 text-sm">
                  Adjust Level
                </button>
                <button
                  onClick={() => {
                    setSelectedPatient(patient)
                    setShowPatientDetail(true)
                  }}
                  className="btn-secondary py-2 px-4 text-sm"
                >
                  Details
                </button>
                <button
                  onClick={() => {
                    console.log('Clicking AI for patient:', patient.id, patient.name)
                    console.log('Current aiLoadingMap:', aiLoadingMap)
                    console.log('Current aiResultMap:', aiResultMap)
                    handleAIAssist(patient)
                  }}
                  className="btn-accent bg-green-600 text-white py-2 px-4 text-sm"
                  disabled={aiLoadingMap[patient.id]}
                >
                  {aiLoadingMap[patient.id] ? "AI Loading..." : "AI Triage"}
                </button>
              </div>
              {aiResultMap[patient.id] && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-xs text-gray-500 mb-1">Patient ID: {patient.id}</p>
                  <strong className="text-blue-900">AI Recommendation:</strong>
                  <p className="mt-1 whitespace-pre-line text-gray-700">{aiResultMap[patient.id]}</p>
                  {aiSuggestedLevelMap[patient.id] && (
                    <button
                      className="btn-primary mt-2 text-sm"
                      onClick={() => handleAcceptAITriage(patient.id)}
                    >
                      Accept AI Triage Level: {aiSuggestedLevelMap[patient.id]}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        {/* Pagination Controls */}
        {patients.length > pageSize && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              className="btn-secondary px-4 py-2"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">Page {page} of {Math.ceil(patients.length / pageSize)}</span>
            <button
              className="btn-secondary px-4 py-2"
              disabled={page === Math.ceil(patients.length / pageSize)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Patient Detail Modal */}
      {showPatientDetail && selectedPatient && (
        <PatientCard patient={selectedPatient} onClose={() => setShowPatientDetail(false)} />
      )}

      {/* Triage Adjustment Modal */}
      {showAdjustment && adjustingPatient && (
        <TriageAdjustmentModal
          patient={adjustingPatient}
          onClose={() => {
            setShowAdjustment(false)
            setAdjustingPatient(null)
          }}
          onConfirm={(newSeverity) => {
            setPatients(
              patients.map((p) => (p.id === adjustingPatient.id ? { ...p, predictedSeverity: newSeverity } : p)),
            )
            setShowAdjustment(false)
            setAdjustingPatient(null)
          }}
        />
      )}
    </div>
  )
}