import React from 'react'
import s from './Display.module.css'

interface Props {
  currentValue: number | string,
  classForSet: boolean,
  settings: boolean,
  maxValue: number
}

const Display = (props: Props) => {
  let counterClass = props.currentValue === props.maxValue ? s.classForMax : s.normalDisplay
  let settingsClass = props.classForSet ? s.classForError :  s.normalText

  return (
    <div className={s.display}>
      <div className={props.settings?settingsClass:counterClass}>
        {props.currentValue}
      </div>
    </div>
  )
}

export default Display
