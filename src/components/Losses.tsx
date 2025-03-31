import isGameType from '@/utils/isGameType';
import type { Stats } from '@/types';
import formatGameTypes from '@/utils/formatGameTypes';

interface LossesProps {
  data: Stats;
}

export default function Losses({ data }: LossesProps) {
  function renderLosses(data: Stats) {
    if (
      !data.chess_blitz?.record.loss &&
      !data.chess_rapid?.record.loss &&
      !data.chess_bullet?.record.loss
    )
      return (
        <tr className='text-center'>
          <td colSpan={2}>Okay... Now I&apos;m impressed. 🤯</td>
        </tr>
      );

    return Object.entries(data)
      .filter(([key]) => isGameType(key) && data[key]?.record?.loss)
      .map(([key, value]) => (
        <tr className='text-center' key={key}>
          <td>{formatGameTypes(key)}</td>
          <td>
            <span className='text-primary'>{value.record.loss}</span>
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
          <tbody>{renderLosses(data)}</tbody>
        </table>
      </div>
    </>
  );
}
