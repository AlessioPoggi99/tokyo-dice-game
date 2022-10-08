import React, { useEffect, useState } from 'react'
import '../styles/cube.css'

export default function Dice() {
  const [style, setStyle] = useState<{}[]>([{}])
  const [result, setResult] = useState<number[]>()

  var min = 1
  var max = 6 * 4

  const valuesMatrix = [
    [1, 5, 6, 2],
    [3, 5, 4, 2],
    [6, 5, 1, 2],
    [4, 5, 3, 2]
  ]

  const getRandom = (max: number, min: number) => {
    return (Math.floor(Math.random() * (max - min)) + min) * 90
  }
  const roll = () => {
    var xRand = [getRandom(max, min), getRandom(max, min)]
    var yRand = [getRandom(max, min), getRandom(max, min)]

    setResult([
      valuesMatrix[(yRand[0] % 360) / 90][(xRand[0] % 360) / 90],
      valuesMatrix[(yRand[1] % 360) / 90][(xRand[1] % 360) / 90]
    ])

    setStyle([
      { transform: `rotateX(${xRand[0]}deg) rotateY(${yRand[0]}deg)` },
      { transform: `rotateX(${xRand[1]}deg) rotateY(${yRand[1]}deg)` }
    ])
  }

  useEffect(() => {
    console.log(result)
  }, [result])

  return (
    <div
      className="flex flex-col absolute w-60 h-60 top-1/2 left-1/2 mt-[-7.5rem] ml-[-7.5rem]"
      onClick={roll}
    >
      <div className="flex flex-col items-center gap-x-16 scale-125">
        <Die id="dice1" style={style[0]} />
        <Die id="dice2" style={style[1]} />
      </div>
      {/*
      <div className="flex justify-center">
        <button
          className="px-4 py-2 rounded-md bg-orange-300 dark:bg-white dark:text-black"
          onClick={roll}
        >
          Roll dice!
        </button>
      </div>
    */}
    </div>
  )
}

const Die = ({ id, style }: any) => {
  return (
    <div id={id} className="dice dice-one" style={style}>
      <div id="dice-one-side-one" className="side one">
        <div className="dot one-1"></div>
      </div>
      <div id="dice-one-side-two" className="side two">
        <div className="dot two-1"></div>
        <div className="dot two-2"></div>
      </div>
      <div id="dice-one-side-three" className="side three">
        <div className="dot three-1"></div>
        <div className="dot three-2"></div>
        <div className="dot three-3"></div>
      </div>
      <div id="dice-one-side-four" className="side four">
        <div className="dot four-1"></div>
        <div className="dot four-2"></div>
        <div className="dot four-3"></div>
        <div className="dot four-4"></div>
      </div>
      <div id="dice-one-side-five" className="side five">
        <div className="dot five-1"></div>
        <div className="dot five-2"></div>
        <div className="dot five-3"></div>
        <div className="dot five-4"></div>
        <div className="dot five-5"></div>
      </div>
      <div id="dice-one-side-six" className="side six">
        <div className="dot six-1"></div>
        <div className="dot six-2"></div>
        <div className="dot six-3"></div>
        <div className="dot six-4"></div>
        <div className="dot six-5"></div>
        <div className="dot six-6"></div>
      </div>
    </div>
  )
}
