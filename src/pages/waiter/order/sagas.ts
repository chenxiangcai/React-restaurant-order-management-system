import { put } from 'redux-saga/effects'
import * as types from './actions'
import { get, post, puts } from '../../../utils/http'
import { CORDERLIST_URL, WDISH_URL } from "../../../common/api";


function* getOrderList(action: any) {
  console.log('getOrder')
  try {
    console.log('列表页面saga执行')
    const result = yield get(action.url, action.data)
    const dishlist = yield get(`${WDISH_URL}`)
    if (result.meta.status === 200 && dishlist.meta.status) {
      yield put({
        type: types.WGETORDERLISTSUC, data: {
          result,
          dishlist
        }
      })
      console.log('发送了获取列表的请求')
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* updateOrder(action: any) {
  try {
    console.log('修改saga执行')
    const result = yield puts({
      url: action.url
    }, action.data)
    if (result.meta.status === 200) {
      console.log('修改成功')
      yield put({ type: types.WORDEREDITSUC, data: result })
      yield put({ type: types.WGETORDERLIST, url: CORDERLIST_URL })
      console.log('发送了获取列表的请求')
    }
  } catch (e) {

  }
}

function* addDish(action: any) {
  try {
    console.log('新增saga执行')
    const result = yield post({
      url: action.url
    }, action.data)
    if (result.status) {
      yield put({ type: types.WORDERADDSUC, data: result })
      console.log('添加菜品成功')
      yield put({ type: types.WGETORDERLIST, url: CORDERLIST_URL })
      console.log('发送了获取列表的请求')
    } else {
    }
  } catch (e) {
  }
}

export { types, updateOrder, getOrderList, addDish };
