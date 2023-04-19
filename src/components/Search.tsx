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
  setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search({
  setProfile,
  setStats,
  setIsLoading,
  setNotFound,
}: SearchProps) {
  const [username, setUsername] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const storeDataInSessionStorage = (username: string, data: FetchResponse) => {
    sessionStorage.setItem(`playerData_${username}`, JSON.stringify(data));
  };

  const getDataFromSessionStorage = (
    username: string
  ): FetchResponse | null => {
    const storedData = sessionStorage.getItem(`playerData_${username}`);
    return storedData ? JSON.parse(storedData) : null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setNotFound(false);

    try {
      const storedData = getDataFromSessionStorage(username);

      if (storedData) {
        setProfile(storedData.profile);
        setStats(storedData.stats);
      } else {
        const response = await fetch(`/api/player?username=${username}`);

        if (!response.ok) {
          console.error('Error fetching data from the API');

          setProfile(undefined);
          setStats(undefined);
          setNotFound(true);
          return;
        }

        const data: FetchResponse = await response.json();

        setProfile(data.profile);
        setStats(data.stats);
        storeDataInSessionStorage(username, data);
      }
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
        className='input input-bordered input-primary w-full max-w-xs text-default'
        value={username}
        autoFocus
        onChange={handleTextChange}
      />
    </form>
  );
}
