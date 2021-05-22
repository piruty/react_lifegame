import React, { useEffect, useState } from 'react';

import Cell from './Cell'
import useBoard from '../hooks/useBoard'

type BoardProps = {
  height: number;
  width: number;
}

const Board: React.FC<BoardProps> = ({ height, width }) => {

  const [boardState, resetBoard, updateBoard, createInitBoard] = useBoard(height, width)
  // const createInitBoard = () => {
  //   const newBoardState: boolean[][] = []
  //   for (var h = 0; h < height; h++) {
  //     const newRow = []
  //     for (var w = 0; w < width; w++) {
  //       newRow.push(Math.random() * 10 < 7)
  //     }
  //     newBoardState.push(newRow)
  //   }
  //   return newBoardState
  // }

  // const [boardState, setBoardState] = useState<boolean[][]>(createInitBoard());

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
              // console.log(count, h, w, hI, wI)
            }
          }
        })
      }
    })

    // console.log(count, h, w)

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

  // useEffect(() => {
  //   setBoardState(createInitBoard())
  // }, [width, height])

  // const resetBoard = () => {
  //   const newBoardState: boolean[][] = createInitBoard();
  //   setBoardState(newBoardState)
  // }

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
      <button onClick={nextBoard}>Update</button>
      <button onClick={resetBoard}>Reset</button>
    </>
  )

}

export default Board;