// pages/api/clearToken.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    nookies.destroy({ res }, 'authToken', { path: '/' });
    res.status(200).json({ message: 'Token cleared successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
