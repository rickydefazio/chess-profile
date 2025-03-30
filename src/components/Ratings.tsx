import React from 'react';
import type { Stats } from '@/types';
import formatGameTypes from '@/utils/formatGameTypes';
import isGameType from '@/utils/isGameType';

interface RatingsProps {
  data: Stats;
}

export default function Ratings({ data }: RatingsProps) {
  function renderRatings(data: Stats) {
    return Object.entries(data)
      .filter(([key]) => isGameType(key) && data[key]?.last?.rating)
      .map(([key, value]) => (
        <tr className='text-center' key={key}>
          <td>{formatGameTypes(key)}</td>
          <td>
            <span className='text-primary'>{value.last.rating}</span>
          </td>
        </tr>
      ));
  }

  return (
    <>
      <p className='pb-2 text-center text-accent'>
        The <strong>avg rating</strong> is generated using a weighted average of
        the following:
      </p>
      <div className='overflow-x-auto'>
        <table className='table-zebra table w-full'>
          <thead>
            <tr className='text-center text-secondary'>
              <th className='text-base'>Type</th>
              <th className='text-base'>Rating</th>
            </tr>
          </thead>
          <tbody>{renderRatings(data)}</tbody>
        </table>
      </div>
    </>
  );
}
