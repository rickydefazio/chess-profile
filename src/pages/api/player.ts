import authMiddleware from '@/middlewares/authMiddleware';
import calculateStats from '@/utils/calculateStats';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let username = req.query?.username;

  if (!username || username.length === 0 || typeof username !== 'string') {
    res.status(400).json({ error: 'Invalid or missing username parameter.' });
    return;
  }

  try {
    const [profileResponse, statsResponse] = await Promise.allSettled([
      fetch(`https://api.chess.com/pub/player/${username}`),
      fetch(`https://api.chess.com/pub/player/${username}/stats`),
    ]);

    const profileError =
      profileResponse.status === 'rejected' || !profileResponse.value.ok;

    const statsError =
      statsResponse.status === 'rejected' || !statsResponse.value.ok;

    if (profileError || statsError) {
      res.status(400).json({ message: 'Error fetching data from the API' });
      return;
    }

    const profile = await profileResponse.value.json();
    const stats = calculateStats(await statsResponse.value.json());

    res.status(200).json({ profile, stats });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default authMiddleware(handler);
