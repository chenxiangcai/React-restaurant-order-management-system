import { put } from 'redux-saga/effects'
import * as types from './action'
import { get, post } from '../../../../utils/http'
import { WCUSLIST_URL } from "../../../../common/api";


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

function* addCus(action: any) {
  try {
    console.log('新增saga执行')
    const result = yield post({
      url: action.url
    }, action.data)
    console.log(result)
    if (result.status && result.status !== -7) {
      yield put({ type: types.WCUSADDSUC, data: result })
      console.log('添加成功')
      yield put({ type: types.WGETCUSLIST, url: WCUSLIST_URL })
      console.log('发送了获取列表的请求')
    } else {
      console.log('发送了添加错误的action')
      yield put({ type: types.WCUSADDERR, data: result })
    }
  } catch (e) {
    // todo 网络错误提示
    // yield put({type: types.NETERROR})
  }
}


export { types, toggleCusPage, addCus };
