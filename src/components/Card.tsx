import type { Profile, Stats } from '@/types';
import Image from 'next/image';

interface CardProps {
  profile: Profile;
  stats: Stats;
  winStreak: number;
}

export default function Card({ profile, stats, winStreak }: CardProps) {
  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <div className='flex justify-center pt-4'>
        <div className='flex flex-col items-center'>
          <h2 className='card-title'>{profile.name ?? profile.username}</h2>
          <p className='text-primary'>
            {profile.location ?? 'Location Unknown'}
          </p>
        </div>
      </div>

      <figure className='px-10 pt-10'>
        <Image
          src={profile.avatar ?? '/../public/noImage.jpg'}
          width={250}
          height={500}
          alt={`Profile picture of ${profile.name ?? profile.username}`}
          className='h-48 w-48 rounded-full object-cover'
          priority
        />
      </figure>

      <div className='card-body items-center text-center'>
        <div className='flex w-full justify-around'>
          <div className='badge-secondary badge-outline badge font-bold'>
            Rating: {Math.floor(stats.rating ?? 0)}
          </div>
          <div className='badge-info badge-outline badge font-bold'>
            Win Streak: {winStreak}
          </div>
        </div>
        <div className='stats shadow'>
          <div className='stat'>
            <div className='stat-title text-green-500'>Wins</div>
            <div className='stat-value text-2xl'>{stats.records.wins ?? 0}</div>
          </div>

          <div className='stat'>
            <div className='stat-title'>Draws</div>
            <div className='stat-value text-2xl'>
              {stats.records.draws ?? 0}
            </div>
          </div>

          <div className='stat'>
            <div className='stat-title text-red-500'>Losses</div>
            <div className='stat-value text-2xl'>
              {stats.records.losses ?? 0}
            </div>
          </div>
        </div>

        <div className='card-actions'>
          <a
            href={profile.url}
            target='_blank'
            rel='noopener noreferrer'
            className='btn-primary btn'
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
