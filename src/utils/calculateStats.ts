import type { GameType, Stats } from '@/types';

export function calculateRecords(stats: Stats) {
  const gameTypeKeys: GameType[] = [
    'chess_rapid',
    'chess_blitz',
    'chess_bullet'
  ];

  let wins = 0;
  let losses = 0;
  let draws = 0;

  for (const key of gameTypeKeys) {
    wins += stats[key]?.record.win ?? 0;
    losses += stats[key]?.record.loss ?? 0;
    draws += stats[key]?.record.draw ?? 0;
  }

  return { wins, losses, draws };
}

function calculateRating(stats: Stats) {
  // Get ratings and game counts for each type
  const ratingsWithCounts = [
    {
      type: 'chess_rapid',
      rating: stats.chess_rapid?.last.rating ?? null,
      gamesPlayed:
        (stats.chess_rapid?.record.win ?? 0) +
        (stats.chess_rapid?.record.loss ?? 0) +
        (stats.chess_rapid?.record.draw ?? 0)
    },
    {
      type: 'chess_blitz',
      rating: stats.chess_blitz?.last.rating ?? null,
      gamesPlayed:
        (stats.chess_blitz?.record.win ?? 0) +
        (stats.chess_blitz?.record.loss ?? 0) +
        (stats.chess_blitz?.record.draw ?? 0)
    },
    {
      type: 'chess_bullet',
      rating: stats.chess_bullet?.last.rating ?? null,
      gamesPlayed:
        (stats.chess_bullet?.record.win ?? 0) +
        (stats.chess_bullet?.record.loss ?? 0) +
        (stats.chess_bullet?.record.draw ?? 0)
    }
  ];

  const validEntries = ratingsWithCounts.filter(entry => entry.rating !== null);

  const totalGamesPlayed = validEntries.reduce(
    (sum, entry) => sum + entry.gamesPlayed,
    0
  );

  if (totalGamesPlayed === 0 || validEntries.length === 0) return 0;

  const weightedSum = validEntries.reduce((sum, entry) => {
    // Weight is proportional to games played
    const weight = entry.gamesPlayed / totalGamesPlayed;
    return sum + entry.rating! * weight;
  }, 0);

  return Math.round(weightedSum);
}

export default function calculateStats(stats: Stats) {
  const records = calculateRecords(stats);
  const avgRating = calculateRating(stats);

  return { records, avgRating };
}
