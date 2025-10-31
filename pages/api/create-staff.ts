import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import { hash } from 'bcryptjs';

const StaffSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'clinician' },
  department: { type: String },
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, password, role, department } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existing = await Staff.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const hashedPassword = await hash(password, 10);
    const staff = new Staff({ email, name, password: hashedPassword, role, department });
    await staff.save();
    res.status(201).json({ _id: staff._id, email, name, role, department });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
}
