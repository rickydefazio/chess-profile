export interface Profile {
  name: string;
  url: string;
  username: string;
  avatar?: string;
  location?: string;
}

export interface Stats {
  records: {
    wins: number;
    losses: number;
    draws: number;
  };

  rating: number;
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
