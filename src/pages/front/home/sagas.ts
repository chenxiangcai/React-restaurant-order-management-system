import { put } from 'redux-saga/effects'
import * as types from './actions'
import { get } from '../../../utils/http'
import { HOMEDISHCATE_URL } from "../../../common/api";

function* GetHomeDish(action: any) {
  try {
    console.log('菜品列表页面saga执行')
    const result = yield get(action.url, action.data)
    const cate_result = yield get(HOMEDISHCATE_URL)
    if (result.meta.status === 200) {
      console.log('菜品列表获取成功')
      yield put({ type: types.GETHDISHSUC, data: result })
      console.log('发送获取成功')
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
    if (cate_result.meta.status === 200) {
      console.log('分类获取成功')
      yield put({ type: types.GETHCATESUC, data: cate_result })
    } else {
      // yield put({type: types.GETFAILED, data: result})
    }
  } catch (e) {
    // yield put({type: types.NETERROR})
  }
}

function* addtocar(action: any) {
  yield put({ type: types.ADD2CAR, data: action })
}

function* resetcar(action: any) {
  yield put({ type: types.RESETCAR, data: action })
}

function* lesstocar(action: any) {
  console.log('saga', action)
  yield put({ type: types.LESS2CAR, data: action })
}

export { types, GetHomeDish, addtocar, resetcar, lesstocar };
