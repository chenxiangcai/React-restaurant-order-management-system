import { put } from 'redux-saga/effects'
import * as types from './action'
import { del, get, post, puts } from '../../../utils/http'
import { STAFFLIST, TABLE_URL } from "../../../common/api";

function* getQR(action: any) {
  try {
    console.log('获取QR saga执行')
    const result = yield get(`${action.url}/${action.data}`)
    console.log(result)
    if (result.meta.status === 200) {
      yield put({ type: types.GETQRCODESUC, data: result })
      //yield put({ type: types.GETORDERLIST, data: cate_result })
    } else if (result.meta.status === 201) {
      yield put({ type: types.GETARRAYQRCODESUC, data: result })
    } else {
      yield put({ type: types.GETQRCODEERR, data: result })
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* getTable(action: any) {
  try {
    console.log('获取table saga执行')
    const result = yield get(action.url)
    console.log(result)
    const staff = yield get(STAFFLIST)
    //处理员工格式
    const staffs = staff.user.records.map((val: any) => {
      return {
        name: val.name,
        _id: val._id
      }
    })
    yield put({ type: types.GETTSTAFFSUC, data: staffs })
    if (result.meta.status === 200) {
      yield put({ type: types.GETTABLESUC, data: result })
      //yield put({ type: types.GETORDERLIST, data: cate_result })
    } else {
      yield put({ type: types.GETTABLEERR, data: result })
    }

  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* addTable(action: any) {
  try {
    console.log('新增餐桌saga执行')
    console.log(action)
    const result = yield post({
      url: action.url
    }, action.data)
    console.log(result)
    if (result.status && result.status !== -1) {
      yield put({ type: types.ADDTABLESUC, data: result })
      yield put({ type: types.GETTABLE, url: TABLE_URL })
    } else {
      yield put({ type: types.ADDTABLEERR, data: result })
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* editTable(action: any) {
  try {
    console.log('修改saga执行')
    const result = yield puts({
      url: action.url
    }, action.data)
    if (result.meta.status === 200) {
      yield put({ type: types.EDITTABLESUC, data: result })
      yield put({ type: types.GETTABLE, url: TABLE_URL })
      console.log('发送了获取列表的请求')
    } else {
      yield put({ type: types.EDITTABLEERR, data: result })

    }
  } catch (e) {

  }
}


function* delTable(action: any) {
  try {
    console.log('删除saga执行')
    const result = yield del(`${action.url}/${action.data}`)
    console.log(result)
    if (result.status === 200) {
      yield put({ type: types.DELTABLESUC, data: result })
      console.log('删除成功')
      yield put({ type: types.GETTABLE, url: TABLE_URL })
      console.log('发送了获取列表的请求')
    } else {
      yield put({ type: types.DELTABLEERR, data: result })
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

export { types, getQR, getTable, addTable, editTable, delTable };
