import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('patient_flow');
    const flowData = await collection.findOne({});
    res.status(200).json(flowData || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient flow data.' });
  }
}
