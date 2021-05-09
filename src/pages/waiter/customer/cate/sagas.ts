import { put } from 'redux-saga/effects'
import * as types from './action'
import { get } from '../../../../utils/http'

function* toggleCusCatePage(action: any) {
  try {
    console.log('切换，列表页面saga执行')
    const result = yield get(action.url, action.data)
    if (result.meta.status === 200) {
      yield put({ type: types.WGETCUSCATELISTSUC, data: result })
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

export { types, toggleCusCatePage };
