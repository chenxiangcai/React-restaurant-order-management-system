import { put } from 'redux-saga/effects'
import * as types from './action'
import { get, post, puts, del } from '../../../utils/http'
import { CATELIST_URL, GETCATELIST_URL } from "../../../common/api";


function* delCate(action: any) {
  try {
    console.log('删除菜品saga执行')
    const result = yield del(`${action.url}/${action.data}`)
    if (result.status === 200) {
      console.log('发送菜品删除成功saga')
      yield put({ type: types.CATEDELSUC, data: result })
      console.log('删除菜品成功')
      yield put({ type: types.GETCATELISTS, url: CATELIST_URL })
      console.log('发送了获取列表的请求')
    } else {
      yield put({ type: types.CATEDELERR, data: result })
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* addCate(action: any) {
  try {
    console.log('新增分类saga执行')
    const result = yield post({
      url: action.url
    }, action.data)
    console.log(result)
    if (result.status && result.status !== -7) {
      yield put({ type: types.CATEADDSUC, data: result })
      console.log('添加菜品成功')
      yield put({ type: types.GETCATELISTS, url: GETCATELIST_URL })
      console.log('发送了获取列表的请求')
    } else {
      console.log('发送了添加错误的action')
      yield put({ type: types.CATEADDERR, data: result })
    }
  } catch (e) {
    // todo 网络错误提示
    // yield put({type: types.NETERROR})
  }
}

function* toggleCatePage(action: any) {
  try {
    console.log('分类列表页面saga执行')
    const result = yield get(action.url, action.data)
    console.log(result)
    if (result.meta.status === 200) {
      console.log('分类列表获取成功')
      yield put({ type: types.GETCATELISTSUC, data: result })
      console.log('发送了分类列表获取成功')
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* editCate(action: any) {
  try {
    console.log('修改菜品信息saga执行')
    const result = yield puts({
      url: action.url
    }, action.data)
    if (result.meta.status === 200) {
      console.log('修改菜品成功')
      yield put({ type: types.CATEEDITSUC, data: result })
      yield put({ type: types.GETCATELISTS, url: CATELIST_URL })
      console.log('发送了获取列表的请求')
    }
  } catch (e) {

  }
}

export { types, toggleCatePage, addCate, editCate, delCate };
