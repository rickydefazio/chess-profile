import type { Profile, Stats } from '@/types';
import { useState } from 'react';

interface FetchResponse {
  profile: Profile;
  stats: Stats;
}

interface SearchProps {
  setProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>;
  setStats: React.Dispatch<React.SetStateAction<Stats | undefined>>;
  setWinStreak: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search({
  setProfile,
  setStats,
  setIsLoading,
  setNotFound,
  setWinStreak,
}: SearchProps) {
  const [username, setUsername] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.toLowerCase());
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

  const handleStoredData = async (username: string) => {
    const storedData = getDataFromSessionStorage(username);

    if (storedData) {
      setProfile(storedData.profile);
      setStats(storedData.stats);

      const winStreakResponse = await fetch(
        `/api/win-streak?username=${username}`
      );
      const winStreakData = await winStreakResponse.json();
      setWinStreak(winStreakData.winStreak);

      return true;
    }

    return false;
  };

  const handleApiResponse = async (
    playerResult: PromiseSettledResult<Response>,
    winStreakResult: PromiseSettledResult<Response>
  ) => {
    const playerError =
      playerResult.status === 'rejected' || !playerResult.value.ok;

    if (playerError) {
      console.error('Error fetching data from the API');

      setProfile(undefined);
      setStats(undefined);
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    const data: FetchResponse = await playerResult.value.json();
    setProfile(data.profile);
    setStats(data.stats);
    storeDataInSessionStorage(username, data);

    const winStreakError =
      winStreakResult.status === 'rejected' || !winStreakResult.value.ok;

    if (winStreakError) {
      console.error('Error fetching data from the API');
      setWinStreak(0);
    } else {
      const winStreakData = await winStreakResult.value.json();
      setWinStreak(winStreakData.winStreak);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setNotFound(false);

    try {
      const hasStoredData = await handleStoredData(username);

      if (!hasStoredData) {
        const [playerResult, winStreakResult] = await Promise.allSettled([
          fetch(`/api/player?username=${username}`),
          fetch(`/api/win-streak?username=${username}`),
        ]);

        await handleApiResponse(playerResult, winStreakResult);
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
        className='text-default input-bordered input-primary input w-full max-w-xs'
        value={username}
        autoFocus
        onChange={handleTextChange}
      />
    </form>
  );
}
