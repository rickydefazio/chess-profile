import type { Profile, Stats } from '@/types';
import cleanUsername from '@/utils/cleanUsername';
import { useEffect, useRef, useState } from 'react';

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

const requestInit = {
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY as string,
  },
};

export default function Search({
  setProfile,
  setStats,
  setIsLoading,
  setNotFound,
  setWinStreak,
}: SearchProps) {
  const [username, setUsername] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const storeDataInLocalStorage = (username: string, data: FetchResponse) => {
    localStorage.setItem(`playerData_${username}`, JSON.stringify(data));
  };

  const getDataFromLocalStorage = (username: string): FetchResponse | null => {
    const storedData = localStorage.getItem(`playerData_${username}`);
    return storedData ? JSON.parse(storedData) : null;
  };

  const handleStoredData = async (username: string) => {
    const storedData = getDataFromLocalStorage(username);

    if (storedData) {
      setProfile(storedData.profile);
      setStats(storedData.stats);

      const winStreakResponse = await fetch(
        `/api/win-streak?username=${username}`,
        requestInit
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
    storeDataInLocalStorage(username, data);

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

    const cleanedUsername = cleanUsername(username);

    try {
      const hasStoredData = await handleStoredData(cleanedUsername);

      if (!hasStoredData) {
        const [playerResult, winStreakResult] = await Promise.allSettled([
          fetch(`/api/player?username=${cleanedUsername}`, requestInit),
          fetch(`/api/win-streak?username=${cleanedUsername}`, requestInit),
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
      className='flex flex-col gap-2 text-white sm:flex-row'
    >
      <div className='form-control'>
        <div className='input-group'>
          <div className='tooltip tooltip-accent' data-tip='Chess.com Username'>
            <input
              type='text'
              placeholder='Search...'
              className='input-bordered input rounded-r-none focus:outline-none'
              onChange={handleTextChange}
              value={username}
              autoFocus
              ref={inputRef}
            />
          </div>
          <button className='btn-primary btn-square btn'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
