import { Server } from 'socket.io'
import type { NextApiRequest } from 'next'

let io: Server | undefined

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      // Send initial data
      socket.emit('patientFlow', getPatientFlowData())

      // Example: broadcast updates every 10 seconds
      setInterval(() => {
        socket.emit('patientFlow', getPatientFlowData())
      }, 10000)
    })
  }
  res.end()
}

function getPatientFlowData() {
  // Replace with real DB query or analytics
  return {
    currentWaitTime: 120,
    patientCount: 42,
    bottlenecks: [
      { area: 'Triage', count: 15 },
      { area: 'Treatment', count: 20 },
      { area: 'Discharge', count: 7 },
    ],
    waitTimeHistory: [80, 90, 100, 110, 120],
    lwbsTrend: [2, 3, 1, 4, 2],
    lastUpdated: new Date().toISOString(),
  }
}
