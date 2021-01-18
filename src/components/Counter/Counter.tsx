import React from 'react'
import s from './Counter.module.css'

interface Props {
  currentValue: number,
  startValue: number
  maxValue: number
  changeValue: (number: number) => void
  onResetPush: () => void
  onSetPush: () => void
}

const Counter = (props: Props) => {

  return (
    <div className={s.btn_container}>
      <button disabled={props.currentValue === props.maxValue}
              className={'btn'}
              onClick={() => props.changeValue(+1)}
      >
        {props.currentValue === props.maxValue ? 'Max' : `+1 (${props.currentValue + 1})`}
      </button>
      <button disabled={props.currentValue === props.startValue}
              className={'btn'}
              onClick={() => props.changeValue(-1)}
      >
        {props.currentValue === props.startValue ? 'Min' : `-1 (${props.currentValue - 1})`}
      </button>
      <button disabled={props.currentValue === props.startValue} className={'btn'} onClick={props.onResetPush}>
        Reset
      </button>
      <button className={'btn'} onClick={props.onSetPush}>
        Settings
      </button>
    </div>
  )
}

export default Counter
