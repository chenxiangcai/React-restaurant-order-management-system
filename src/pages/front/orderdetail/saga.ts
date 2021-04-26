import { put } from 'redux-saga/effects'
import * as types from './action'
import { post } from '../../../utils/http'

function* isCus(action: any) {
  try {
    const result = yield post({ url: action.url }, { telephone: action.data })
    console.log('result', result)
    if (result.meta.status === 200) {
      yield put({ type: types.ISCUSSUC, data: result })
    }
  } catch (e) {
    yield put({ type: types.ISCUSERR })
  }
}

export { types, isCus };
