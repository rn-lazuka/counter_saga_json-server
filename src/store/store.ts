import {createStore, applyMiddleware, Action} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'
import rootReducer, {RootState} from './reducers'
import {changeNumberWorkerSaga, getSettingsWorkerSaga, setSettingsWorkerSaga} from './reducers/counterReducer'

const initialState = {}
const sagaMiddleWare = createSagaMiddleware()
const middleware = [sagaMiddleWare]

const store = createStore(rootReducer, initialState, (applyMiddleware(...middleware)))

type PropertiesType<T> = T extends { [ket: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [ket: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

sagaMiddleWare.run(rootWatcher)

function* rootWatcher() {
  yield takeEvery('CHANGE-NUMBER', changeNumberWorkerSaga)
  yield takeEvery('SETTINGS-QUERY', getSettingsWorkerSaga)
  yield takeEvery('CHANGE-SETTINGS', setSettingsWorkerSaga)
}


export default store
