import Image from 'next/image';
import calculateRecords from '@/utils/calculateRecords';
import { GetStaticPropsContext } from 'next/types';

interface Profile {
  avatar: string;
  name: string;
  url: string;
}

interface Stats {
  wins: number;
  losses: number;
  draws: number;
}

interface HomeProps {
  profile: Profile;
  stats: Stats;
}

export default function Home({ profile, stats }: HomeProps) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <figure className='px-10 pt-10'>
          <Image
            src={profile.avatar}
            width={250}
            height={500}
            alt={`Profile picture of ${profile.name}`}
            className='w-48 h-48 object-cover rounded-full'
            priority
          />
        </figure>
        <div className='card-body items-center text-center'>
          <h2 className='card-title text-white'>{profile.name}</h2>
          <div className='stats shadow'>
            <div className='stat'>
              <div className='stat-title text-green-500'>Wins</div>
              <div className='stat-value text-2xl'>{stats.wins}</div>
            </div>

            <div className='stat'>
              <div className='stat-title text-red-500'>Losses</div>
              <div className='stat-value text-2xl'>{stats.losses}</div>
            </div>

            <div className='stat'>
              <div className='stat-title'>Draws</div>
              <div className='stat-value text-2xl'>{stats.draws}</div>
            </div>
          </div>
          <div className='card-actions'>
            <a href={profile.url} className='btn btn-primary'>
              View Profile
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const [response1, response2] = await Promise.all([
    fetch('https://api.chess.com/pub/player/rickydefazio'),
    fetch('https://api.chess.com/pub/player/rickydefazio/stats'),
  ]);

  const profile = await response1.json();
  const stats = await response2.json();

  return {
    props: { profile, stats: calculateRecords(stats) },
    revalidate: 10,
  };
}
