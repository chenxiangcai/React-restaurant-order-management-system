import { put } from 'redux-saga/effects'
import * as types from './action'
import { del, get, post, puts } from '../../../../utils/http'
import { CUSCATELIST_URL } from "../../../../common/api";


function* delCusCate(action: any) {
  try {
    console.log('删除saga执行')
    const result = yield del(`${action.url}/${action.data}`)
    console.log(result)
    if (result.status === 200) {
      console.log('发送删除成功saga')
      yield put({ type: types.CUSCATEDELSUC, data: result })
      console.log('删除成功')
      yield put({ type: types.GETCUSCATELIST, url: CUSCATELIST_URL })
    } else {
      yield put({ type: types.CUSCATEDELERR, data: result })
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* addCusCate(action: any) {
  try {
    console.log('新增saga执行')
    const result = yield post({
      url: action.url
    }, action.data)
    console.log(result)
    if (result.status && result.status !== -7) {
      yield put({ type: types.CUSCATEADDSUC, data: result })
      console.log('添加成功')
      yield put({ type: types.GETCUSCATELIST, url: CUSCATELIST_URL })
      console.log('发送了获取列表的请求')
    } else {
      console.log('发送了添加错误的action')
      yield put({ type: types.CUSCATEADDERR, data: result })
    }
  } catch (e) {
    // todo 网络错误提示
    // yield put({type: types.NETERROR})
  }
}

function* toggleCusCatePage(action: any) {
  try {
    console.log('切换，列表页面saga执行')
    const result = yield get(action.url, action.data)
    if (result.meta.status === 200) {
      yield put({ type: types.GETCUSCATELISTSUC, data: result })
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* editCusCate(action: any) {
  try {
    console.log('修改saga执行')
    const result = yield puts({
      url: action.url
    }, action.data)
    if (result.meta.status === 200) {
      console.log('修改成功')
      yield put({ type: types.CUSCATEEDITSUC, data: result })
      yield put({ type: types.GETCUSCATELIST, url: CUSCATELIST_URL })
      console.log('发送了获取列表的请求')
    }
  } catch (e) {

  }
}

export { types, editCusCate, addCusCate, toggleCusCatePage, delCusCate };
