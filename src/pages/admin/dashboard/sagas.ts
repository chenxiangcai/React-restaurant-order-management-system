import { put } from 'redux-saga/effects'
import * as types from './actions'
import { del, get, post, puts } from '../../../utils/http'
import { DASHBOARD_URL } from "../../../common/api";


function* getDetail(action: any) {
  try {
    console.log('数据看板页面saga执行')
    const result = yield get(action.url, action.data)
    console.log(result)
    //console.log(cate_result)
    if (result.meta.status === 200) {
      yield put({ type: types.GETDASHBOARDSUC, data: result })
      console.log('发送了获取列表的请求')
      //yield put({ type: types.GETORDERLIST, data: cate_result })
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}


export { types, getDetail };
