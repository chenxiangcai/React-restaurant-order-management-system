import { put } from 'redux-saga/effects'
import * as types from './actions'
import { get, puts } from '../../utils/http'
import { CORDERLIST_URL } from "../../common/api";


function* GetOrder(action: any) {
  console.log('getOrder')
  try {
    console.log('列表页面saga执行')
    const result = yield get(action.url, action.data)
    if (result.meta.status === 200) {
      yield put({ type: types.CGETORDERLISTSUC, data: result })
      console.log('发送了获取列表的请求')
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* UpdateOrder(action: any) {
  try {
    console.log('修改saga执行')
    const result = yield puts({
      url: action.url
    }, action.data)
    if (result.meta.status === 200) {
      console.log('修改成功')
      yield put({ type: types.CORDEREDITSUC, data: result })
      yield put({ type: types.CGETORDERLIST, url: CORDERLIST_URL })
      console.log('发送了获取列表的请求')
    }
  } catch (e) {

  }
}

export { types, UpdateOrder, GetOrder };
