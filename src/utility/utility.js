export function getNeighborsPosition(positionX, positionY) {
  return [
    [positionX - 1, positionY - 1],
    [positionX - 1, positionY],
    [positionX - 1, positionY + 1],
    [positionX, positionY - 1],
    [positionX, positionY + 1],
    [positionX + 1, positionY - 1],
    [positionX + 1, positionY],
    [positionX + 1, positionY + 1],
  ];
}

export function getNeighborsStatus(originalBoard, positionX, positionY) {
  const neighbors = [];

  const neighborsPosition = getNeighborsPosition(positionX, positionY);

  for (let [newPositionX, newPositionY] of neighborsPosition) {

    if (isCell(originalBoard, newPositionX, newPositionY)) {
      neighbors.push({
        cell: originalBoard[newPositionX][newPositionY],
        row: newPositionX,
        column: newPositionY,
      });
    }
  }

  return neighbors;
}










export function isCell(board, row, column) {
  if (row >= 0 && row < board.length && column >= 0 && column < board[0].length) {
    return true;
  }
  return false;
}






export function doSomethingToAdjacentCells(board, row, column, func) {
  const newBoard = JSON.parse(JSON.stringify(board));
  const surroundingCellIndex = getNeighborsPosition(row, column);

  for (let [newRow, newColumn] of surroundingCellIndex) {
    if (isCell(newBoard, newRow, newColumn)) func(newBoard[newRow][newColumn]);
  }

  return newBoard;
};

