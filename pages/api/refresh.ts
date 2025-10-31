import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simulate a refresh action (could trigger a background job, etc.)
  if (req.method === 'POST') {
    // Here you could trigger a real refresh or just return a timestamp
    res.status(200).json({ refreshedAt: new Date().toISOString() });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
