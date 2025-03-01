import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import type { Profile, StatsWithCalculated, IWinStreak } from '@/types';
import cleanUsername from '@/utils/cleanUsername';
import within5Minutes from '@/utils/within5Minutes';

interface FetchResponse {
  winStreak: IWinStreak;
  timestamp: number;
  profile: Profile;
  stats: StatsWithCalculated;
}

interface SearchProps {
  setProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>;
  setStats: React.Dispatch<
    React.SetStateAction<StatsWithCalculated | undefined>
  >;
  setWinStreak: React.Dispatch<React.SetStateAction<IWinStreak>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}

const requestInit = {
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
  }
};

export default function Search({
  setProfile,
  setStats,
  setIsLoading,
  setNotFound,
  setWinStreak
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

  const storeDataInSessionStorage = (
    username: string,
    data: FetchResponse,
    timestamp: number
  ) => {
    const dataWithTimestamp = { ...data, timestamp };
    sessionStorage.setItem(
      `profileData_${username}`,
      JSON.stringify(dataWithTimestamp)
    );
  };

  const getDataFromSessionStorage = (
    username: string
  ): FetchResponse | null => {
    const storedData = sessionStorage.getItem(`profileData_${username}`);
    return storedData ? JSON.parse(storedData) : null;
  };

  const handleStoredData = async (username: string) => {
    const storedData = getDataFromSessionStorage(username);

    if (storedData && within5Minutes(storedData.timestamp)) {
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
      setWinStreak({
        current: 0,
        since: null
      });
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    const data: FetchResponse = await profileResponse.json();
    setProfile(data.profile);
    setStats(data.stats);
    setWinStreak(data.winStreak);

    const timestamp = DateTime.now().toSeconds();
    storeDataInSessionStorage(username, data, timestamp);
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
          <div
            className='hover:tooltip hover:tooltip-accent'
            data-tip='Chess.com Username'
          >
            <input
              type='text'
              id='searchInput'
              placeholder='Search...'
              className='input-bordered input rounded-r-none focus:outline-none'
              onChange={handleTextChange}
              value={username}
              autoFocus
              ref={inputRef}
              aria-label='Search'
            />
          </div>
          <button
            id='searchButton'
            aria-label='Search'
            className='btn-primary btn-square btn'
          >
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
