import {call, put} from 'redux-saga/effects'
import {counterActions, CounterActionType} from '../actions/counterActions'
import {api} from '../../api/api'
import {ICurrentValue, ISettingsValue} from '../../entities/entities'

const initialState = {
  currentValue: 0,
  startValue: 0,
  maxValue: 0
}
type InitialStateType = typeof initialState

export const counterReducer = (state = initialState, action: CounterActionType): InitialStateType => {
  switch (action.type) {
    case 'SET-NUMBER' :
    case 'GET-SETTINGS' :
    case 'SET-SETTINGS' :
      return {
        ...state, ...action.payload
      }
    default:
      return state
  }
}

export const getSettings = () => ({type: 'SETTINGS-QUERY'})
export const changeNumber = (data: ICurrentValue) => ({type: 'CHANGE-NUMBER', payload: data})
export const changeSettings = (data: ISettingsValue) => ({type: 'CHANGE-SETTINGS', payload: data})

export function* getSettingsWorkerSaga() {
  const res = yield call(api.getCurrentSettings)
  yield put(counterActions.getSettings(res))
}

export function* changeNumberWorkerSaga(action: ReturnType<typeof changeNumber>) {
  const res = yield call(api.changeCurrentValue, action.payload)
  yield put(counterActions.changeNumber(res))
}

export function* setSettingsWorkerSaga(action:  ReturnType<typeof changeSettings>) {
  const res = yield call(api.changeSettings, action.payload)
  yield put(counterActions.setSettings(res))
}



