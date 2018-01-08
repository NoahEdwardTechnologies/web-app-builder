/* eslint-disable */
// checkout https://github.com/redux-saga/redux-saga/blob/master/docs/introduction/BeginnerTutorial.md

import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export default function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
