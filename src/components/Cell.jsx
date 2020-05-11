import React, { useContext, useEffect, Fragment } from 'react';

import actionsName from '../actions/actionsName';
import { dispatchContext, stateContext } from '../Game';

import './Cell.scss';

export function Cell(props) {
  const dispatch = useContext(dispatchContext);
  const { gameOver, level, isStarted, winner } = useContext(stateContext);
  let { hasMine, isOpen, countMinesAround, positionX, positionY, hasFlag } = props.cellInfo;


  useEffect(() => {
    if (isOpen && hasMine) dispatch({ type: actionsName.GAME_OVER });
  }, [isOpen, dispatch, hasMine])

  function handleCellClick() {
    if (hasFlag || gameOver || winner) return;
    if (!isStarted) {
      dispatch({
        type: actionsName.CREATE_STARTED_GAME_BOARD,
        payload: { level, positionX, positionY }
      });
    }
    dispatch({
      type: actionsName.OPEN_CELL,
      payload: { positionX, positionY }
    });
  }

  function handleCellRightClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (gameOver || isOpen) return;
    dispatch({
      type: actionsName.RIGHT_CLICK_CELL,
      payload: { positionX, positionY }
    });
    return false;
  }

  return (
    <Fragment>
      <div
        className={
          `cell ${isOpen ? 'open' : ''}
           ${hasFlag ? 'noHover' : ''}`
        }
        onClick={handleCellClick}
        onContextMenu={(e) => handleCellRightClick(e)}
      >
        <div
          className={`
          cell_content _${countMinesAround} 
          ${(hasMine && isOpen) || (hasMine && gameOver) ? 'mine' : ''} 
          ${hasFlag ? 'hasFlag' : ''}`
          }
        >
          {(countMinesAround && !hasMine && isOpen) ? countMinesAround : ''}
        </div>
      </div>
    </Fragment>

  );
}