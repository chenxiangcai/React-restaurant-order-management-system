/*
* @name: 登录页的saga监听
* @description: 监听匹配dispatch的action
* @author: 陈相材
* @time: 2020-12-15 21:04:29
*/
import { put } from "redux-saga/effects";
import * as types from "./actions";
import { post } from "../../utils/http";

function* toLogin(action: any) {
  try {
    console.log('登陆页saga执行')
    //console.log(yield select())
    const result = yield post({
      url: action.url
    }, action.data);
    console.log(result)

    // if (result.meta.status === 200) {
    //     const { role } = result.userInfo
    //     switch (role) {
    //         case 'admin':
    //             yield put({ type: types.SUCCESSLOGIN, data: result });
    //             break;
    //         case 'chef':
    //             yield put({ type: types.CHEFLOGINSUC, data: result });
    //             break;
    //         case 'waiter':
    //             yield put({ type: types.WAITERLOGINSUC, data: result });
    //             break
    //         default:
    //             return {}
    //     }
    // }


    if (result.meta.status === 200) {
      //命令 middleware 向 Store 发起一个 action
      yield put({ type: types.SUCCESSLOGIN, data: result });
    } else {
      // 发送一个登录失败的action
      yield put({ type: types.ERRORLOGIN })
    }
  } catch (e) {
    yield put({ type: types.NETERROR })
  }
}

export { types, toLogin };
