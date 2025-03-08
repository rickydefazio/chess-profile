import type { Stats } from '@/types';
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
        <tr key={key} className='text-center'>
          <td>{formatGameTypes(key)}</td>
          <td>
            <span className='text-primary'>{value.record.draw}</span>
          </td>
        </tr>
      ));
  }
  return (
    <div className='overflow-x-auto'>
      <table className='table-zebra table w-full'>
        <thead>
          <tr className='text-center text-secondary'>
            <th className='text-base'>Type</th>
            <th className='text-base'>Games</th>
          </tr>
        </thead>
        <tbody>{renderDraws(data)}</tbody>
      </table>
    </div>
  );
}
