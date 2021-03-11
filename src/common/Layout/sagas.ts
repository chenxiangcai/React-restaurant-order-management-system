import { put } from 'redux-saga/effects'
import * as types from './actions'
import { post } from '../../utils/http'


function* editInfo(action: any) {
  try {
    console.log('修改个人信息saga执行')
    const result = yield post({
      url: action.url
    }, action.data)
    console.log(result)
    //console.log(cate_result)
    if (result.message==='密码修改成功') {
      console.log(1)
      yield put({ type: types.EDITUSERINFOSUC, data: result })
      //yield put({ type: types.GETORDERLIST, data: cate_result })
    } else {
      console.log(2)
      yield put({type: types.EDITUSERINFOERR, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}


export { types, editInfo };
