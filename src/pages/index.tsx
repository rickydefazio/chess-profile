import Search from '@/components/Search';
import { useState } from 'react';
import type { Profile, Stats } from '@/types';
import Card from '@/components/Card';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const [stats, setStats] = useState<Stats>();

  return (
    <main className='glass flex min-h-screen flex-col items-center justify-around p-24'>
      <Search
        setIsLoading={setIsLoading}
        setProfile={setProfile}
        setStats={setStats}
        setNotFound={setNotFound}
      />

      {isLoading ? (
        <progress className='progress w-56 bg-primary'></progress>
      ) : (
        profile && stats && <Card profile={profile} stats={stats} />
      )}

      {!isLoading && notFound && (
        <div className='alert justify-center bg-primary shadow-lg md:w-1/2'>
          No user found. Please try again. 🤞🏻
        </div>
      )}
    </main>
  );
}
