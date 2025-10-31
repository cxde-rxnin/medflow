import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('patients');

  try {
    if (req.method === 'GET') {
      // Get all patients
      const patients = await collection.find({}).toArray();
      res.status(200).json(patients);
    } else if (req.method === 'POST') {
      // Create new patient
      const patient = req.body;
      const result = await collection.insertOne(patient);
      res.status(201).json({ _id: result.insertedId, ...patient });
    } else if (req.method === 'PUT') {
      // Update patient
      const { _id, ...update } = req.body;
      await collection.updateOne({ _id: new ObjectId(_id) }, { $set: update });
      res.status(200).json({ _id, ...update });
    } else if (req.method === 'DELETE') {
      // Delete patient
      const { _id } = req.body;
      await collection.deleteOne({ _id: new ObjectId(_id) });
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process patient data.' });
  }
}
