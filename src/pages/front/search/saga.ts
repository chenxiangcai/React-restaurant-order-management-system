import { put } from 'redux-saga/effects'
import * as types from './action'
import { post } from '../../../utils/http'

function* searchDish(action: any) {
  try {
    const result = yield post({ url: action.url }, { name: action.data })
    console.log('result', result)
    if (result.meta.status === 200) {
      yield put({ type: types.SEARCHDISHSUC, data: result })
    }
  } catch (e) {
    yield put({ type: types.SEARCHDISHERR })
  }
}

export { types, searchDish };
