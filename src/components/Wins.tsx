import { GameType, Stats } from '@/types';
import formatGameTypes from '@/utils/formatGameTypes';
import isGameType from '@/utils/isGameType';

interface WinsProps {
  data: Stats;
}

export default function Wins({ data }: WinsProps) {
  function renderWins(data: Stats) {
    return Object.entries(data)
      .filter(([key]) => isGameType(key) && data[key]?.record?.win)
      .map(([key, value]) => (
        <p key={key}>
          <strong>{formatGameTypes(key as GameType)}: </strong>{' '}
          <span className='text-primary'>{value.record.win}</span>
        </p>
      ));
  }
  return <>{renderWins(data)}</>;
}
