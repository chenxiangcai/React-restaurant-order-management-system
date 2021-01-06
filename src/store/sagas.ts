/*
* @name: saga总监听文件
* @description: 此文件在程序中注入中间件，用于各个文件的saga监听，并执行其相关的action
* @author: 陈相材
* @time: 2020-12-15 20:57:36
*/
import {takeEvery} from 'redux-saga/effects'
import {sagas as login} from '../pages/login'
import {sagas as staff} from '../pages/admin/staff'

let {TOLOGIN} = login.types;
let {GETLIST, ADDSTAFF, TOGGLEPAGE, DELSTAFF, EDITSTAFF} = staff.types;

function* sagas() {
    console.log('saga总监听执行')
    yield takeEvery(TOLOGIN, login.action);
    yield takeEvery(ADDSTAFF, staff.addStaff)
    yield takeEvery(TOGGLEPAGE, staff.togglePage)
    yield takeEvery(GETLIST, staff.togglePage);
    yield takeEvery(DELSTAFF, staff.delStaff)
    yield takeEvery(EDITSTAFF, staff.editStaff)
}

export default sagas;
