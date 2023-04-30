import type { GameType, Stats } from '@/types';

export function calculateRecords(stats: Stats) {
  const gameTypeKeys: GameType[] = [
    'chess_rapid',
    'chess_blitz',
    'chess_bullet',
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

interface Rating {
  type: string;
  rating: number | null;
}

function calculateRating(stats: Stats) {
  const ratings: Rating[] = [
    {
      type: 'chess_rapid',
      rating: stats.chess_rapid?.last.rating ?? null,
    },
    {
      type: 'chess_blitz',
      rating: stats.chess_blitz?.last.rating ?? null,
    },
    {
      type: 'chess_bullet',
      rating: stats.chess_bullet?.last.rating ?? null,
    },
  ];

  const { sumRatings, totalCount } = ratings.reduce(
    (acc, cur) => {
      if (cur.rating) {
        acc.sumRatings += cur.rating;
        acc.totalCount += 1;
      }
      return acc;
    },
    { sumRatings: 0, totalCount: 0 }
  );

  const avgRating = totalCount > 0 ? Math.round(sumRatings / totalCount) : 0;
  return avgRating;
}

export default function calculateStats(stats: Stats) {
  const records = calculateRecords(stats);
  const rating = calculateRating(stats);

  return { records, rating };
}
