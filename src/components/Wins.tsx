import type { GameType, Stats } from '@/types';
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
        <tr className='text-center' key={key}>
          <td>{formatGameTypes(key as GameType)}</td>
          <td>
            <span className='text-primary'>{value.record.win}</span>
          </td>
        </tr>
      ));
  }
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table-zebra table w-full'>
          <thead>
            <tr className='text-center text-secondary'>
              <th className='text-base'>Type</th>
              <th className='text-base'>Games</th>
            </tr>
          </thead>
          <tbody>{renderWins(data)}</tbody>
        </table>
      </div>
    </>
  );
}
