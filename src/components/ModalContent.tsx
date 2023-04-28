import React from 'react';
import type { Stats, IWinStreak } from '@/types';
import WinStreak from '@/components/WinStreak';
import Ratings from '@/components/Ratings';
import Wins from '@/components/Wins';
import Draws from '@/components/Draws';
import Losses from '@/components/Losses';

interface ModalContentProps {
  title: string;
  data: IWinStreak | Stats;
}

export default function ModalContent({ title, data }: ModalContentProps) {
  switch (title) {
    case 'Win Streak':
      return <WinStreak data={data as IWinStreak} />;
    case 'Ratings':
      return <Ratings data={data as Stats} />;
    case 'Wins':
      return <Wins data={data as Stats} />;
    case 'Draws':
      return <Draws data={data as Stats} />;
    case 'Losses':
      return <Losses data={data as Stats} />;
    default:
      return null;
  }
}
