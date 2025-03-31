import type { Stats } from '@/types';
import formatGameTypes from '@/utils/formatGameTypes';
import isGameType from '@/utils/isGameType';

interface WinsProps {
  data: Stats;
}

export default function Wins({ data }: WinsProps) {
  function renderWins(data: Stats) {
    if (
      !data.chess_blitz?.record.win &&
      !data.chess_rapid?.record.win &&
      !data.chess_bullet?.record.win
    )
      return (
        <tr className='text-center'>
          <td colSpan={2}>Keep trying! You got this! 💪🏻</td>
        </tr>
      );

    return Object.entries(data)
      .filter(([key]) => isGameType(key) && data[key]?.record?.win)
      .map(([key, value]) => (
        <tr className='text-center' key={key}>
          <td>{formatGameTypes(key)}</td>
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
