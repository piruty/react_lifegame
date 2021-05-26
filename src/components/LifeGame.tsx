import React, { useEffect, useState } from 'react';

import Board from './Board'
import useBoard from '../hooks/useBoard'

type LifeGameProps = {
  height: number;
  width: number;
}

const LifeGame: React.FC<LifeGameProps> = ({ height, width }) => {

  const [boardState, resetBoard, updateBoard, createInitBoard] = useBoard(height, width)

  // セルの生き死にを計算する
  const check = (h: number, w: number) => {
    var count = 0;
    [-1, 0, 1].forEach((hI) => {
      if (h + hI >= 0 && h + hI < height) {
        [-1, 0, 1].forEach((wI) => {
          if (w + wI >= 0 && w + wI < width) {
            if (!(wI === 0 && hI === 0)) {
              if (boardState[h + hI][w + wI]) {
                count += 1
              }
            }
          }
        })
      }
    })

    if (count === 3 && !boardState[h][w]) {
      // 誕生
      return true
    }
    if ((count <= 1 || count >= 4) && boardState[h][w]) {
      // 過疎 or 過密
      return false
    }
    // 生存
    return boardState[h][w]
  }

  const nextBoard = () => {
    const newBoardState: boolean[][] = createInitBoard();
    for (var h = 0; h < height; h++) {
      for (var w = 0; w < width; w++) {
        newBoardState[h][w] = check(h, w)
      }
    }
    updateBoard(newBoardState)
  }

  return (
    <>
      <Board boardState={boardState} />
      <button onClick={nextBoard}>Update</button>
      <button onClick={resetBoard}>Reset</button>
    </>
  )
}

export default LifeGame;