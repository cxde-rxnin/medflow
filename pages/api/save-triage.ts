import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Triage from '@/lib/triage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { context, answer } = req.body;
  if (!context || !answer) {
    return res.status(400).json({ error: 'Missing triage context or answer' });
  }

  try {
    // Connect to database
    await dbConnect();
    
    // Create triage record
    const triage = await Triage.create({ 
      context, 
      answer,
      createdAt: new Date()
    });
    
    console.log('Triage saved successfully:', triage._id);
    
    return res.status(200).json({ 
      success: true,
      triage: {
        id: triage._id,
        context: triage.context,
        answer: triage.answer,
        createdAt: triage.createdAt
      }
    });
  } catch (error: any) {
    console.error('Save triage error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}