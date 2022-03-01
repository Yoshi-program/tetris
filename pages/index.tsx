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
  //const [resetBlock, ResetBlock] = useState(false)
  //const [checkReset, CheckReset] = useState(false)
  const [reset, resetState] = useState(false)
  const [checkOne, checkOneSecondMove] = useState(false)
  const [nextTetromino, createTetromino] = useState(BLOCKS[Math.floor(Math.random() * 7)][0])
  const [tetromino, setTetromino] = useState(BLOCKS[Math.floor(Math.random() * 7)][0])
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
  const changeNextMinoBoard = () => {
    const newBoard: number[][] = beforeNextMinoBoard
    for (let cy = 0; cy < nextTetromino.length; cy++) {
      for (let cx = 0; cx < nextTetromino[cy].length; cx++) {
        if (nextTetromino[cy][cx] !== 0) {
          newBoard[cy + 1][cx] = nextTetromino[cy][cx]
        }
      }
    }
    setNextMinoBoard(newBoard)
  }
  const resetfunc = () => {
    //ResetBlock(false)
    //console.log(completeBoard)
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
    for (let c = 0; c < count; c++) {
      newBoard.unshift([9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9])
    }
    setBoard(newBoard)
    if (!newBoard[2].every((value) => value === 0 || value === 9)) {
      gameOver(true)
    }

    //setBoard(completeBoard)
    //beforeBoard(board)
    //console.log(board) //なぜか一度にたくさん表示される
    setTetromino(nextTetromino)
    createTetromino(BLOCKS[Math.floor(Math.random() * 7)][0])
    changeNextMinoBoard()
    X(4)
    Y(1)
    resetState(false)
    //setBlock({ y: y, x: x, blockIndex: tetromino })
    //console.log(resetBlock)
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
    /*const nowBoard = changeBoard()
    for (let y = 0; y < tetromino.length; y++) {
      for (let x = 0; x < tetromino[y].length; x++) {
        if (tetromino[y][x] !== 0) {
          if (
            nowBoard[y + cy][x + cx] === nowBoard[y + 1 + cy][x + cx] &&
            nowBoard[y + cy][x + cx] !== board[y + 1 + cy][x + cx] &&
            nowBoard[y + cy][x + cx] !== 0
          ) {
            //console.log('sss')
            continue
          }
          if (
            1 <= nowBoard[y + cy][x + cx] &&
            nowBoard[y + cy][x + cx] <= 7 &&
            1 <= nowBoard[y + 1 + cy][x + cx] &&
            nowBoard[y + 1 + cy][x + cx] <= 9
          ) {
            return true
          }
        }
      }
    }*/
    return false

    /*for (const y of [cy, cy + 1]) {
      for (const x of [cx, cx + 1, cx + 2]) {
        //棒のミノには対応していない
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
    }*/
  }

  //左右に進めるかを判定する関数
  const checkSide = (cx: number, cy: number, tetromino: number[][], left: boolean) => {
    //const nowBoard = changeBoard()
    /*if (left && nowBoard[cy][cx] === 9) {
      return true
    }*/
    if (left && cx < 1) {
      //return true
    }
    if (!left && cx + tetromino[0].length > 11) {
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

  /*const oneSecondMove = () => {
    const check = checkUnder(x, y, tetromino)
    if (check) {
      //resetfunc()
      return true
    } else if (!check) {
      Y((c) => c + 1)
      return false
    }
  }
  const Testfunc = () => {
    return
  }*/

  useEffect(() => {
    changeNextMinoBoard()
    if (over) {
      return
    }
    //const interval2 = setInterval(() => {
    const check = checkUnder(x, y + 1, tetromino)
    /*if (check) {
        //resetfunc()
        resetState(true)
        return
      } else if (!check) {
        Y((c) => c + 1)
      }*/
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
    //}, 1000)
    //return () => clearInterval(interval2)
    //const newBoard: number[][] = JSON.parse(JSON.stringify(before))
    const interval2 = setInterval(() => {
      checkOneSecondMove(!checkOne)
    }, 1500)

    //  setTimeout(() => {
    //    checkOneSecondMove(!checkOne)
    //  }, 1000)
    //checkOneSecondMove(!checkOne)

    return () => clearInterval(interval2)
    /*setTimeout(() => {
      if (!oneSecondMove()) {
        checkOneSecondMove(!checkOne)
      } else {
        resetfunc()
        checkOneSecondMove(!checkOne)
        console.log(changeBoard())
      }
    }, 1000)*/
    //}

    //console.log(board)
  }, [reset, checkOne])

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
    if (!checkUnder(x, y + 1, tetromino)) {
      Y((c) => c + 1)
      //return true
    }
    //return false

    /*let yy = y
    while (!checkCordinate(x, y, tetromino)) {
      yy++
    }
    Y(yy)*/
  }
  const moveLeft = () => {
    if (!checkSide(x - 1, y, tetromino, true)) {
      X((c) => c - 1)
    }
  }
  const moveRight = () => {
    if (!checkSide(x + 1, y, tetromino, false)) {
      X((c) => c + 1)
    }
  }
  //未完成(なぜか止まるし、貫通する)
  const setUp = () => {
    let down = y
    if (!checkUnder(x, y + 1, tetromino)) {
      //let down = y
      while (!checkUnder(x, down + 1, tetromino)) {
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
          //if (!drop()) {
          //reset()
          //}
          console.log(y)
          //resetfunc()
          break
        case 'Space':
          setUp()
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
    if (reset || over) {
      return
    }
    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [x, y, reset])

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
