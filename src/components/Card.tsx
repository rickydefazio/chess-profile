import defaultImage from '../../public/defaultImage.jpg';
import type { Profile, StatsWithCalculated, IWinStreak } from '@/types';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { useRef } from 'react';
import ScreenshotButton from '../components/ScreenshotButton';

interface CardProps {
  profile: Profile;
  stats: StatsWithCalculated;
  winStreak: IWinStreak;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
}

export default function Card({
  profile,
  stats,
  winStreak,
  setModalContent
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { name, username, location, avatar, url, last_online, title } = profile;
  const {
    avgRating,
    records: { wins, draws, losses }
  } = stats.calculatedStats;

  const getLastOnlineDisplay = () => {
    if (!last_online) return 'Never';
    return DateTime.fromSeconds(last_online)
      .setZone('local')
      .toFormat("MMMM d, yyyy 'at' h:mm a");
  };

  const handleModalOpen = (
    title: string,
    data: StatsWithCalculated | IWinStreak
  ) => {
    setModalContent({ title, data });
  };

  return (
    <div ref={cardRef} className='card w-96 bg-base-100 shadow-xl relative'>
      <ScreenshotButton targetRef={cardRef} />

      <div className='flex justify-center pt-4'>
        <div className='flex flex-col items-center'>
          <h2 className='card-title'>
            {name ?? username}
            {title && (
              <span className='text-secondary text-sm'>{`(${title})`}</span>
            )}
          </h2>
          <p className='text-primary'>{location ?? 'Location Unknown'}</p>
          <p className='text-sm text-yellow-50 text-opacity-60 whitespace-nowrap pt-[4px]'>
            📆 {getLastOnlineDisplay()}
          </p>
        </div>
      </div>
      <figure className='px-10 pt-10'>
        <Image
          unoptimized
          src={avatar ?? defaultImage}
          key={avatar}
          width={250}
          height={500}
          alt={`Profile picture of ${name ?? username}`}
          className='h-48 w-48 rounded-full object-cover'
          priority
        />
      </figure>
      <div className='card-body items-center text-center'>
        <div className='flex w-full justify-around'>
          <label
            htmlFor='my-modal-4'
            className={`${avgRating > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
            onClick={() => avgRating > 0 && handleModalOpen('Ratings', stats)}
          >
            <div className='badge-secondary badge-outline badge font-bold'>
              Avg Rating: {Math.floor(avgRating ?? 0)}
            </div>
          </label>
          <label
            htmlFor='my-modal-4'
            className={`${winStreak.current > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
            onClick={() =>
              winStreak.current > 0 && handleModalOpen('Win Streak', winStreak)
            }
          >
            <div className='badge-info badge-outline badge font-bold'>
              Win Streak: {winStreak.current}{' '}
              {winStreak.current >= 3 && (
                <span className='pl-1 text-xs'>🔥</span>
              )}
            </div>
          </label>
        </div>
        <div className='stats shadow'>
          <div className='stat'>
            <label
              htmlFor='my-modal-4'
              className={`${wins > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
              onClick={() => wins > 0 && handleModalOpen('Wins', stats)}
            >
              <div className='stat-title text-green-500'>Wins</div>
              <div className='stat-value text-2xl'>{wins ?? 0}</div>
            </label>
          </div>
          <div className='stat'>
            <label
              htmlFor='my-modal-4'
              className={`${draws > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
              onClick={() => draws > 0 && handleModalOpen('Draws', stats)}
            >
              <div className='stat-title'>Draws</div>
              <div className='stat-value text-2xl'>{draws ?? 0}</div>
            </label>
          </div>
          <div className='stat'>
            <label
              htmlFor='my-modal-4'
              className={`${losses > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
              onClick={() => losses > 0 && handleModalOpen('Losses', stats)}
            >
              <div className='stat-title text-red-500'>Losses</div>
              <div className='stat-value text-2xl'>{losses ?? 0}</div>
            </label>
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
