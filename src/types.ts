export interface Profile {
  name: string;
  url: string;
  username: string;
  avatar?: string;
  location?: string;
  last_online?: number;
  title?: string;
}

export interface Stats {
  chess_rapid?: GameMode;
  chess_blitz?: GameMode;
  chess_bullet?: GameMode;
}

export interface StatsWithCalculated extends Stats {
  calculatedStats: CalculatedStats;
}

export interface CalculatedStats {
  records: {
    wins: number;
    losses: number;
    draws: number;
  };

  avgRating: number;
}

export interface GameMode {
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

export interface Game {
  white: Player;
  black: Player;
  [key: string]: any;
}

interface Player {
  username: string;
  result: string;
}

export type GameType = keyof Stats;

export interface IWinStreak {
  current: number;
  since: number | null;
}

export interface PlayerDocument {
  username: string;
  timestamp: number;
  data: {
    profile: Profile;
    stats: StatsWithCalculated;
    winStreak: IWinStreak;
    timestamp: number;
  };
}
