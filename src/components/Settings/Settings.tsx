import React, {ChangeEvent} from 'react'
import s from './Settings.module.css'

interface Props {
  startValue: number
  maxValue: number
  classForSet: boolean
  onSetStartValue: (e: ChangeEvent<HTMLInputElement>) => void
  onSetMaxValue: (e: ChangeEvent<HTMLInputElement>) => void
  addNewSettings: () => void
}

const Settings = (props: Props) => {

  return (
    <div className={s.btn_container}>
     <span className={s.field}>
       StartValue: <input className={s.input}
                          onChange={props.onSetStartValue}
                          type={'number'}
                          value={props.startValue}/>
             </span>
      <span className={s.field}>
        MaxValue: <input className={s.input}
                         onChange={props.onSetMaxValue}
                         type={'number'}
                         value={props.maxValue}/>
      </span>
      <button className={'btn'} onClick={props.addNewSettings} disabled={props.classForSet}>
        Save
      </button>
    </div>
  )
}

export default Settings
