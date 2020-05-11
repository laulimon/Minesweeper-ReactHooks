import React, { useEffect, useContext, Fragment } from 'react';
import './Board.scss';

import { Cell } from './Cell';

import { stateContext, dispatchContext } from '../Game';
import actionsName from '../actions/actionsName';


import { CurrentLevel } from '../constants/gameConstants';

export function Board() {
  const state = useContext(stateContext);
  const dispatch = useContext(dispatchContext);

  useEffect(() => {
    dispatch({
      type: actionsName.CREATE_BLANK_BOARD,
      payload: { level: CurrentLevel.INTERMEDIATE }
    });
  }, [dispatch])
  console.log("soy STATE", state)
  return (
    <Fragment>
      <div
        className="board"
        style={
          {
            gridTemplateRows: `repeat(${state.level.rows}, 35px)`,
            gridTemplateColumns: `repeat(${state.level.columns}, 35px)`,
          }
        }>
        <>
          {
            state.gameOver ?
              <div className="gameOver">
                GAME OVER
            </div> : null
          }
        </>
        <>
          {
            state.board.map((row, i) =>
              row.map((cell, j) => < Cell
                cellInfo={
                  {
                    ...cell,
                    positionX: i,
                    positionY: j
                  }
                }
                key={[i, j]} />)
            )
          }
        </>
      </div>
    </Fragment>
  );
}