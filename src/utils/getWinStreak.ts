import { DateTime } from 'luxon';
import type { Game } from '@/types';
import fetchWithRetry from './fetchWithRetry';

async function getRecentGamesUntilLoss(username: string): Promise<Game[]> {
  const today = DateTime.now();
  let monthsToCheck = 0;
  const recentGames: Game[] = [];
  let mostRecentLossFound = false;
  const MAX_MONTHS_TO_CHECK = 6;

  while (!mostRecentLossFound) {
    const dateRangeStart = today.minus({ months: monthsToCheck });
    const year = dateRangeStart.year;
    const month = dateRangeStart.month.toString().padStart(2, '0');

    const url = `https://api.chess.com/pub/player/${username}/games/${year}/${month}`;
    const response = await fetchWithRetry(url);

    if (response.ok) {
      const games = await response.json();
      for (const game of games.games.reverse()) {
        const playerColor =
          game.white.username.toLowerCase() === username ? 'white' : 'black';
        if (game[playerColor].result === 'win') {
          recentGames.push(game);
        } else {
          mostRecentLossFound = true;
          break;
        }
      }
    } else if (response.status !== 404) {
      throw new Error(
        `Error fetching data for user ${username}: ${response.status}`
      );
    }

    if (monthsToCheck >= MAX_MONTHS_TO_CHECK) {
      break;
    }

    monthsToCheck++;
  }

  return recentGames;
}

export default async function getWinStreak(username: string): Promise<number> {
  const games = await getRecentGamesUntilLoss(username);
  return games.length;
}
