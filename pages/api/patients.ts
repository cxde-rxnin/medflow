import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Patient from '@/lib/patient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    if (req.method === 'GET') {
      // Get all patients
      const patients = await Patient.find({ triaged: false });
      res.status(200).json(patients);
    } else if (req.method === 'POST') {
      // Create new patient
      const patient = { ...req.body, triaged: false };
      const newPatient = new Patient(patient);
      await newPatient.save();
      res.status(201).json(newPatient);
    } else if (req.method === 'PUT') {
      // Update patient
      const { _id, ...update } = req.body;
      if (update.triaged !== undefined) {
        await Patient.findByIdAndUpdate(_id, { ...update, triaged: update.triaged });
      } else {
        await Patient.findByIdAndUpdate(_id, update);
      }
      res.status(200).json({ _id, ...update });
    } else if (req.method === 'DELETE') {
      // Delete patient
      const { _id } = req.body;
      await Patient.findByIdAndDelete(_id);
      res.status(204).end();
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process patient data.' });
  }
}
