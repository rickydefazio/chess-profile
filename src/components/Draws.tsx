import type { GameType, Stats } from '@/types';
import formatGameTypes from '@/utils/formatGameTypes';
import isGameType from '@/utils/isGameType';

interface DrawsProps {
  data: Stats;
}
export default function Draws({ data }: DrawsProps) {
  function renderDraws(data: Stats) {
    return Object.entries(data)
      .filter(([key]) => isGameType(key) && data[key]?.record?.draw)
      .map(([key, value]) => (
        <p key={key}>
          <strong>{formatGameTypes(key as GameType)}: </strong>{' '}
          <span className='text-primary'>{value.record.draw}</span>
        </p>
      ));
  }
  return <>{renderDraws(data)}</>;
}
