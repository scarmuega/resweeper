

function getSafePosition(board, x, y) {
  return board.isInside(x, y) ? { x, y } : undefined;
}

function* yieldPositions(board, centerX, centerY) {
  yield getSafePosition(board, centerX, centerY - 1);
  yield getSafePosition(board, centerX + 1, centerY - 1);
  yield getSafePosition(board, centerX + 1, centerY);
  yield getSafePosition(board, centerX + 1, centerY + 1);
  yield getSafePosition(board, centerX, centerY + 1);
  yield getSafePosition(board, centerX - 1, centerY + 1);
  yield getSafePosition(board, centerX - 1, centerY);
  yield getSafePosition(board, centerX - 1, centerY - 1);
}

export default function(board, x, y) {
  return Array.from(yieldPositions(board, x, y)).filter(p => p !== undefined);
}
