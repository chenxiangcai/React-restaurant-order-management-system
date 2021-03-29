import { put } from 'redux-saga/effects'
import * as types from './action'
import { get } from '../../../utils/http'
import { ORDERLIST_URL } from "../../../common/api";

function* getQR(action: any) {
  try {
    console.log('获取QR saga执行')
    const result = yield get(action.url)
    console.log(result)
    if (result.meta.status === 200) {
      yield put({ type: types.GETQRCODESUC, data: result })
      console.log('发送了获取列表的请求')
      //yield put({ type: types.GETORDERLIST, data: cate_result })
    } else {
      yield put({ type: types.GETQRCODEERR, data: result })
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}


export { types, getQR };
