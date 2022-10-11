import React, { useEffect, useState } from 'react'
import '../styles/cube.css'

export default function Dice() {
  const [rotation, setRotation] = useState([{}])
  const [result, setResult] = useState<number[]>()

  const [size, setSize] = useState('scale-0')
  const [anim, setAnim] = useState('')
  const [num, setNum] = useState('')

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('size')) {
      const size = localStorage.getItem('size')
      if (size === 'small') setSize('scale-100')
      else if (size === 'medium') setSize('scale-125')
      else if (size === 'large') setSize('scale-150')
      else setSize('scale-125')
    } else {
      setSize('scale-125')
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('anim')) {
      const anim = localStorage.getItem('anim')
      setAnim(anim || '4')
    } else {
      setAnim('4')
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('num')) {
      const num = localStorage.getItem('num')
      setNum(num || '2')
    } else {
      setNum('2')
    }
  }, [])

  const min = 1
  const max = 6 * 4
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

    setRotation([
      {
        transform: `rotateX(${xRand[0]}deg) rotateY(${yRand[0]}deg)`,
        transitionDuration: `${anim}s`
      },
      {
        transform: `rotateX(${xRand[1]}deg) rotateY(${yRand[1]}deg)`,
        transitionDuration: `${anim}s`
      }
    ])
  }

  return (
    <div
      onClick={roll}
      className={`flex flex-col md:flex-row gap-y-16 gap-x-16 items-center 
        transition-all ${size} absolute w-[100px] h-[264px] md:w-[264px] md:h-[100px]
        top-1/2 left-1/2 mt-[-132px] md:mt-[-50px] ml-[-50px] md:ml-[-132px]`}
    >
      <Die id="dice1" rotation={rotation[0]} />
      <Die id="dice2" rotation={rotation[1]} />
    </div>
  )
}

const Die = ({ id, rotation }: any) => {
  //const duration: number = +anim
  return (
    <div id={id} className="dice" style={rotation}>
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
