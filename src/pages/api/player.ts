import calculateStats from '@/utils/calculateStats';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  try {
    const [profileRes, statsRes] = await Promise.all([
      fetch(`https://api.chess.com/pub/player/${username}`),
      fetch(`https://api.chess.com/pub/player/${username}/stats`),
    ]);

    if (!profileRes.ok || !statsRes.ok) {
      res.status(400).json({ message: 'Error fetching data from the API' });
      return;
    }

    const profile = await profileRes.json();
    const stats = calculateStats(await statsRes.json());

    res.status(200).json({ profile, stats });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
