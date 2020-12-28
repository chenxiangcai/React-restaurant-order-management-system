import {put} from 'redux-saga/effects'
import * as types from './actions'
import {get, post} from '../../../utils/http'
import {STAFFLIST} from "../../../common/api";


function* getStaffList(action: any) {
    try {
        console.log('员工列表saga执行')
        const result = yield get(action.url)
        if (result.meta.status === 200) {
            yield put({type: types.GETSUCCESS, data: result})
        } else {
            yield put({type: types.GETFAILED, data: result})
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
        if (result.status && result.status !== -1) {
            yield put({type: types.ADDSUCCESS, data: result})
            console.log('添加员工成功')
            yield put({type: types.GETLIST,url:STAFFLIST})
            console.log('发送了获取列表的请求')
        } else {
            console.log('发送了添加错误的action')
            yield put({type: types.ADDERROR, data: result})
        }
    } catch (e) {
        // todo 网络错误提示
        // yield put({type: types.NETERROR})
    }
}

function* togglePage(action: any) {
    try {
        console.log('切换页面saga执行')
        const result = yield get(action.url, action.data)
        if (result.meta.status === 200) {
             yield put({type: types.TOGGLED, data: result})
        } else {
            // yield put({type: types.GETFAILED, data: result})
        }
    } catch (e) {
        // yield put({type: types.NETERROR})
    }
}

export {types, getStaffList, addStaff, togglePage};
