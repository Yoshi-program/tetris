import type { NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const COLORS = ['', 'lightblue', 'blue', 'orange', 'yellow', 'lightgreen', 'purple', 'red']

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
  border-color: #fff #3e3e3e #3e3e3e #fff;
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
  background-color: ${(props) =>
    props.num >= 1 && props.num <= 7 ? COLORS[props.num] : '#000000'};
  border: solid 0.15vh #000;
`
const HideBlock = styled.div`
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: baseline;
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
      [0, 4, 4],
      [0, 4, 4],
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
  const [resetBlock, ResetBlock] = useState(true)
  const [tetromino, createTetromino] = useState(BLOCKS[Math.floor(Math.random() * 6) + 1])
  const [before, beforeBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //ここから表示しない
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  ])
  const [board, setBoard] = useState(before)
  const [x, X] = useState(3)
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

  const reset = () => {
    beforeBoard(board)
    //console.log(board) //なぜか一度にたくさん表示される
    createTetromino(BLOCKS[Math.floor(Math.random() * 6) + 1])
    //X(7)
    X(3)
    //Y(12)
    Y(0)
    setBlock({ y: y, x: x, blockIndex: tetromino })
    //console.log(resetBlock)
    ResetBlock(true)
    //console.log(resetBlock)
  }

  /*const createBoard = useMemo(() => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(before))
    newBoard[block.y][block.x] = 1
    beforeBoard(newBoard)
    return beforeBoard
  }, [before, block])
  createBoard*/

  // 試し
  /*const onClick = () => {
    //これを関数化してuseEffectで繰り返す
    setBlock({ y: y, x: x, blockIndex: tetromino })
    //console.log(block)
  }
  //console.log(tetromino)

  const usePrevious = (value: number) => {
    const ref = useRef(value)
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const preX = usePrevious(x)
  const preY = usePrevious(y)*/

  //ここから実行
  // 下がるのは１秒ずつだけど矢印キーはもっと細かく
  const Play = () => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(before))
    useEffect(() => {
      //console.log(block)
      const interval = setInterval(() => {
        //１秒ごとにやること(ミノを下げる)
        //const newBoard: number[][] = JSON.parse(JSON.stringify(before))
        //if (0 <= y) {
        //ResetBlock(true)
        /*if (y === 19) {
            ResetBlock(false)
            reset()
          }*/
        /*if (y > 1 && resetBlock) {
            if (preX !== x) {
              /*for (const cy of [preY, preX + 1, preY - 1]) {
                for (const cx of [preX, preX - 1, preX + 1, preX + 2, preX + 3, preX + 4]) {
                  if (0 <= cy && cy <= 19 && 0 <= cx && cx <= 5) {
                    newBoard[cy][cx] = 0
                  }
                }
              }
              newBoard[preY][preX] = 0
              newBoard[preY][preX + 1] = 0
              newBoard[preY][preX + 2] = 0
              newBoard[preY + 1][preX] = 0
              newBoard[preY + 1][preX + 1] = 0
              newBoard[preY + 1][preX + 2] = 0
              /*newBoard[preY][preX] = 0
            newBoard[preY][preX - 1] = 0
            newBoard[preY][preX + 1] = 0
            newBoard[preY][preX + 2] = 0
            newBoard[preY][preX + 3] = 0
            newBoard[preY][preX + 4] = 0
            newBoard[preY][preX + 5] = 0
            newBoard[preY + 1][preX] = 0
            newBoard[preY + 1][preX + 1] = 0
            newBoard[preY + 1][preX + 2] = 0
            newBoard[preY + 1][preX + 3] = 0
            newBoard[preY + 1][preX + 4] = 0
            newBoard[preY + 1][preX + 5] = 0
            newBoard[preY - 1][preX - 1] = 0
            newBoard[preY - 1][preX] = 0
            } else if (preX === x && resetBlock) {
              newBoard[y - 1][x] = 0
              newBoard[y - 1][x + 1] = 0
              newBoard[y - 1][x + 2] = 0
              newBoard[y][x] = 0
              newBoard[y][x + 1] = 0
              newBoard[y][x + 2] = 0
            }
          }*/
        if (0 <= y && y <= 19 && 0 <= x && x <= 7) {
          //テトリミノが０でなければ表示（0で上乗せしない)<---なくてもいいかも
          newBoard[y][x] = newBoard[y][x] === 0 ? tetromino[0][0] : newBoard[y][x]
          newBoard[y][x + 1] = newBoard[y][x + 1] === 0 ? tetromino[0][1] : newBoard[y][x + 1]
          newBoard[y][x + 2] = newBoard[y][x + 2] === 0 ? tetromino[0][2] : newBoard[y][x + 2]
          newBoard[y + 1][x] = newBoard[y + 1][x] === 0 ? tetromino[1][0] : newBoard[y + 1][x]
          newBoard[y + 1][x + 1] =
            newBoard[y + 1][x + 1] === 0 ? tetromino[1][1] : newBoard[y + 1][x + 1]
          newBoard[y + 1][x + 2] =
            newBoard[y + 1][x + 2] === 0 ? tetromino[1][2] : newBoard[y + 1][x + 2]

          /*newBoard[y][x] = tetromino[0][0]
          newBoard[y][x + 1] = tetromino[0][1]
          newBoard[y][x + 2] = tetromino[0][2]
          newBoard[y + 1][x] = tetromino[1][0]
          newBoard[y + 1][x + 1] = tetromino[1][1]
          newBoard[y + 1][x + 2] = tetromino[1][2]*/
          // }
          //beforeBoard(newBoard)
          setBoard(newBoard)

          setBlock({ y: y, x: x, blockIndex: tetromino })

          //X((c) => c + 1)
        } /*else {
        ResetBlock(false)
        createTetromino(BLOCKS[Math.floor(Math.random() * 6) + 1])
        X(5)
        X(3)
        Y(12)
        Y(0)
      }*/
      }, 10)
      if (!resetBlock) {
        //beforeBoard(board)
        reset()
        //return
      }
      return () => clearInterval(interval)
    }, [x, y])

    useEffect(() => {
      const interval2 = setInterval(() => {
        console.log(before[19][5])
        for (const cy of [y, y + 1]) {
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
              //reset()
              //return
              //console.log(board)
            }
          }
        }
        if (resetBlock) {
          Y((c) => c + 1)
        }
      }, 1000)
      return () => clearInterval(interval2)
    }, [y])

    //------------

    /*const Play = () => {  
    const newBoard: number[][] = JSON.parse(JSON.stringify(before))
    newBoard[2][2] = BLOCKS[1][0][0]
    console.log('成功のはず')
    // beforeBoard(newBoard)
  }*/
    // Play()
    //return createBoard
    // }
    //SetBlock()
    // setBlock(y:2, x:1, blockIndex: 2, colorIndex: 3)

    // const setBoard = useMemo(() => {}, [before, block])
    // const newBoard: number[][] = JSON.parse(JSON.stringify(setBoard))

    // 押したキーに対応する関数
    const usePressKeyStatus = () => {
      // const [stateOfPressKey, setStateOfPressKey] = useState({})
      const handleKeyUp = useCallback(
        (e) => {
          const keyCode = e.keyCode

          if (keyCode === 37) {
            if (1 <= x && x <= 9) {
              X((c) => c - 1)
            }
            //console.log('左')
          }
          if (keyCode === 39) {
            if (0 <= x && x <= 6) {
              X((c) => c + 1)
            }
            //console.log('右')
          }
          if (keyCode === 40) {
            Y((c) => c + 1)
            //console.log('下')
          }
        },
        [x, y]
      )

      /*const handleKeyDown = useCallback((e) => {
      const keyCode = e.keyCode

      if (keyCode === 37) {
        // left
        console.log('左')
      }
      if (keyCode === 39) {
        //right
        setStateOfPressKey((state) => ({
          ...state,
          right: true,
        }))
      }
      if (keyCode === 38) {
        //up
        setStateOfPressKey((state) => ({
          ...state,
          top: true,
        }))
      }
    }, [])*/

      useEffect(() => {
        // addEventListener('keydown', (e) => handleKeyDown(e))
        addEventListener('keyup', (e) => handleKeyUp(e))
      }, [])

      // return stateOfPressKey
    }
    usePressKeyStatus()
  }
  Play()
  /*useMemo(() => {
    if
    const [board, setBoard] = useState(before)
  }, [before])*/

  return (
    <Container>
      <AroundBlockArea>
        <Board>
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 9 ? (
                <HideBlock key={`${x}-${y}`}></HideBlock>
              ) : num === 0 ? (
                <MinBlock
                  key={`${x}-${y}`}
                  num={0 <= num && num <= 7 ? num : 20}
                  //onClick={() => onClick()}
                ></MinBlock>
              ) : (
                <MinBlock
                  key={`${x}-${y}`}
                  num={1 <= num && num <= 7 ? num : 20}
                  //onClick={() => onClick()}
                ></MinBlock>
              )
            )
          )}
        </Board>
      </AroundBlockArea>
      <Test>あああああ</Test>
    </Container>
  )
}

export default Home
