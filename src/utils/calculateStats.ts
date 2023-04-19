interface Stats {
  chess_rapid?: GameType;
  chess_blitz?: GameType;
  chess_bullet?: GameType;
}

interface GameType {
  last: {
    rating: number;
  };
  record: Record;
}

interface Record {
  win: number;
  loss: number;
  draw: number;
}

type GameTypes = keyof Stats;

export function calculateRecords(stats: Stats) {
  const gameTypeKeys: GameTypes[] = [
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
  weight: number;
}

function calculateRating(stats: Stats) {
  const ratings: Rating[] = [
    {
      type: 'chess_rapid',
      rating: stats.chess_rapid?.last.rating ?? null,
      weight: 3,
    },
    {
      type: 'chess_blitz',
      rating: stats.chess_blitz?.last.rating ?? null,
      weight: 2,
    },
    {
      type: 'chess_bullet',
      rating: stats.chess_bullet?.last.rating ?? null,
      weight: 1,
    },
  ];

  const { sumWeightedRatings, totalWeight } = ratings.reduce(
    (acc, cur) => {
      if (cur.rating) {
        acc.sumWeightedRatings += cur.rating * cur.weight;
        acc.totalWeight += cur.weight;
      }
      return acc;
    },
    { sumWeightedRatings: 0, totalWeight: 0 }
  );

  const weightedAvgRating =
    totalWeight > 0 ? Math.round(sumWeightedRatings / totalWeight) : 0;
  return weightedAvgRating;
}

export default function calculateStats(stats: Stats) {
  const records = calculateRecords(stats);
  const rating = calculateRating(stats);

  return { records, rating };
}
