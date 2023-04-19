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
