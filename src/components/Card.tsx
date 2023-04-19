import type { Profile, Stats } from '@/types';
import Image from 'next/image';

interface CardProps {
  profile: Profile;
  stats: Stats;
}

export default function Card({ profile, stats }: CardProps) {
  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <div className='flex justify-center pt-4'>
        <div>
          <h2 className='card-title'>{profile.name ?? profile.username}</h2>
          <p className='text-primary text-center'>{profile.location}</p>
        </div>
      </div>

      {profile.avatar && (
        <figure className='px-10 pt-10'>
          <Image
            src={profile.avatar}
            width={250}
            height={500}
            alt={`Profile picture of ${profile.name ?? profile.username}`}
            className='w-48 h-48 object-cover rounded-full'
            priority
          />
        </figure>
      )}
      <div className='card-body items-center text-center'>
        <div className='badge badge-secondary badge-outline px-5'>
          Average Rating: {Math.floor(stats.rating ?? 0)}
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
            className='btn btn-primary'
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
