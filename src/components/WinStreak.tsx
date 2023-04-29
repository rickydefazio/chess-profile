import type { IWinStreak } from '@/types';
import { DateTime } from 'luxon';

interface WinStreakProps {
  data: IWinStreak;
}

export default function WinStreak({ data }: WinStreakProps) {
  const { current, since } = data;
  let dateTime;
  let formattedDate;
  let formattedTime;
  if (since) {
    dateTime = DateTime.fromSeconds(since).setZone('local');
    formattedDate = dateTime.toFormat('MMMM d, yyyy');
    formattedTime = dateTime.toFormat('h:mm a');
  }

  return (
    <>
      <p className='text-center'>
        <strong>Games:</strong> <span className='text-primary'>{current}</span>
      </p>
      {since && (
        <p className='text-center'>
          <strong>Since:</strong>{' '}
          <span className='text-primary'>{`${formattedDate} at ${formattedTime}`}</span>
        </p>
      )}
    </>
  );
}
