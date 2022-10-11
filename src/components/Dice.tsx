import React, { useEffect, useState } from 'react'
import '../styles/cube.css'

export default function Dice() {
  const min = 1
  const max = 6 * 4

  /*
  const valuesMatrix = [
    [1, 5, 6, 2],
    [3, 5, 4, 2],
    [6, 5, 1, 2],
    [4, 5, 3, 2]
  ]
  const [result, setResult] = useState<number[]>()
  */

  const [rotation, setRotation] = useState([{}])

  const [num, setNum] = useState('')
  const [size, setSize] = useState('scale-0')
  const [anim, setAnim] = useState('')

  useEffect(() => {
    var n = 0
    if (typeof localStorage !== 'undefined' && localStorage.getItem('num')) {
      const num = localStorage.getItem('num')
      setNum(num || '2')
      if (num) n = +num
      else n = 2
    } else {
      setNum('2')
      n = 2
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('size')) {
      const size = localStorage.getItem('size')
      if (size === 'small')
        setSize(`${n > 2 ? 'scale-90' : 'scale-100'} md:scale-100`)
      else if (size === 'medium')
        setSize(`${n > 2 ? 'scale-100' : 'scale-125'} md:scale-125`)
      else if (size === 'large')
        setSize(`${n > 2 ? 'scale-125' : 'scale-150'} md:scale-150`)
      else setSize(`${n > 2 ? 'scale-100' : 'scale-125'} md:scale-125`)
    } else {
      setSize(`${n > 2 ? 'scale-100' : 'scale-125'} md:scale-125`)
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('anim')) {
      const anim = localStorage.getItem('anim')
      setAnim(anim || '4')
    } else {
      setAnim('4')
    }
  }, [])

  const getRandom = (max: number, min: number) => {
    return (Math.floor(Math.random() * (max - min)) + min) * 90
  }
  const roll = () => {
    var xRand: number[] = []
    var yRand: number[] = []
    for (let index = 0; index < +num; index++) {
      xRand.push(getRandom(max, min))
      yRand.push(getRandom(max, min))
    }

    var rotationArr: {}[] = []
    for (let index = 0; index < +num; index++) {
      rotationArr.push({
        transform: `rotateX(${xRand[index]}deg) rotateY(${yRand[index]}deg)`,
        transitionDuration: `${anim}s`
      })
    }
    setRotation(rotationArr)

    /*
    setResult([
      valuesMatrix[(yRand[0] % 360) / 90][(xRand[0] % 360) / 90],
      valuesMatrix[(yRand[1] % 360) / 90][(xRand[1] % 360) / 90]
    ])
    */
  }

  return (
    <div
      onClick={roll}
      className={`
        ${+num < 4 ? 'flex flex-col md:flex-row' : 'grid'}
        grid-cols-2 ${+num === 4 ? 'md:grid-col-2' : 'md:grid-cols-3'}
        gap-y-16 md:gap-y-20 gap-x-16 items-center transition-all ${size} absolute
        ${+num > 3 ? 'w-[264px] ml-[-132px]' : 'w-[100px] ml-[-50px]'}
        ${
          +num > 4 || +num === 3
            ? 'h-[428px] mt-[-214px]'
            : +num === 2 || +num === 4
            ? 'h-[264px] mt-[-132px]'
            : 'h-[100px] mt-[-50px]'
        }
        ${
          +num > 4 || +num === 3
            ? 'md:w-[428px] md:ml-[-214px]'
            : +num > 1
            ? 'md:w-[264px] md:ml-[-132px]'
            : 'md:w-[100px] md:ml-[-50px]'
        }
        ${
          +num > 3
            ? 'md:h-[264px] md:mt-[-132px]'
            : 'md:h-[100px] md:mt-[-50px]'
        }
        top-1/2 left-1/2`}
    >
      {[...Array(+num)].map((el, index) => {
        return (
          <div
            key={`dice${index}`}
            className={`
              ${+num === 5 && index === 2 ? 'col-span-2 md:col-span-1' : ''}
              ${+num === 5 && index === 1 ? 'md:row-span-2' : ''}
              m-auto`}
          >
            <Die id={`dice${index}`} rotation={rotation[index]} />
          </div>
        )
      })}
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
