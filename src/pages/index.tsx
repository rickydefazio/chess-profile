import Search from '@/components/Search';
import { useState } from 'react';
import type { Profile, Stats } from '@/types';
import Card from '@/components/Card';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [winStreak, setWinStreak] = useState(0);
  const [profile, setProfile] = useState<Profile>();
  const [stats, setStats] = useState<Stats>();

  return (
    <main className='glass flex min-h-screen flex-col items-center justify-around p-24'>
      <Search
        setIsLoading={setIsLoading}
        setProfile={setProfile}
        setStats={setStats}
        setNotFound={setNotFound}
        setWinStreak={setWinStreak}
      />

      {isLoading ? (
        <progress className='progress w-56 bg-primary'></progress>
      ) : (
        profile &&
        stats && <Card profile={profile} stats={stats} winStreak={winStreak} />
      )}

      {!isLoading && notFound && (
        <div className='alert justify-center bg-primary shadow-lg md:w-1/2'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 flex-shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>No user found. Please try again. 🤞🏻</span>
          </div>
        </div>
      )}
    </main>
  );
}
