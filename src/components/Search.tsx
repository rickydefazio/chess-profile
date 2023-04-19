import type { Profile, Stats } from '@/types';
import { useState } from 'react';

interface FetchResponse {
  profile: Profile;
  stats: Stats;
}

interface SearchProps {
  setProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>;
  setStats: React.Dispatch<React.SetStateAction<Stats | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchForm({
  setProfile,
  setStats,
  setIsLoading,
}: SearchProps) {
  const [username, setUsername] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(`/api/player?username=${username}`);

      if (!response.ok) {
        console.error('Error fetching data from the API');

        setProfile(undefined);
        setStats(undefined);
        return;
      }

      const { profile, stats }: FetchResponse = await response.json();

      setProfile(profile);
      setStats(stats);
    } catch (e) {
      console.error(e);
    } finally {
      setUsername('');
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex-no-wrap flex flex-col sm:flex-row'
    >
      <input
        type='text'
        placeholder='Chess.com Username'
        className='input input-bordered input-primary w-full max-w-xs text-white'
        value={username}
        autoFocus
        onChange={handleTextChange}
      />
    </form>
  );
}
