import {put} from 'redux-saga/effects'
import * as types from './actions'
import {del, get, post, puts} from '../../../utils/http'
import {CATELIST_URL, DISHLIST} from "../../../common/api";


function* delDish(action: any) {
    try {
        console.log('删除菜品saga执行')
        const result = yield del(`${action.url}/${action.data}`)
        if (result.status === 200) {
            console.log('发送菜品删除成功saga')
            yield put({type: types.DELDISHSUC, data: result})
            console.log('删除菜品成功')
            yield put({type: types.GETDISHLIST, url: DISHLIST})
            console.log('发送了获取列表的请求')
        } else {
            yield put({type: types.DELDISHERR, data: result})
        }
    } catch (e) {
        // yield put({type: types.NETERROR})
    }
}

function* addDish(action: any) {
    try {
        console.log('新增菜品saga执行')
        const result = yield post({
            url: action.url
        }, action.data)
        console.log(result)
        if (result.status && result.status !== -7) {
            yield put({type: types.ADDDISHSUC, data: result})
            console.log('添加菜品成功')
            yield put({type: types.GETDISHLIST, url: DISHLIST})
            console.log('发送了获取列表的请求')
        } else {
            console.log('发送了添加错误的action')
            yield put({type: types.ADDDISHERR, data: result})
        }
    } catch (e) {
        // todo 网络错误提示
        // yield put({type: types.NETERROR})
    }
}

function* toggleDishPage(action: any) {
    try {
        console.log('菜品列表页面saga执行')
        const result = yield get(action.url, action.data)
        const cate_result = yield get(CATELIST_URL)
        if (result.meta.status === 200) {
            console.log('菜品列表获取成功')
            yield put({type: types.GETCATELIST, data: result})
            console.log('发送了获取分类列表')
            yield put({type: types.GETSUCCESS, data: result})
            console.log('发送获取成功')
        } else {
            // yield put({type: types.GETFAILED, data: result})
        }
        if (cate_result.meta.status === 200) {
            console.log('分类获取成功')
            yield put({type: types.GETCATELISTSUCCESS, data: cate_result})
        } else {
            // yield put({type: types.GETFAILED, data: result})
        }
    } catch (e) {
        // yield put({type: types.NETERROR})
    }
}

function* editDish(action: any) {
    try {
        console.log('修改菜品信息saga执行')
        const result = yield puts({
            url: action.url
        }, action.data)
        if (result.meta.status === 200) {
            console.log('修改菜品成功')
            yield put({type: types.EDITDISHDISHSUC, data: result})
            yield put({type: types.GETDISHLIST, url: DISHLIST})
            console.log('发送了获取列表的请求')
        }
    } catch (e) {

    }
}

export {types, toggleDishPage, addDish, delDish, editDish};
