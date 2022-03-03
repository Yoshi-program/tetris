import type { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const COLORS = ['black', 'lightblue', 'blue', 'orange', 'yellow', 'lightgreen', 'purple', 'red']

const Container = styled.div`
  height: 100vh;
  background-color: #b5e1ef;
`
const Main = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 700px;
  margin: 0;
  margin-right: -50%;
  background-color: #70c648;
  border: solid 5px;
  border-color: #fff #777 #777 #fff;
  transform: translate(-50%, -50%);
`
const AroundBlockArea = styled.div`
  position: absolute;
  top: 50%;
  left: 35%;
  width: 309px;
  height: 609px;
  margin: 0;
  margin-right: -50%;
  background-color: #cdcdcd;
  border: solid 5px;
  border-color: #fff #777 #777 #fff;
  transform: translate(-50%, -50%);
`
const BlockArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 600px;
  margin: 0;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`
const MinBlock = styled.div<{ num: number }>`
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: baseline;
  background-color: ${(props) => COLORS[props.num]};
  border: solid 0.15vh #000;
`
const AroundNextMinoArea = styled.div`
  position: relative;
  top: 13%;
  left: 70%;
  width: 129px;
  height: 129px;
  border: solid 5px;
  border-color: #fff #777 #777 #fff;
`
const NextMinoArea = styled.div`
  width: 120px;
  height: 120px;
`
const NextMino = styled.div<{ num: number }>`
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: baseline;
  background-color: ${(props) => COLORS[props.num]};
  border: solid 0.15vh #000;
`
const Score = styled.div`
  position: absolute;
  top: 40%;
  left: 67%;
  font-size: 50px;
`
const Home: NextPage = () => {
  const BLOCKS = [
    [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      [
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1],
      ],
    ],
    [
      [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
      ],
      [
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0],
      ],
      [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2],
      ],
      [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
      ],
    ],
    [
      [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
      ],
      [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ],
      [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0],
      ],
      [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0],
      ],
    ],
    [
      [
        [0, 4, 4],
        [0, 4, 4],
        [0, 0, 0],
      ],
      [
        [0, 4, 4],
        [0, 4, 4],
        [0, 0, 0],
      ],
      [
        [0, 4, 4],
        [0, 4, 4],
        [0, 0, 0],
      ],
      [
        [0, 4, 4],
        [0, 4, 4],
        [0, 0, 0],
      ],
    ],
    [
      [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
      ],
      [
        [0, 5, 0],
        [0, 5, 5],
        [0, 0, 5],
      ],
      [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0],
      ],
      [
        [5, 0, 0],
        [5, 5, 0],
        [0, 5, 0],
      ],
    ],
    [
      [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
      ],
      [
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0],
      ],
      [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
      ],
      [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0],
      ],
    ],
    [
      [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ],
      [
        [0, 0, 7],
        [0, 7, 7],
        [0, 7, 0],
      ],
      [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],
      ],
      [
        [0, 7, 0],
        [7, 7, 0],
        [7, 0, 0],
      ],
    ],
  ]
  const [start, gameStart] = useState(false)
  const [over, gameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [reset, resetState] = useState(false)
  const [checkOne, checkOneSecondMove] = useState(false)
  const [nextTetromino, createTetromino] = useState(BLOCKS[Math.floor(Math.random() * 7)])
  const [tetromino, setTetromino] = useState(BLOCKS[Math.floor(Math.random() * 7)])
  const before = [
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    //ここから表示する
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    //ここから表示しない
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  ]
  const beforeNextMinoBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  const [nextMinoBoard, setNextMinoBoard] = useState(beforeNextMinoBoard)
  const [board, setBoard] = useState(before)
  const [x, X] = useState(4)
  const [y, Y] = useState(1)
  const [rotateNumber, setRotateNumber] = useState(0)
  // 一つ一つのブロックの情報
  const [block, setBlock] = useState({
    y: y, // キーボード操作や１秒ごとに下がる
    x: x, // キーボード操作で左右に動く
    blockIndex: tetromino,
    //colorIndex: 3,
  })

  const changeBoard = (NumofLength: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    for (let cy = 0; cy < NumofLength; cy++) {
      for (let cx = 0; cx < tetromino[rotateNumber][cy].length; cx++) {
        if (tetromino[rotateNumber][cy][cx] !== 0) {
          newBoard[cy + y][cx + x] = tetromino[rotateNumber][cy][cx]
        }
      }
    }
    return newBoard
  }

  const completeBoard = useMemo(
    () =>
      changeBoard(tetromino[rotateNumber].length)
        .slice(3, 23)
        .map((e) => e.filter((num) => num !== 9)),
    [x, y, rotateNumber]
  )
  const changeNextMinoBoard = () => {
    const newBoard: number[][] = beforeNextMinoBoard
    for (let cy = 0; cy < nextTetromino[0].length; cy++) {
      for (let cx = 0; cx < nextTetromino[0][cy].length; cx++) {
        if (nextTetromino[0][cy][cx] !== 0) {
          newBoard[cy + 1][cx] = nextTetromino[0][cy][cx]
        }
      }
    }
    setNextMinoBoard(newBoard)
  }
  const resetfunc = () => {
    const nowBoard = changeBoard(tetromino[rotateNumber].length)
    const newBoard: number[][] = []
    let count = 0
    for (const b of nowBoard.reverse()) {
      if (!b.every((value) => value !== 0) || b.every((value) => value === 9)) {
        newBoard.unshift(b)
      } else {
        count++
        setScore((c) => c + 1)
      }
    }
    for (let c = 0; c < count; c++) {
      newBoard.unshift([9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9])
    }
    setBoard(newBoard)
    if (!newBoard[2].every((value) => value === 0 || value === 9)) {
      gameOver(true)
    }
    setTetromino(nextTetromino)
    createTetromino(BLOCKS[Math.floor(Math.random() * 7)])
    changeNextMinoBoard()
    setRotateNumber(0)
    X(4)
    Y(1)
    resetState(false)
  }

  // 下に進めるかを判定する関数
  const checkUnder = (cx: number, cy: number, tetromino: number[][]) => {
    if (cy + tetromino.length > 24) {
      return true
    }
    for (let y = 0; y < tetromino.length; y++) {
      for (let x = 0; x < tetromino[y].length; x++) {
        if (tetromino[y][x] !== 0 && tetromino[y][x] > 0 && board[y + cy][x + cx] > 0) {
          return true
        }
      }
    }
    return false
  }

  //左右に進めるかを判定する関数
  const checkSide = (cx: number, cy: number, tetromino: number[][], left: boolean) => {
    if (left && cx < 0) {
      //return true
    }
    if (!left && cx + tetromino[0].length > 12) {
      //return true
    }
    //横ブロックがある時に動けなくしたい
    for (let y = 0; y < tetromino.length; y++) {
      for (let x = 0; x < tetromino[y].length; x++) {
        if (tetromino[y][x] !== 0 && tetromino[y][x] > 0 && board[y + cy][x + cx] > 0) {
          return true
        }
      }
    }
    return false
  }

  useEffect(() => {
    changeNextMinoBoard()
    if (over) {
      return
    }
    const check = checkUnder(x, y + 1, tetromino[rotateNumber])
    if (!check) {
      Y((c) => c + 1)
    }
    if (reset) {
      resetfunc()
      return
    }
    if (check) {
      resetState(true)
      return
    }
    const interval2 = setInterval(() => {
      checkOneSecondMove(!checkOne)
    }, 600)

    return () => clearInterval(interval2)
  }, [reset, checkOne])

  //矢印キーで落ちるときの判定処理関数
  const moveLeft = () => {
    if (!checkSide(x - 1, y, tetromino[rotateNumber], true)) {
      X((c) => c - 1)
    }
  }
  const moveRight = () => {
    if (!checkSide(x + 1, y, tetromino[rotateNumber], false)) {
      X((c) => c + 1)
    }
  }
  const drop = () => {
    if (!checkUnder(x, y + 1, tetromino[rotateNumber])) {
      Y((c) => c + 1)
    }
  }
  //未完成
  const changeRotate = () => {
    if (rotateNumber < 3) {
      if (checkUnder(x, y, tetromino[rotateNumber + 1])) {
        return
      }
      /*if (checkUnder(x, y, tetromino[rotateNumber + 1]) && x < 2 && !(y > 20)) {
        X((c) => c + 1)
      } else if (checkUnder(x, y, tetromino[rotateNumber + 1])) {
        if (tetromino[rotateNumber][0].some((value) => value === 1)) {
          X((c) => c - 2)
        } else {
          X((c) => c - 1)
        }
      }
      if (
        checkUnder(x, y, tetromino[rotateNumber + 1]) &&
        y > 20 &&
        !tetromino[rotateNumber][1].some((value) => value === 1)
      ) {
        Y((c) => c - 1)
      }*/
      setRotateNumber((c) => c + 1)
    } else {
      if (checkUnder(x, y, tetromino[0])) {
        return
      }
      /*if (checkUnder(x, y, tetromino[0])) {
        if (tetromino[rotateNumber][0].some((value) => value === 1)) {
          X((c) => c - 2)
        } else {
          X((c) => c - 1)
        }
      }*/
      setRotateNumber(0)
    }
  }
  //未完成(なぜか止まるし、貫通する)
  const setUp = () => {
    let down = y
    if (!checkUnder(x, y + 1, tetromino[rotateNumber])) {
      //let down = y
      while (!checkUnder(x, down + 1, tetromino[rotateNumber])) {
        down++
      }
      Y(down)
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft':
          moveLeft()
          break
        case 'ArrowRight':
          moveRight()
          break
        case 'ArrowDown':
          drop()
          break
        case 'ArrowUp':
          changeRotate()
          break
        case 'Space':
          setUp()
          break
      }
    },
    [x, y, tetromino, rotateNumber]
  )

  useEffect(() => {
    if (reset || over) {
      return
    }
    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [x, y, reset, rotateNumber, tetromino])

  return (
    <Container>
      <Main>
        <AroundBlockArea>
          <BlockArea>
            {completeBoard.map((row, y) =>
              row.map((num, x) => <MinBlock key={`${x}-${y}`} num={num}></MinBlock>)
            )}
          </BlockArea>
        </AroundBlockArea>
        <AroundNextMinoArea>
          <NextMinoArea>
            {nextMinoBoard.map((row, y) =>
              row.map((num, x) => <NextMino key={`${x}-${y}`} num={num}></NextMino>)
            )}
          </NextMinoArea>
        </AroundNextMinoArea>
        <Score>Score:{score}</Score>
      </Main>
    </Container>
  )
}

export default Home
