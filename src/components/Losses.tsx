import isGameType from '@/utils/isGameType';
import type { GameType, Stats } from '@/types';
import formatGameTypes from '@/utils/formatGameTypes';

interface LossesProps {
  data: Stats;
}

export default function Losses({ data }: LossesProps) {
  function renderLosses(data: Stats) {
    return Object.entries(data)
      .filter(([key]) => isGameType(key) && data[key]?.record?.loss)
      .map(([key, value]) => (
        <p key={key}>
          <strong>{formatGameTypes(key as GameType)}: </strong>{' '}
          <span className='text-primary'>{value.record.loss}</span>
        </p>
      ));
  }

  return <>{renderLosses(data)}</>;
}
