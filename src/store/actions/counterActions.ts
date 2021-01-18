import {InferActionsTypes} from '../store'
import {ICurrentValue, ISettingsValue} from '../../entities/entities'

export type CounterActionType = InferActionsTypes<typeof counterActions>

export const counterActions = {
  changeNumber: (data: ICurrentValue) => ({type: 'SET-NUMBER', payload: data} as const),
  getSettings: (data: ISettingsValue) => ({type: 'GET-SETTINGS', payload: data} as const),
  setSettings: (data: ISettingsValue) => ({type: 'SET-SETTINGS', payload: data} as const)
}


