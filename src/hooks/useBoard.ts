import { useEffect, useState } from "react"

const useBoard = (height: number, width: number): [boolean[][], () => void, (newBoard: boolean[][]) => void, () => boolean[][]] => {
  const createInitBoard = (): boolean[][] => {
    const newBoardState: boolean[][] = []
    for (var h = 0; h < height; h++) {
      const newRow = []
      for (var w = 0; w < width; w++) {
        newRow.push(Math.random() * 10 < 7)
      }
      newBoardState.push(newRow)
    }
    return newBoardState
  }

  const [boardState, setBoardState] = useState<boolean[][]>(createInitBoard());

  useEffect(() => {
    setBoardState(createInitBoard())
  }, [width, height])

  const resetBoard = () => {
    const newBoardState: boolean[][] = createInitBoard();
    setBoardState(newBoardState)
  }

  const updateBoard = (newBoardState: boolean[][]) => {
    setBoardState(newBoardState)
  }

  return [boardState, resetBoard, updateBoard, createInitBoard]
}

export default useBoard