export const CurrentLevel = Object.freeze({
  EASY: {
    name: 'EASY',
    rows: 9,
    columns: 9,
    totalMines: 10,
  },

  INTERMEDIATE: {
    name: 'INTERMEDIATE',
    rows: 16,
    columns: 16,
    totalMines: 40,
  },

  EXPERT: {
    name: 'EXPERT',
    rows: 16,
    columns: 30,
    totalMines: 99,
  }
})

export const InitialState = {
  board: [],
  level: CurrentLevel.INTERMEDIATE,
  gameOver: false,
  hiddenMines: CurrentLevel.INTERMEDIATE.totalMines,
  winner: false,
  isStarted: false,
};

