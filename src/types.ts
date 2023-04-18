export interface Profile {
  avatar: string;
  name: string;
  url: string;
  username: string;
}

export interface Stats {
  records: {
    wins: number;
    losses: number;
    draws: number;
  };

  rating: number;
}
