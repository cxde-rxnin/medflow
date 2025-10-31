import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface PatientFlowData {
  currentWaitTime: number
  patientCount: number
  bottlenecks: Array<{ area: string; count: number }>
  waitTimeHistory: number[]
  lwbsTrend: number[]
  lastUpdated: string
}

export function useRealtimePatientFlow() {
  const [data, setData] = useState<PatientFlowData | null>(null)

  useEffect(() => {
    const socket: Socket = io('/api/realtime-patient-flow')
    socket.on('patientFlow', (payload: PatientFlowData) => {
      setData(payload)
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  return data
}
