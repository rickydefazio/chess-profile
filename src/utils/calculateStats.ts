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

function calculateRating(stats: Stats) {
  const gameTypeKeys: GameTypes[] = [
    'chess_rapid',
    'chess_blitz',
    'chess_bullet',
  ];

  let avgCurrentRating = 0;

  for (const key of gameTypeKeys) {
    avgCurrentRating += stats[key]?.last.rating ?? 0;
  }

  avgCurrentRating /= gameTypeKeys.length;

  return avgCurrentRating;
}

export default function calculateStats(stats: Stats) {
  const records = calculateRecords(stats);
  const rating = calculateRating(stats);

  return { records, rating };
}
