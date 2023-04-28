import Search from '@/components/Search';
import { useState } from 'react';
import type { Profile, StatsWithCalculated, IWinStreak } from '@/types';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Modal from '@/components/Modal';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [winStreak, setWinStreak] = useState<IWinStreak>({
    current: 0,
    since: null,
  });
  const [profile, setProfile] = useState<Profile>();
  const [stats, setStats] = useState<StatsWithCalculated>();
  const [modalContent, setModalContent] = useState<{
    title: string;
    data: any;
  }>({ title: '', data: null });

  return (
    <main className='glass flex min-h-screen flex-col items-center justify-center'>
      <Modal content={modalContent} />

      <div className='hero-content text-center'>
        <Header />
      </div>

      <Search
        setIsLoading={setIsLoading}
        setProfile={setProfile}
        setStats={setStats}
        setNotFound={setNotFound}
        setWinStreak={setWinStreak}
      />

      {isLoading ? (
        <>
          <progress className='progress w-56 bg-primary'></progress>
          <span className='animate-pulse text-info'>Loading...</span>
        </>
      ) : (
        profile &&
        stats && (
          <Card
            profile={profile}
            stats={stats}
            winStreak={winStreak}
            setModalContent={setModalContent}
          />
        )
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
