import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('staff');
    const staffData = await collection.find({}).toArray();
    res.status(200).json(staffData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch staff data.' });
  }
}
