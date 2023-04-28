import authMiddleware from '@/middlewares/authMiddleware';
import calculateStats from '@/utils/calculateStats';
import cleanUsername from '@/utils/cleanUsername';
import fetchWithRetry from '@/utils/fetchWithRetry';
import getWinStreak from '@/utils/getWinStreak';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let username = req.query?.username;

  if (!username || username.length === 0 || typeof username !== 'string') {
    res.status(400).json({ error: 'Invalid or missing username parameter.' });
    return;
  }

  const cleanedUsername = cleanUsername(username);

  try {
    const [playerResult, statsResult, winStreakResult] =
      await Promise.allSettled([
        fetchWithRetry(`https://api.chess.com/pub/player/${cleanedUsername}`),
        fetchWithRetry(
          `https://api.chess.com/pub/player/${cleanedUsername}/stats`
        ),
        getWinStreak(cleanedUsername),
      ]);

    const playerError =
      playerResult.status === 'rejected' || !playerResult.value.ok;
    const statsError =
      statsResult.status === 'rejected' || !statsResult.value.ok;
    const winStreakError = winStreakResult.status === 'rejected';

    if (playerError || statsError || winStreakError) {
      res.status(400).json({ message: 'Error fetching data from the API' });
      return;
    }

    const profile = await playerResult.value.json();
    const stats = await statsResult.value.json();
    const calculatedStats = calculateStats(stats);

    res.status(200).json({
      profile,
      stats: { ...stats, calculatedStats },
      winStreak: winStreakResult.value,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default authMiddleware(handler);
