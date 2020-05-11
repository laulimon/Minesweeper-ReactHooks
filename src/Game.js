import React, { useReducer } from 'react';

import '@fortawesome/fontawesome-free/js/all.js';
import './Game.scss';

import { Board } from './components/Board';

import { boardReducer } from './reducers/boardReducer';
import actionsName from './actions/actionsName';

import { CurrentLevel, InitialState } from './constants/gameConstants';

export const stateContext = React.createContext();
export const dispatchContext = React.createContext();


function Game() {
  const [state, dispatch] = useReducer(boardReducer, InitialState);

  function handleReset() {
    dispatch({
      type: actionsName.CREATE_BLANK_BOARD,
      payload: {
        level: state.level
      }
    });
  }

  function handleLevel(e) {
    dispatch({
      type: actionsName.CHANGE_LEVEL,
      payload: {
        level: CurrentLevel[e.target.value]
      }
    });
  }
  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        <h1 className="title1" >LETS START!!</h1>
        <div style={{ display: "flex" }}>
          <div className="instructions card shadow-lg">
            <h3>INSTRUCTIONS          </h3>
            <li>SELECT A DIFFICULTY LEVEL
              <p> <span className="type" >Easy 9x9</span> - A nine-by-nine board with 10 mines. </p>
              <p> <span className="type" >Medium 16x16</span>  - A sixteen-by-sixteen board with 40 mines. </p>
              <p> <span className="type" >Expert 30x16 </span>- A thirty-by-sixteen board with 99 mines. </p>
            </li>
            <li>CLICK ANY SQUARE ON THE BOARD.
              <p> Doing so will start the Minesweeper game.</p>
            </li>
            <li>REVIEW THE NUMBERS.
              <p> Any number on the board refers to the amount of mines currently touching it.</p>
            </li>
            <li>RIGHT-CLICK ANY SQUARE THAT YOU THINK CONTAINS A MINE.
              <p>This will put a flag on the square. Make sure that you don't flag more squares than the number of mines on the board</p>
            </li>
            <li>CLEAR THE BOARD
              <p>To win a round of Minesweeper, you must click every square on the board that doesn't have a mine under it. </p>
            </li>
          </div>

          <div className="game_container" >
            {state.winner ?
              <i className="winner">YOU ROCK!!!</i> : ''}
            <div className="game">
              <div className="game_header">
                <div className="game_hiddenMines"><i className="fas fa-bomb"></i> Mines: {state.hiddenMines} </div>
                <button
                  className="restart"
                  onClick={handleReset}>Restart</button>

              </div>
              <div className="game_header" style={{ justifyContent: "center" }} >Level:
              <select
                  className="levelSelector"
                  value={state.level.name}
                  onChange={(e) => handleLevel(e)}>
                  <option value={CurrentLevel.EASY.name}>Easy</option>
                  <option value={CurrentLevel.INTERMEDIATE.name}>Intermediate</option>
                  <option value={CurrentLevel.EXPERT.name}>Expert</option>
                </select>
              </div>

              <Board />

            </div>
          </div>
        </div>
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default Game;
