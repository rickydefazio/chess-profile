import type { Profile, Stats } from '@/types';
import cleanUsername from '@/utils/cleanUsername';
import { useEffect, useRef, useState } from 'react';

interface FetchResponse {
  winStreak: number;
  timestamp: number;
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
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trimStart().trimEnd());
  };

  const storeDataInLocalStorage = (
    username: string,
    data: FetchResponse,
    timestamp: number
  ) => {
    const dataWithTimestamp = { ...data, timestamp };
    localStorage.setItem(
      `profileData_${username}`,
      JSON.stringify(dataWithTimestamp)
    );
  };

  const getDataFromLocalStorage = (username: string): FetchResponse | null => {
    const storedData = localStorage.getItem(`profileData_${username}`);
    return storedData ? JSON.parse(storedData) : null;
  };

  const handleStoredData = async (username: string) => {
    const storedData = getDataFromLocalStorage(username);
    const fiveMinutesAgo = Date.now() - 1000 * 60 * 5;

    if (storedData && storedData.timestamp > fiveMinutesAgo) {
      setProfile(storedData.profile);
      setStats(storedData.stats);
      setWinStreak(storedData.winStreak);

      return true;
    }

    return false;
  };

  const handleApiResponse = async (profileResponse: Response) => {
    const profileError = !profileResponse.ok;

    if (profileError) {
      console.error('Error fetching data from the API');

      setProfile(undefined);
      setStats(undefined);
      setWinStreak(0);
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    const data: FetchResponse = await profileResponse.json();
    setProfile(data.profile);
    setStats(data.stats);
    setWinStreak(data.winStreak);

    const timestamp = Date.now();
    storeDataInLocalStorage(username, data, timestamp);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setNotFound(false);

    const cleanedUsername = cleanUsername(username);

    try {
      const hasStoredData = await handleStoredData(cleanedUsername);

      if (!hasStoredData) {
        const profileResponse = await fetch(
          `/api/profile?username=${cleanedUsername}`,
          requestInit
        );

        await handleApiResponse(profileResponse);
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
      className='mb-4 flex flex-col gap-2 text-white sm:flex-row'
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
