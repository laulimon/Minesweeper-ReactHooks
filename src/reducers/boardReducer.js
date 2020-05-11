import actionsName from "../actions/actionsName"
import { getNeighborsStatus, getNeighborsPosition } from '../utility/utility';

export function boardReducer(state, { type, payload }) {
  switch (type) {
    case actionsName.CREATE_BLANK_BOARD:
      return {
        ...state,
        gameOver: false,
        winner: false,
        isStarted: false,
        hiddenMines: state.level.totalMines,
        board: setBlankBoard(state.level),
      };

    case actionsName.CREATE_STARTED_GAME_BOARD:
      return {
        ...state,
        hiddenMines: payload.level.totalMines,
        board: seedMinesAndNumbers(state.board, payload.level, payload.positionX, payload.positionY),
        isStarted: true,
      };

    case actionsName.OPEN_CELL:
      return {
        ...state,
        board: openCell(state.board, payload.positionX, payload.positionY),
        winner: didWin(openCell(state.board, payload.positionX, payload.positionY)),
      };

    case actionsName.RIGHT_CLICK_CELL:
      return {
        ...state,
        hiddenMines: recalculateHiddenMines(state.board, payload.positionX, payload.positionY, state.hiddenMines),
        board: toggleFlagCell(state.board, payload.positionX, payload.positionY),
        winner: didWin(toggleFlagCell(state.board, payload.positionX, payload.positionY)),
      };

    case actionsName.CHANGE_LEVEL:
      return {
        ...state,
        gameOver: false,
        winner: false,
        isStarted: false,
        level: payload.level,
        hiddenMines: payload.level.totalMines,
        board: setBlankBoard(payload.level),
      };

    case actionsName.GAME_OVER:
      return {
        ...state,
        gameOver: true,
      };

    default:
      throw new Error('No matching action type in reducer');
  }
}



















function setBlankBoard({ rows, columns }) {
  return Array.from(
    Array(rows), () =>
    new Array(columns).fill({
      hasMine: false,
      isOpen: false,
      countMinesAround: 0,
      hasFlag: false,
    })
  );
}

function seedMinesAndNumbers(board, level, positionX, positionY) {
  let boardWithSeedMines = seedMine(board, level.totalMines, positionX, positionY);
  return seedNumber(boardWithSeedMines);
}

function seedMine(blankBoard, numMineToSeed, positionX, positionY) {
  let totalSeedMines = 0;
  let tempBoard = JSON.parse(JSON.stringify(blankBoard));

  let rowIndex = 0;

  const neighborsPosition = getNeighborsPosition(positionX, positionY).map(index => JSON.stringify(index));

  while (totalSeedMines < numMineToSeed) {
    for (let i = 0; i < blankBoard[rowIndex].length; i++) {

      if (totalSeedMines === numMineToSeed) break;
      if (rowIndex === positionX && i === positionY) continue;
      if (neighborsPosition.includes(JSON.stringify([rowIndex, i]))) continue;

      const luckyNumber = Math.floor(Math.random() * Math.floor(10));
      if (luckyNumber === 1 && tempBoard[rowIndex][i].hasMine === false) {
        tempBoard[rowIndex][i].hasMine = true;
        totalSeedMines++;
      }
    };
    if (rowIndex === blankBoard.length - 1) rowIndex = 0;
    else rowIndex++;
  }
  return tempBoard;
}

function seedNumber(prevBoard) {
  for (let i = 0; i < prevBoard.length; i++) {
    for (let j = 0; j < prevBoard[i].length; j++) {
      const neighborsStatus = getNeighborsStatus(prevBoard, i, j);
      let minesAround = 0;
      neighborsStatus.forEach((neighbor) => {
        if (neighbor.cell.hasMine) minesAround++;
      })

      prevBoard[i][j].countMinesAround = minesAround;
    }
  }
  return prevBoard;
};

function openCell(originalBoard, positionX, positionY) {
  const newBoard = JSON.parse(JSON.stringify(originalBoard));
  newBoard[positionX][positionY].isOpen = true;
  if (newBoard[positionX][positionY].countMinesAround === 0 && !newBoard[positionX][positionY].hasMine) {
    return openNeighbors(newBoard, positionX, positionY);
  }
  return newBoard;
}

function openNeighbors(originalBoard, row, column) {

  const memo = {};
  const stack = [{ cell: originalBoard[row][column], row, column }];

  while (stack.length > 0) {
    const centerCell = stack.pop();
    const neighborsStatus = getNeighborsStatus(originalBoard, centerCell.row, centerCell.column);

    const neighborsWithFlags = neighborsStatus.reduce((acc, currCell) => {
      if (currCell.cell.hasFlag) return acc + 1;
      return acc;
    }, 0);

    if (neighborsWithFlags < centerCell.cell.countMinesAround) return originalBoard;

    for (let cell of neighborsStatus) {
      if (memo[`${cell.row}-${cell.column}`]) continue;
      else {
        memo[`${cell.row}-${cell.column}`] = true;
      }

      cell.cell.isOpen = cell.cell.hasFlag ? false : true;

      if (cell.cell && !cell.cell.countMinesAround && !cell.cell.hasMine) {
        stack.push(cell);
      }
    }
  }

  return originalBoard;
};

function didWin(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!board[i][j].hasMine && !board[i][j].isOpen) {
        return false;
      }

      if (!board[i][j].hasMine && board[i][j].hasFlag) {
        return false;
      }
    }
  }
  return true;
}

function recalculateHiddenMines(board, row, column, hiddenMines) {
  return board[row][column].hasFlag ? hiddenMines + 1 : hiddenMines - 1
}
function toggleFlagCell(originalBoard, row, column) {
  const newBoard = JSON.parse(JSON.stringify(originalBoard));
  newBoard[row][column].hasFlag = !newBoard[row][column].hasFlag;
  return newBoard
}

















