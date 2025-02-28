import defaultImage from '../../public/defaultImage.jpg';
import type { Profile, StatsWithCalculated, IWinStreak } from '@/types';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { toPng } from 'html-to-image';
import { useRef } from 'react';

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
  const { name, username, location, avatar, url, last_online } = profile;
  const {
    rating,
    records: { wins, draws, losses }
  } = stats.calculatedStats;

  const handleScreenshot = async () => {
    if (cardRef.current) {
      try {
        // Wait for any state updates to complete
        await new Promise(resolve => requestAnimationFrame(resolve));

        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          quality: 1.0,
          pixelRatio: 2,
          skipAutoScale: true,
          style: {
            transform: 'scale(1)'
          },
          filter: () => true
        });

        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        // TODO: Alert the user that a screenshot was copied to their clipboard
      } catch (error) {
        console.error('Error taking screenshot:', error);
      }
    }
  };

  const getLastOnlineDisplay = () => {
    if (!last_online) return 'Never';
    return DateTime.fromSeconds(last_online)
      .setZone('local')
      .toFormat("MMMM d, yyyy 'at' h:mm a");
  };

  return (
    <div ref={cardRef} className='card w-96 bg-base-100 shadow-xl relative'>
      <button
        onClick={handleScreenshot}
        className='absolute right-2 top-2 px-2.5
 hover:bg-base-200 rounded-full transition-colors'
        title='Copy card as image'
      >
        📸
      </button>
      <div className='flex justify-center pt-4'>
        <div className='flex flex-col items-center'>
          <h2 className='card-title'>{name ?? username}</h2>
          <p className='text-primary'>{location ?? 'Location Unknown'}</p>
          <p className='text-sm text-yellow-50 text-opacity-60 whitespace-nowrap'>
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
            className='cursor-pointer'
            onClick={() => setModalContent({ title: 'Ratings', data: stats })}
          >
            <div className='badge-secondary badge-outline badge font-bold'>
              Avg Rating: {Math.floor(rating ?? 0)}
            </div>
          </label>
          <label
            htmlFor='my-modal-4'
            className='cursor-pointer'
            onClick={() =>
              setModalContent({ title: 'Win Streak', data: winStreak })
            }
          >
            <div className='badge-info badge-outline badge font-bold'>
              Win Streak: {winStreak.current}
            </div>
          </label>
        </div>
        <div className='stats shadow'>
          <div className='stat'>
            <label
              htmlFor='my-modal-4'
              className='cursor-pointer'
              onClick={() =>
                setModalContent({
                  title: 'Wins',
                  data: stats
                })
              }
            >
              <div className='stat-title text-green-500'>Wins</div>
              <div className='stat-value text-2xl'>{wins ?? 0}</div>
            </label>
          </div>
          <div className='stat'>
            <label
              htmlFor='my-modal-4'
              className='cursor-pointer'
              onClick={() =>
                setModalContent({
                  title: 'Draws',
                  data: stats
                })
              }
            >
              <div className='stat-title'>Draws</div>
              <div className='stat-value text-2xl'>{draws ?? 0}</div>
            </label>
          </div>
          <div className='stat'>
            <label
              htmlFor='my-modal-4'
              className='cursor-pointer'
              onClick={() =>
                setModalContent({
                  title: 'Losses',
                  data: stats
                })
              }
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
