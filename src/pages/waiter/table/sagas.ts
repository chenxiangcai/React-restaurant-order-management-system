import { put } from 'redux-saga/effects'
import * as types from './action'
import { get } from '../../../utils/http'
import { WSTAFFLIST } from "../../../common/api";

function* getQR(action: any) {
  try {
    console.log('获取QR saga执行')
    const result = yield get(`${action.url}/${action.data}`)
    console.log(result)
    if (result.meta.status === 200) {
      yield put({ type: types.WGETQRCODESUC, data: result })
      //yield put({ type: types.GETORDERLIST, data: cate_result })
    } else if (result.meta.status === 201) {
      // yield put({ type: types.WGETARRAYQRCODESUC, data: result })
    } else {
      yield put({ type: types.WGETQRCODEERR, data: result })
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* getTable(action: any) {
  try {
    console.log('获取table saga执行')
    const result = yield get(action.url)
    console.log(7)
    // console.log(result)
    console.log(8)
    const staff = yield get(WSTAFFLIST)
    console.log(9)
    console.log(staff)
    console.log(10)
    //处理员工格式
    const staffs = staff.user.records.map((val: any) => {
      return {
        name: val.name,
        _id: val._id
      }
    })
    console.log(staffs)
    yield put({ type: types.WGETTSTAFFSUC, data: staffs })
    if (result.meta.status === 200) {
      console.log(11111)
      yield put({ type: types.WGETTABLESUC, data: result })
      //yield put({ type: types.GETORDERLIST, data: cate_result })
    } else {
      yield put({ type: types.WGETTABLEERR, data: result })
    }

  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

export { types, getQR, getTable };
