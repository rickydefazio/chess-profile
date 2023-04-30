export default function formatGameTypes(types: string) {
  switch (types) {
    case 'chess_blitz':
      return 'Blitz';
    case 'chess_bullet':
      return 'Bullet';
    case 'chess_rapid':
      return 'Rapid';
    default:
      break;
  }
}
