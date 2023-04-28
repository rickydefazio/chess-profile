// RatingsComponent.tsx
import React from 'react';
import type { Stats, GameType } from '@/types';
import formatGameTypes from '@/utils/formatGameTypes';
import isGameType from '@/utils/isGameType';

interface RatingsComponentProps {
  data: Stats;
}

export default function RatingsComponent({ data }: RatingsComponentProps) {
  function renderRatings(data: Stats) {
    return Object.entries(data)
      .filter(([key]) => isGameType(key) && data[key]?.last?.rating)
      .map(([key, value]) => (
        <p key={key}>
          <strong>{formatGameTypes(key as GameType)}: </strong>{' '}
          <span className='text-primary'>{value.last.rating}</span>
        </p>
      ));
  }

  return (
    <>
      <p className='text-accent'>
        The <strong>average rating</strong> is generated using a weighted
        average calculation of the following:
      </p>
      <div className='pt-2'>{renderRatings(data)}</div>
    </>
  );
}
