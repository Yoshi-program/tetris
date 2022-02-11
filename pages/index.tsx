import type { NextPage } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const COLORS = ['', 'lightblue', 'blue', 'orange', 'yellow', 'lightgreen', 'purple', 'red']

const Container = styled.div`
  height: 100vh;
  background-color: lightblue;
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
    props.num >= 1 && props.num <= 7 ? COLORS[props.num] : '#cdcdcd'};
  border: solid 1px #6c6c6c;
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
  ])
  // 一つ一つのブロックの情報
  const [block, setBlock] = useState({
    y: 1, // キーボード操作や１秒ごとに下がる
    x: 0, // キーボード操作で左右に動く
    blockIndex: 2,
    colorIndex: 3,
  })

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
    const newBoard: number[][] = JSON.parse(JSON.stringify(before))
    newBoard[5][4] = BLOCKS[1][0][0]
    newBoard[6][4] = BLOCKS[1][1][0]
    newBoard[6][5] = BLOCKS[1][1][1]
    newBoard[6][6] = BLOCKS[1][1][2]
    beforeBoard(newBoard)
  }*/
  const [x, X] = useState(1)
  const [y, Y] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      //１秒ごとにやること(ミノを下げる)
      if (y < 19) {
        const newBoard: number[][] = JSON.parse(JSON.stringify(before))
        if (y > 2) {
          newBoard[y - 1][x] = 0
          //newBoard[y + 1][x] = 0
          newBoard[y][x + 1] = 0
          newBoard[y][x + 2] = 0
        }
        newBoard[y][x] = BLOCKS[1][0][0]
        newBoard[y + 1][x] = BLOCKS[1][1][0]
        newBoard[y + 1][x + 1] = BLOCKS[1][1][1]
        newBoard[y + 1][x + 2] = BLOCKS[1][1][2]
        beforeBoard(newBoard)
        //X((c) => c + 1)
        Y((c) => c + 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [x, y])
  //------------

  const Play = () => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(before))
    newBoard[2][2] = BLOCKS[1][0][0]
    console.log('成功のはず')
    // beforeBoard(newBoard)
  }
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
    const handleKeyUp = useCallback((e) => {
      const keyCode = e.keyCode

      if (keyCode === 37) {
        // left
        console.log('左')
      }
      if (keyCode === 39) {
        //right
        console.log('右')
      }
      if (keyCode === 40) {
        //down
        console.log('下')
      }
    }, [])

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
  console.log('aaaa')

  return (
    <Container>
      <AroundBlockArea>
        <Board>
          {before.map((row, y) =>
            row.map((num, x) =>
              num === 0 ? (
                <MinBlock
                  key={`${x}-${y}`}
                  num={0 <= num && num <= 7 ? num : 20}
                  onClick={() => onClick()}
                ></MinBlock>
              ) : (
                <MinBlock
                  key={`${x}-${y}`}
                  num={1 <= num && num <= 7 ? num : 20}
                  onClick={() => onClick()}
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
