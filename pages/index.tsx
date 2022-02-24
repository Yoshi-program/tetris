import type { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const COLORS = [
  'black',
  'lightblue',
  'blue',
  'orange',
  'yellow',
  'lightgreen',
  'purple',
  'red',
  '',
  'black',
]

const Container = styled.div`
  height: 100vh;
  background-color: #b5e1ef;
`
const AroundBlockArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 309px;
  height: 609px;
  margin: 0;
  margin-right: -50%;
  background-color: #cdcdcd;
  border: solid 5px;
  border-color: #fff #777 #777 #fff;
  transform: translate(-50%, -50%);
`
const Board = styled.div`
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
const Test = styled.div`
  text-align: center;
`

const Home: NextPage = () => {
  const BLOCKS = [
    [[1, 1, 1, 1]],
    [
      [2, 0, 0],
      [2, 2, 2],
    ],
    [
      [0, 0, 3],
      [3, 3, 3],
    ],
    [
      [4, 4],
      [4, 4],
    ],
    [
      [0, 5, 5],
      [5, 5, 0],
    ],
    [
      [0, 6, 0],
      [6, 6, 6],
    ],
    [
      [7, 7, 0],
      [0, 7, 7],
    ],
  ]
  const [start, gameStart] = useState(false)
  const [resetBlock, ResetBlock] = useState(false)
  //const [checkReset, CheckReset] = useState(false)
  const [checkOne, checkOneSecondMove] = useState(false)
  const [tetromino, createTetromino] = useState(BLOCKS[Math.floor(Math.random() * 7)])
  const before = [
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    //---
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
  const [board, setBoard] = useState(before)
  const [x, X] = useState(4)
  const [y, Y] = useState(0)
  // 一つ一つのブロックの情報
  const [block, setBlock] = useState({
    y: y, // キーボード操作や１秒ごとに下がる
    x: x, // キーボード操作で左右に動く
    blockIndex: tetromino,
    //colorIndex: 3,
  })
  //console.log(block)
  /*const sampleMemoFunc = (newBoard: number[][]) => {
    const memoResult = useMemo(() => {
      setBoard(newBoard)
      //beforeBoard(board)
      setBlock({ y: y, x: x, blockIndex: tetromino })
    }, [before])
    return memoResult
  }*/

  const changeBoard = () => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    for (let cy = 0; cy < tetromino.length; cy++) {
      for (let cx = 0; cx < tetromino[cy].length; cx++) {
        if (tetromino[cy][cx] !== 0) {
          newBoard[cy + y][cx + x] = tetromino[cy][cx]
        }
      }
    }
    /*const check = checkUnder()
    if (check) {
      //setBoard(newBoard)
      reset()
      return before
    }*/
    //setBoard(newBoard)
    return newBoard
  }

  const completeBoard = useMemo(
    () =>
      changeBoard()
        .slice(3, 23)
        .map((e) => e.filter((num) => num !== 9)),
    [x, y, tetromino]
  )
  const reset = () => {
    ResetBlock(false)
    //console.log(completeBoard)
    setBoard(changeBoard())
    //setBoard(completeBoard)
    //beforeBoard(board)
    //console.log(board) //なぜか一度にたくさん表示される
    createTetromino(BLOCKS[Math.floor(Math.random() * 7)])
    X(4)
    Y(3)
    //setBlock({ y: y, x: x, blockIndex: tetromino })
    //console.log(resetBlock)
  }

  // 下に進めるかを判定する関数
  const checkCordinate = (cx: number, cy: number, tetromino: number[][]) => {
    if (cy + tetromino.length > 22) {
      return true
    }
    const nowBoard = changeBoard()
    for (const y of [cy, cy + 1]) {
      for (const x of [cx, cx + 1, cx + 2]) {
        if (
          nowBoard[y][x] === nowBoard[y + 1][x] &&
          nowBoard[y][x] !== board[y + 1][x] &&
          nowBoard[y][x] !== 0
        ) {
          //console.log('sss')
          continue
        }
        if (
          1 <= nowBoard[y][x] &&
          nowBoard[y][x] <= 7 &&
          1 <= nowBoard[y + 1][x] &&
          nowBoard[y + 1][x] <= 9
        ) {
          return true
        }
      }
    }
    return false
  }
  //左右に進めるかを判定する関数
  const checkSide = (cx: number, cy: number, tetromino: number[][], left: boolean) => {
    const nowBoard = changeBoard()
    if (left && (nowBoard[cy][cx - 1] === 9 || nowBoard[cy][cx + 1] === 9)) {
      return true
    }
    if (!left && (cx < 1 || cx + tetromino[0].length > 10)) {
      return true
    }
    return false
  }

  const oneSecondMove = () => {
    const check = checkCordinate(x, y, tetromino)
    if (check) {
      //reset()
      return true
    } else if (!check) {
      Y((c) => c + 1)
      return false
    }
  }

  useEffect(() => {
    //const newBoard: number[][] = JSON.parse(JSON.stringify(before))
    //setTimeout(() => {
    /*if (resetBlock) {
        return
      }*/

    setTimeout(() => {
      if (!oneSecondMove()) {
        checkOneSecondMove(!checkOne)
      } else {
        reset()
        checkOneSecondMove(!checkOne)
        console.log(changeBoard())
      }
    }, 1000)
    //}
    //console.log(before[19][5])
    /*for (const cy of [y, y + 1]) {
        for (const cx of [x, x + 1, x + 2]) {
          if (
            newBoard[cy][cx] === newBoard[cy + 1][cx] &&
            newBoard[cy][cx] !== before[cy + 1][cx] &&
            newBoard[cy][cx] !== 0
          ) {
            console.log('sss')
            continue
          }
          if (
            1 <= newBoard[cy][cx] &&
            newBoard[cy][cx] <= 7 &&
            1 <= newBoard[cy + 1][cx] &&
            newBoard[cy + 1][cx] <= 9
          ) {
            //Y((c) => c + 1)
            ResetBlock(false)
            //setBoard(newBoard)
            reset()
            return
            //console.log(board)
          }
        }
      }
      if (resetBlock) {
        Y((c) => c + 1)
      }*/
    //console.log(board)
    //}, 1000)
    //return () => clearInterval(interval2)
  }, [checkOne])

  //------------

  /*const Play = () => {  
    const newBoard: number[][] = JSON.parse(JSON.stringify(before))
    newBoard[2][2] = BLOCKS[1][0][0]
    // beforeBoard(newBoard)
  }*/
  //return createBoard
  // }
  //SetBlock()
  // setBlock(y:2, x:1, blockIndex: 2, colorIndex: 3)
  //const aaBoard = useMemo(() => {}, [x, y])
  // const newBoard: number[][] = JSON.parse(JSON.stringify(setBoard))

  // 押したキーに対応する関数
  //const usePressKeyStatus = () => {
  // const [stateOfPressKey, setStateOfPressKey] = useState({})

  // return stateOfPressKey
  //}
  //usePressKeyStatus()
  //}
  //Play()
  /*useMemo(() => {
    if
    const [board, setBoard] = useState(before)
  }, [before])*/
  //矢印キーで落ちるときの判定処理関数
  const drop = () => {
    if (!checkCordinate(x, y, tetromino)) {
      Y((c) => c + 1)
      return true
    }
    return false

    /*let yy = y
    while (!checkCordinate(x, y, tetromino)) {
      yy++
    }
    Y(yy)*/
  }
  const moveLeft = () => {
    if (!checkSide(x, y, tetromino, true)) {
      X((c) => c - 1)
    }
  }
  const moveRight = () => {
    if (!checkSide(x, y, tetromino, false)) {
      X((c) => c + 1)
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft()
          console.log(x)
          break
        case 'ArrowRight':
          moveRight()
          console.log(x)
          break
        case 'ArrowDown':
          console.log(y)
          if (!drop()) {
            //reset()
          }
          //reset()
          //Y((c) => c + 1)
          break
      }
      /*if (e.key === 'ArrowLeft') {
        //if (1 <= x && x <= 9) {
        //X(x - 1)
        moveRight()
        //X((c) => c - 1)
        console.log(x)
        return
        //}
      }
      //console.log('左')
      else if (e.key === 'ArrowRight') {
        //if (0 <= x && x <= 6) {
        //X(x + 1)
        X((c) => c + 1)
        console.log(x)

        return
        //console.log('右')
      } else if (e.key === 'ArrowDown') {
        drop()
        //console.log('下')
      }*/
    },
    [x, y, tetromino]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [x, y])

  return (
    <Container>
      <AroundBlockArea>
        <Board>
          {completeBoard.map((row, y) =>
            row.map((num, x) => <MinBlock key={`${x}-${y}`} num={num}></MinBlock>)
          )}
        </Board>
      </AroundBlockArea>
      <Test>あああああ</Test>
    </Container>
  )
}

export default Home
