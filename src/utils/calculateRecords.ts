interface Stats {
  chess_daily: {
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };

  chess_rapid: {
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };

  chess_blitz: {
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };

  chess_bullet: {
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };
}

export default function calculateRecords(stats: Stats) {
  const wins =
    stats.chess_daily.record.win +
    stats.chess_rapid.record.win +
    stats.chess_blitz.record.win +
    stats.chess_bullet.record.win;

  const losses =
    stats.chess_daily.record.loss +
    stats.chess_rapid.record.loss +
    stats.chess_blitz.record.loss +
    stats.chess_bullet.record.loss;

  const draws =
    stats.chess_daily.record.draw +
    stats.chess_rapid.record.draw +
    stats.chess_blitz.record.draw +
    stats.chess_bullet.record.draw;

  return { wins, losses, draws };
}
