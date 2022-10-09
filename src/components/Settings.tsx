import React, { useEffect, useState } from 'react'
import '../styles/settings.css'

export default function Settings() {
  const sizeOption = ['small', 'medium', 'large']
  const animOption = ['2', '3', '4']

  const [sizeSelected, setSizeSelected] = useState('')
  const [animSelected, setAnimSelected] = useState('')
  const [numSelected, setNumSelected] = useState('')

  const RANGE_MIN = 1,
    RANGE_MAX = 6

  useEffect(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('size')) {
      setSizeSelected(localStorage.getItem('size') || '')
    } else {
      setSizeSelected(sizeOption[1])
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('anim')) {
      setAnimSelected(localStorage.getItem('anim') || '')
    } else {
      setAnimSelected(animOption[2])
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('num')) {
      setNumSelected(localStorage.getItem('num') || '')
    } else {
      setNumSelected('2')
    }
  }, [])

  const handleSizeChange = (event: any) => {
    setSizeSelected(event.target.value)
    localStorage.setItem('size', event.target.value)
  }
  const handleAnimChange = (event: any) => {
    setAnimSelected(event.target.value)
    localStorage.setItem('anim', event.target.value)
  }
  const handleNumChange = (event: any) => {
    const val = event.target.value
    event.target.style.backgroundSize =
      ((val - RANGE_MIN) * 100) / (RANGE_MAX - RANGE_MIN) + '% 100%'

    setNumSelected(event.target.value)
    localStorage.setItem('num', event.target.value)
  }

  const radioStyle =
    'checked:border-solid checked:border-[0.125rem] checked:border-red-600 dark:checked:border-red-600 before:shadow-[inset_1em_1em_rgb(255,0,0)] dark:before:shadow-[inset_1em_1em_rgb(255,0,0)]'

  return (
    <div className="grid grid-cols-2 mt-8">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-bold">Dice size</h2>
        <div className="flex flex-col pl-2" onChange={e => handleSizeChange(e)}>
          {sizeOption.map(el => {
            return (
              <div key={el} className="text-base flex">
                <input
                  type="radio"
                  value={el}
                  name="size"
                  defaultChecked={el === sizeSelected}
                  className={radioStyle}
                />
                {el.charAt(0).toUpperCase() + el.slice(1)}
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-bold hidden sm:block">
          Animation duration
        </h2>
        <h2 className="text-xl font-bold sm:hidden">Anim duration</h2>
        <div className="flex flex-col pl-2" onChange={e => handleAnimChange(e)}>
          {animOption.map(el => {
            return (
              <label key={el} className="text-base flex">
                <input
                  type="radio"
                  value={el}
                  name="duration"
                  defaultChecked={el === animSelected}
                  className={radioStyle}
                />
                {el + 's'}
              </label>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-8 col-span-2">
        <h2 className="text-xl font-bold">Number of Dice</h2>
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <input
              type="range"
              name="diceNum"
              min="1"
              max="6"
              defaultValue={numSelected}
              style={{
                backgroundSize: `${
                  ((numSelected - RANGE_MIN) * 100) / (RANGE_MAX - RANGE_MIN)
                }% 100%`
              }}
              onChange={e => handleNumChange(e)}
            />
          </div>
          <div className="flex justify-center">
            <label className="text-lg font-bold col-span-1">
              {numSelected}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
