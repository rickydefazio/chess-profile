import getWinStreak from '@/utils/getWinStreak';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let username = req.query?.username;

  if (!username || username.length === 0 || typeof username !== 'string') {
    res.status(400).json({ error: 'Invalid or missing username parameter.' });
    return;
  }

  try {
    const winStreak = await getWinStreak(username);
    res.status(200).json({ winStreak });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    res
      .status(500)
      .json({ error: `Error fetching win streak: ${errorMessage}` });
  }
}
