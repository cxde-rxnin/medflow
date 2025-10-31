import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db();
    // Example: aggregate patient count and LWBS for today
    const patientCount = await db.collection('patients').countDocuments();
    const lwbsCount = await db.collection('patient_flow').findOne({}, { projection: { lwbs: 1 } });
    res.status(200).json({ patientCount, lwbs: lwbsCount?.lwbs || 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics.' });
  }
}
