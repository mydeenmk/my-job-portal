// pages/api/setToken.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;
    nookies.set({ res }, 'authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    res.status(200).json({ message: 'Token set successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
