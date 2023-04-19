import Search from '@/components/Search';
import { useState } from 'react';
import type { Profile, Stats } from '@/types';
import Card from '@/components/Card';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const [stats, setStats] = useState<Stats>();

  return (
    <main className='flex min-h-screen flex-col items-center justify-around p-24 glass'>
      <Search
        setIsLoading={setIsLoading}
        setProfile={setProfile}
        setStats={setStats}
      />

      {isLoading ? (
        <progress className='progress w-56 bg-primary'></progress>
      ) : (
        profile && stats && <Card profile={profile} stats={stats} />
      )}
    </main>
  );
}
