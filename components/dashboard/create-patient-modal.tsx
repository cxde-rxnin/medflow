import React, { useState } from "react"

interface CreatePatientModalProps {
  open: boolean
  onClose: () => void
  onCreated?: (patient: any) => void
}

export default function CreatePatientModal({ open, onClose, onCreated }: CreatePatientModalProps) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    chiefComplaint: "",
    arrivalTime: "",
    language: "English",
    vitals: {
      bp: "",
      hr: "",
      temp: "",
      o2: "",
    },
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (step === 2 && ["bp", "hr", "temp", "o2"].includes(name)) {
      setForm({ ...form, vitals: { ...form.vitals, [name]: value } })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    // Basic validation for step 1
    if (step === 1 && (!form.name || !form.age || !form.gender || !form.chiefComplaint)) {
      setError("Please fill all required fields.")
      return
    }
    setStep(2)
  }

  const handleBack = () => {
    setError("")
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const payload = {
        ...form,
        age: Number(form.age),
        vitals: {
          bp: form.vitals.bp,
          hr: form.vitals.hr ? Number(form.vitals.hr) : undefined,
          temp: form.vitals.temp ? Number(form.vitals.temp) : undefined,
          o2: form.vitals.o2 ? Number(form.vitals.o2) : undefined,
        }
      }
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to create patient")
      if (onCreated) onCreated(data)
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to create patient")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Patient</h2>
        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input w-full" required />
              <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="input w-full" required />
              <select name="gender" value={form.gender} onChange={handleChange} className="input w-full" required>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input name="chiefComplaint" value={form.chiefComplaint} onChange={handleChange} placeholder="Chief Complaint" className="input w-full" required />
              <input name="arrivalTime" value={form.arrivalTime} onChange={handleChange} placeholder="Arrival Time" type="datetime-local" className="input w-full" />
              <select name="language" value={form.language} onChange={handleChange} className="input w-full">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Chinese">Chinese</option>
                <option value="Other">Other</option>
              </select>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn-primary flex-1">Next</button>
                <button type="button" className="btn-secondary flex-1" onClick={onClose}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <input name="bp" value={form.vitals.bp} onChange={handleChange} placeholder="Blood Pressure (BP)" className="input w-full" />
              <input name="hr" value={form.vitals.hr} onChange={handleChange} placeholder="Heart Rate (HR)" type="number" className="input w-full" />
              <input name="temp" value={form.vitals.temp} onChange={handleChange} placeholder="Temperature (Temp)" type="number" className="input w-full" />
              <input name="o2" value={form.vitals.o2} onChange={handleChange} placeholder="O₂ Saturation" type="number" className="input w-full" />
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="flex gap-2 mt-4">
                <button type="button" className="btn-secondary flex-1" onClick={handleBack}>Back</button>
                <button type="submit" className="btn-primary flex-1" disabled={loading}>{loading ? "Creating..." : "Create"}</button>
                <button type="button" className="btn-secondary flex-1" onClick={onClose}>Cancel</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
