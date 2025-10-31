import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const existing = await db.collection('staff').findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const hashedPassword = await hash(password, 10);
    const result = await db.collection('staff').insertOne({ email, name, password: hashedPassword });
    res.status(201).json({ _id: result.insertedId, email, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
}
