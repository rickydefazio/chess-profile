import defaultImage from '../../public/defaultImage.jpg';
import type { Profile, Stats } from '@/types';
import Image from 'next/image';

interface CardProps {
  profile: Profile;
  stats: Stats;
  winStreak: number;
}

export default function Card({ profile, stats, winStreak }: CardProps) {
  const { name, username, location, avatar, url } = profile;
  const { rating, records } = stats;
  const { wins, draws, losses } = records;

  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <div className='flex justify-center pt-4'>
        <div className='flex flex-col items-center'>
          <h2 className='card-title'>{name ?? username}</h2>
          <p className='text-primary'>{location ?? 'Location Unknown'}</p>
        </div>
      </div>
      <figure className='px-10 pt-10'>
        <Image
          src={avatar ?? defaultImage}
          width={250}
          height={500}
          alt={`Profile picture of ${name ?? username}`}
          className='h-48 w-48 rounded-full object-cover'
          priority
        />
      </figure>
      <div className='card-body items-center text-center'>
        <div className='flex w-full justify-around'>
          <div className='badge-secondary badge-outline badge font-bold'>
            Rating: {Math.floor(rating ?? 0)}
          </div>
          <div className='badge-info badge-outline badge font-bold'>
            Win Streak: {winStreak}
          </div>
        </div>
        <div className='stats shadow'>
          <div className='stat'>
            <div className='stat-title text-green-500'>Wins</div>
            <div className='stat-value text-2xl'>{wins ?? 0}</div>
          </div>
          <div className='stat'>
            <div className='stat-title'>Draws</div>
            <div className='stat-value text-2xl'>{draws ?? 0}</div>
          </div>
          <div className='stat'>
            <div className='stat-title text-red-500'>Losses</div>
            <div className='stat-value text-2xl'>{losses ?? 0}</div>
          </div>
        </div>
        <div className='card-actions'>
          <a
            href={url}
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
