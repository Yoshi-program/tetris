import type { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BLOCKS } from '../components/Blocks'

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
  border-radius: 5%;
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
  position: absolute;
  top: 7%;
  left: 75%;
  width: 140px;
  height: 270px;
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
  width: 100px;
  height: 100px;
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
const HoldMinoArea = styled(NextMinoArea)`
  top: 7%;
  left: 6%;
  width: 148px;
  height: 170px;
`
const ScoreArea = styled.div`
  position: absolute;
  top: 37%;
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
  top: 58%;
`
const GameStateArea = styled(ScoreArea)`
  top: 79%;
`
const Stop = styled.button`
  position: absolute;
  top: 53%;
  left: 75%;
  width: 140px;
  height: 105px;
  font-size: 30px;
  color: white;
  text-align: center;
  background-color: #000;
  border: solid 5px;
  border-color: #fff #777 #777 #fff;
  border-radius: 10%;

  &:hover {
    font-size: 31px;
    cursor: pointer;
    background-color: #2a2a2a;
  }
`
const Home: NextPage = () => {
  //const [gameStart, setGameStart] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [stop, setGameStop] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [hold, setHold] = useState(BLOCKS[7])
  const [checkHold, setCheckHold] = useState(false)
  const [checkOne, setCheckOne] = useState(false)
  const [checkReset, setCheckReset] = useState(false)
  //０から６のランダムの配列を作る関数
  const createRandomNumber = () => {
    const randoms: number[] = []
    while (randoms.length < 7) {
      const i = Math.floor(Math.random() * 7)
      if (!randoms.includes(i)) {
        randoms.push(i)
      }
    }
    return randoms
  }
  const [numberList, setNumberList] = useState(createRandomNumber())
  const [tetromino, setTetromino] = useState(BLOCKS[numberList[0]])
  const [nextTetromino, setNextTetromino] = useState(BLOCKS[numberList[1]])
  const [nextTetromino2, setNextTetromino2] = useState(BLOCKS[numberList[2]])
  const [tryCount, setTryCount] = useState(0)
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
  const beforeNextMinoBoard2 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  const beforeHoldMinoBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  const [nextMinoBoard, setNextMinoBoard] = useState(beforeNextMinoBoard)
  const [nextMinoBoard2, setNextMinoBoard2] = useState(beforeNextMinoBoard2)
  const [holdMinoBoard, setHoldMinoBoard] = useState(beforeHoldMinoBoard)
  const [board, setBoard] = useState(before)
  const [x, X] = useState(4)
  const [y, Y] = useState(1)
  const [rotateNumber, setRotateNumber] = useState(0)

  const changeBoard = () => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    for (let cy = 0; cy < tetromino[rotateNumber].length; cy++) {
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
      changeBoard()
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
  const changeNextMinoBoard2 = () => {
    const newBoard: number[][] = beforeNextMinoBoard2
    for (let cy = 0; cy < nextTetromino2[0].length; cy++) {
      for (let cx = 0; cx < nextTetromino2[0][cy].length; cx++) {
        if (nextTetromino2[0][cy][cx] !== 0) {
          newBoard[cy + 1][cx] = nextTetromino2[0][cy][cx]
        }
      }
    }
    setNextMinoBoard2(newBoard)
  }

  const changeHoldMinoBoard = () => {
    const newBoard: number[][] = beforeHoldMinoBoard
    for (let cy = 0; cy < hold[0].length; cy++) {
      for (let cx = 0; cx < hold[0][cy].length; cx++) {
        if (hold[0][cy][cx] !== 0) {
          newBoard[cy + 1][cx] = hold[0][cy][cx]
        }
      }
    }
    setHoldMinoBoard(newBoard)
  }
  //テトリミノのリセット時の関数
  const resetfunc = () => {
    setCheckOne(!checkOne)
    // ボードの状態管理（消えるラインがあるか、gameOverであるか）
    const nowBoard = changeBoard()
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
    for (let c = 0; c < count; c++) newBoard.unshift([9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9])

    setBoard(newBoard)
    if (!newBoard[2].every((value) => value === 0 || value === 9)) setGameOver(true)
    //テトリミノの管理
    setTetromino(nextTetromino)
    setNextTetromino(nextTetromino2)
    setNextTetromino2(BLOCKS[numberList[tryCount + 3]])
    if (tryCount === 3) {
      setNumberList(createRandomNumber())
      setTryCount(-4)
    }
    changeNextMinoBoard()
    changeNextMinoBoard2()
    setRotateNumber(0)
    X(4)
    Y(1)
    setTryCount((c) => c + 1)
    setCheckHold(false)
  }

  //ホールド時のリセット関数
  const holdReset = () => {
    setTetromino(nextTetromino)
    setNextTetromino(nextTetromino2)
    setNextTetromino2(BLOCKS[numberList[tryCount + 3]])
    if (tryCount === 3) {
      setNumberList(createRandomNumber())
      setTryCount(-4)
    }
    changeNextMinoBoard()
    changeNextMinoBoard2()
    setRotateNumber(0)
    X(4)
    Y(1)
    setTryCount((c) => c + 1)
  }

  // 左右下に動かせるかを判定する関数
  const checkCordinate = (cx: number, cy: number, tetromino: number[][]) => {
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
  const levelofTetris = (level: number) => (level <= 10 ? level : 10)

  useEffect(() => {
    changeNextMinoBoard()
    changeNextMinoBoard2()
    changeHoldMinoBoard()
    if (gameOver || stop) return
    const check = checkCordinate(x, y + 1, tetromino[rotateNumber])
    if (!check) Y(y + 1)
    setTimeout(() => {
      setCheckOne(!checkOne)
      if (check) setCheckReset(!checkReset)
    }, 1100 - levelofTetris(level) * 100)
  }, [checkOne, stop])

  //矢印キー処理関数
  const moveLeft = () => {
    if (!checkCordinate(x - 1, y, tetromino[rotateNumber])) X((c) => c - 1)
  }
  const moveRight = () => {
    if (!checkCordinate(x + 1, y, tetromino[rotateNumber])) X((c) => c + 1)
  }
  const drop = () => {
    if (!checkCordinate(x, y + 1, tetromino[rotateNumber])) Y((c) => c + 1)
  }
  //回転させる関数
  const changeRotate = (checkRight: boolean) => {
    for (let moveY = 0; moveY < 3; moveY++) {
      for (let moveX = 0; moveX < tetromino[0].length - 1; moveX++) {
        if (
          !checkCordinate(
            x + moveX,
            y - moveY,
            tetromino[
              checkRight
                ? rotateNumber < 3
                  ? rotateNumber + 1
                  : 0
                : rotateNumber > 0
                ? rotateNumber - 1
                : 3
            ]
          )
        ) {
          X((c) => c + moveX)
          Y((c) => c - moveY)
          setRotateNumber(
            checkRight ? (c) => (c < 3 ? c + 1 : (c = 0)) : (c) => (c > 0 ? c - 1 : (c = 3))
          )
          return
        }
      }
      for (let moveX = -1; moveX > -(tetromino[0].length - 1); moveX--) {
        if (
          !checkCordinate(
            x + moveX,
            y - moveY,
            tetromino[
              checkRight
                ? rotateNumber < 3
                  ? rotateNumber + 1
                  : 0
                : rotateNumber > 0
                ? rotateNumber - 1
                : 3
            ]
          )
        ) {
          X((c) => c + moveX)
          Y((c) => c - moveY)
          setRotateNumber(
            checkRight ? (c) => (c < 3 ? c + 1 : (c = 0)) : (c) => (c > 0 ? c - 1 : (c = 3))
          )
          return
        }
      }
    }
  }
  //即時に接地する関数
  const setUp = () => {
    let down = y
    while (!checkCordinate(x, down + 1, tetromino[rotateNumber])) {
      down++
    }
    Y(down)
  }
  //Holdする関数
  const holdfunc = () => {
    if (hold.length === 1) {
      setHold(tetromino)
      setCheckHold(true)
      changeHoldMinoBoard()
      holdReset()
      return
    }
    if (!checkHold) {
      setRotateNumber(0)
      X(4)
      Y(1)
      setHold(tetromino)
      setTetromino(hold)
      setCheckHold(true)
      changeHoldMinoBoard()
      return
    }
  }

  const gameStop = () => setGameStop(!stop)

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
          changeRotate(true)
          break
        case 'KeyX':
          changeRotate(true)
          break
        case 'ControlLeft':
          changeRotate(false)
          break
        case 'KeyZ':
          changeRotate(false)
          break
        case 'Space':
          setUp()
          break
        case 'ShiftLeft':
          holdfunc()
          break
        case 'ShiftRight':
          holdfunc()
          break
      }
    },
    [x, y, tetromino, rotateNumber]
  )

  useEffect(() => {
    if (gameOver || stop) return
    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [x, y, rotateNumber, tetromino])

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
            <NextMino>
              {nextMinoBoard2.map((row, y) =>
                row.map((num, x) => <NextMinoBlock key={`${x}-${y}`} num={num}></NextMinoBlock>)
              )}
            </NextMino>
          </AroundNextMino>
        </NextMinoArea>
        <HoldMinoArea>
          Hold
          <AroundNextMino>
            <NextMino>
              {holdMinoBoard.map((row, y) =>
                row.map((num, x) => <NextMinoBlock key={`${x}-${y}`} num={num}></NextMinoBlock>)
              )}
            </NextMino>
          </AroundNextMino>
        </HoldMinoArea>
        <ScoreArea>
          <ScoreandLevel>
            Score
            <br />
            {score}
          </ScoreandLevel>
        </ScoreArea>
        <LevelArea>
          <ScoreandLevel>
            Level
            <br />
            {level}
          </ScoreandLevel>
        </LevelArea>
        <GameStateArea>
          <ScoreandLevel>{gameOver ? 'Gameover' : 'You can do it!'}</ScoreandLevel>
        </GameStateArea>
        <Stop onClick={gameStop}>{stop ? 'Resume!' : 'Stop!'}</Stop>
      </Main>
    </Container>
  )
}

export default Home
