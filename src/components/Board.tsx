import React from 'react';

import Cell from './Cell'

type BoardProps = {
  boardState: boolean[][];
}

const Board: React.FC<BoardProps> = ({ boardState }) => {
  return (
    <>
      <table>
        <tbody>
          {boardState.map((row, rI) => {
            return (
              <tr>
                {row.map((life, cI) => {
                  return (<Cell index={100 * rI + cI} active={life} />)
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Board;