import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb'
import Triage from '@/lib/triage'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { context } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  if (!context) {
    return res.status(400).json({ error: 'Missing triage context' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert medical triage assistant. Based on the provided patient information, give a clear triage recommendation: assess risk, urgency, and suggest next steps (e.g., immediate intervention, supplemental oxygen, further evaluation). Always include a suggested triage level (e.g., 1–5 or High/Medium/Low) and a confidence score (e.g., Confidence: 92%) in your response. Do not ask for more information if all key details are present. Be concise and clinical.'
          },
          { role: 'user', content: context },
        ],
        max_tokens: 512,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'OpenAI API error' });
    }

    const answer = data.choices?.[0]?.message?.content || '';

    // Persist triage state to database
    await dbConnect;
    await Triage.create({ context, answer });

    return res.status(200).json({ answer });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
