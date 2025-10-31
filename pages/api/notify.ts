import type { NextApiRequest, NextApiResponse } from 'next';
import { sendNotificationEmail } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendNotificationEmail(to, subject, text);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email notification.' });
  }
}
