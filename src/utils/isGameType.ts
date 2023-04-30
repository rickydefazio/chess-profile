import type { GameType } from '@/types';

export default function isGameType(key: string): key is GameType {
  return (
    key === 'chess_blitz' || key === 'chess_bullet' || key === 'chess_rapid'
  );
}
