import { put } from 'redux-saga/effects'
import * as types from './action'
import { get } from '../../../../utils/http'


function* toggleCusPage(action: any) {
  try {
    console.log('切换，列表页面saga执行')
    const result = yield get(action.url, action.data)
    // const cate_result = yield get(CUSCATELIST_URL)
    console.log(result)
    //console.log(cate_result)
    if (result.meta.status === 200) {
      yield put({ type: types.WGETCUSLISTSUC, data: result })
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}


export { types, toggleCusPage };
