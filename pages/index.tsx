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
  width: 800px;
  height: 700px;
  margin: 0;
  margin-right: -50%;
  background-color: #4995ff;
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
const AroundBlockArea = styled(BlockArea)`
  width: 306px;
  height: 606px;
  border: solid 3px;
  border-color: white;
`
const MinBlock = styled.div<{ num: number }>`
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: baseline;
  background-color: ${(props) => COLORS[props.num]};
  border: solid 0.15vh ${(props) => (props.num === 0 ? '#51515166' : 'black')};
`
const NextMinoArea = styled.div`
  position: relative;
  top: 7%;
  left: 75%;
  width: 140px;
  height: 170px;
  padding-top: 10px;
  font-size: 30px;
  color: white;
  text-align: center;
  background-color: black;
  border: solid 2px white;
  border-color: white;
  border-radius: 10%;
`
const AroundNextMino = styled.div`
  position: relative;
  top: 5%;
  left: 16%;
  width: 109px;
  height: 109px;
`
const NextMino = styled.div`
  width: 120px;
  height: 120px;
`
const NextMinoBlock = styled.div<{ num: number }>`
  float: left;
  width: 25px;
  height: 25px;
  line-height: 30px;
  vertical-align: baseline;
  background-color: ${(props) => COLORS[props.num]};
  border: solid 0.15vh #000;
`
const ScoreArea = styled.div`
  position: absolute;
  top: 7%;
  left: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 148px;
  height: 105px;
  background-color: #000;
  border: solid 2px white;
  border-radius: 10%;
`
const ScoreandLevel = styled.div`
  font-size: 30px;
  color: white;
  text-align: center;
`
const LevelArea = styled(ScoreArea)`
  top: 27%;
`
const GameStateArea = styled(ScoreArea)`
  top: 47%;
`
const Stop = styled.div`
  position: absolute;
  top: 37%;
  left: 75%;
  width: 140px;
  height: 105px;
  padding-top: 25px;
  background-color: #000;
  border: solid 5px;
  border-color: #fff #777 #777 #fff;
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
  //const [start, gameStart] = useState(false)
  const [over, gameOver] = useState(false)
  const [stop, setgameStop] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [checkOne, checkOneSecondMove] = useState(false)
  const [checkReset, setCheckReset] = useState(false)
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

  //テトリミノのリセット時の関数
  const resetfunc = () => {
    checkOneSecondMove(!checkOne)
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
  }

  // 左右下に進めるかを判定する関数
  const checkCordinate = (cx: number, cy: number, tetromino: number[][]) => {
    if (cy + tetromino.length > 24) {
      return true
    }
    for (let y = 0; y < tetromino.length; y++) {
      for (let x = 0; x < tetromino[y].length; x++) {
        if (tetromino[y][x] > 0 && board[y + cy][x + cx] > 0) {
          return true
        }
      }
    }
    return false
  }

  useEffect(() => {
    setLevel(1 + Math.floor(score / 5))
  }, [score])

  useEffect(() => {
    if (checkCordinate(x, y + 1, tetromino[rotateNumber])) {
      resetfunc()
      return
    }
  }, [checkReset])

  //レベルの範囲指定
  const levelofTetris = (level: number) => {
    return level <= 10 ? level : 10
  }

  useEffect(() => {
    changeNextMinoBoard()
    if (over || stop) {
      return
    }
    const check = checkCordinate(x, y + 1, tetromino[rotateNumber])
    if (!check) {
      Y(y + 1)
    }
    setTimeout(() => {
      checkOneSecondMove(!checkOne)
      if (check) {
        setCheckReset(!checkReset)
      }
    }, 1100 - levelofTetris(level) * 100)
  }, [checkOne, stop])

  //矢印キー処理関数
  const moveLeft = () => {
    if (!checkCordinate(x - 1, y, tetromino[rotateNumber])) {
      X((c) => c - 1)
    }
  }
  const moveRight = () => {
    if (!checkCordinate(x + 1, y, tetromino[rotateNumber])) {
      X((c) => c + 1)
    }
  }
  const drop = () => {
    if (!checkCordinate(x, y + 1, tetromino[rotateNumber])) {
      Y((c) => c + 1)
    }
  }
  //未完成
  const changeRotate = () => {
    if (rotateNumber < 3) {
      if (checkCordinate(x, y, tetromino[rotateNumber + 1])) {
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
      if (checkCordinate(x, y, tetromino[0])) {
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
  //行けるだけ一気に下に移動する関数
  const setUp = () => {
    let down = y
    while (!checkCordinate(x, down + 1, tetromino[rotateNumber])) {
      down++
    }
    Y(down)
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
    if (over || stop) {
      return
    }
    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [x, y, rotateNumber, tetromino, stop])

  const gameStop = () => {
    setgameStop(!stop)
  }

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
        <NextMinoArea>
          Next
          <AroundNextMino>
            <NextMino>
              {nextMinoBoard.map((row, y) =>
                row.map((num, x) => <NextMinoBlock key={`${x}-${y}`} num={num}></NextMinoBlock>)
              )}
            </NextMino>
          </AroundNextMino>
        </NextMinoArea>
        <ScoreArea>
          <ScoreandLevel>
            Score<br></br>
            {score}
          </ScoreandLevel>
        </ScoreArea>
        <LevelArea>
          <ScoreandLevel>
            Level<br></br>
            {level}
          </ScoreandLevel>
        </LevelArea>
        <GameStateArea>
          <ScoreandLevel>{over ? 'Gameover' : 'You can do it!'}</ScoreandLevel>
        </GameStateArea>
        <Stop>
          <ScoreandLevel onClick={() => gameStop()}>{stop ? 'Resume!' : 'Stop!'}</ScoreandLevel>
        </Stop>
      </Main>
    </Container>
  )
}

export default Home
