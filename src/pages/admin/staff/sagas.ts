import { put } from 'redux-saga/effects'
import * as types from './actions'
import { del, get, post, puts } from '../../../utils/http'
import { STAFFLIST } from "../../../common/api";


function* delStaff(action: any) {
  try {
    console.log('删除员工sa®ga执行')
    const result = yield del(`${action.url}/${action.data}`)
    console.log(result)
    if (result.status) {
      console.log('发送删除成功saga')
      yield put({ type: types.DELSUCCESS, data: result })
      console.log('删除员工成功')
      yield put({ type: types.GETLIST, url: STAFFLIST })
    } else {
      yield put({ type: types.DELERROR, data: result })
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* addStaff(action: any) {
  try {
    console.log('新增员工saga执行')
    const result = yield post({
      url: action.url
    }, action.data)
    console.log(result)
    if (result.status && result.status !== -7) {
      yield put({ type: types.ADDSUCCESS, data: result })
      console.log('添加员工成功')
      yield put({ type: types.GETLIST, url: STAFFLIST })
      console.log('发送了获取列表的请求')
    } else {
      console.log('发送了添加错误的action')
      yield put({ type: types.ADDERROR, data: result })
    }
  } catch (e) {
    // todo 网络错误提示
    // yield put({type: types.NETERROR})
  }
}

function* togglePage(action: any) {
  try {
    console.log('切换，列表页面saga执行')
    const result = yield get(action.url, action.data)
    if (result.meta.status === 200) {
      yield put({ type: types.TOGGLED, data: result })
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* editStaff(action: any) {
  try {
    console.log('修改saga执行')
    const result = yield puts({
      url: action.url
    }, action.data)
    if (result.meta.status === 200) {
      console.log('修改员工成功')
      yield put({ type: types.EDITSUCCESS, data: result })
      yield put({ type: types.GETLIST, url: STAFFLIST })
      console.log('发送了获取列表的请求')
    }
  } catch (e) {

  }
}

export { types, delStaff, addStaff, togglePage, editStaff };
