/*
* @name: saga总监听文件
* @description: 此文件在程序中注入中间件，用于各个文件的saga监听，并执行其相关的action
* @author: 陈相材
* @time: 2020-12-15 20:57:36
*/
import { takeEvery } from 'redux-saga/effects'
import { sagas as login } from '../pages/login'
import { sagas as staff } from '../pages/admin/staff'
import { sagas as dish } from "../pages/admin/dish";
import { sagas as category } from "../pages/admin/category";
import { sagas as cusCate } from '../pages/admin/customer/cate'
import { sagas as cusList } from '../pages/admin/customer/list'
import { sagas as order } from '../pages/admin/order'

const { TOLOGIN } = login.types;
const { GETLIST, ADDSTAFF, TOGGLEPAGE, DELSTAFF, EDITSTAFF } = staff.types;
const { GETDISHLIST, ADDDISH, DELDISH, EDITDISH } = dish.types
const { GETCATELISTS, CATEADD, CATEEDIT, CATEDEL } = category.types
const { GETCUSCATELIST, CUSCATEADD, CUSCATEEDIT, CUSCATEDEL } = cusCate.types
const { GETCUSLIST, CUSADD, CUSEDIT, CUSDEL } = cusList.types
const { GETORDERLIST, ORDERADD, ORDERDEL, ORDEREDIT } = order.types

function* sagas() {
  console.log('saga总监听执行')
  // 登录
  yield takeEvery(TOLOGIN, login.action);

  // 员工
  yield takeEvery(ADDSTAFF, staff.addStaff)
  yield takeEvery(TOGGLEPAGE, staff.togglePage)
  yield takeEvery(GETLIST, staff.togglePage);
  yield takeEvery(DELSTAFF, staff.delStaff)
  yield takeEvery(EDITSTAFF, staff.editStaff)

  // 菜品
  yield takeEvery(GETDISHLIST, dish.toggleDishPage)
  yield takeEvery(ADDDISH, dish.addDish)
  yield takeEvery(DELDISH, dish.delDish)
  yield takeEvery(EDITDISH, dish.editDish)

  // 菜品分类
  yield takeEvery(GETCATELISTS, category.toggleCatePage)
  yield takeEvery(CATEADD, category.addCate)
  yield takeEvery(CATEEDIT, category.editCate)
  yield takeEvery(CATEDEL, category.delCate)

  //会员分类
  yield takeEvery(GETCUSCATELIST, cusCate.toggleCusCatePage)
  yield takeEvery(CUSCATEADD, cusCate.addCusCate)
  yield takeEvery(CUSCATEEDIT, cusCate.editCusCate)
  yield takeEvery(CUSCATEDEL, cusCate.delCusCate)

  //会员
  yield takeEvery(GETCUSLIST, cusList.toggleCusPage)
  yield takeEvery(CUSADD, cusList.addCus)
  yield takeEvery(CUSEDIT, cusList.editCus)
  yield takeEvery(CUSDEL, cusList.delCus)

  //订单
  yield takeEvery(GETORDERLIST, order.toggleOrderPage)
  yield takeEvery(ORDERDEL, order.delOrder)
  yield takeEvery(ORDERADD, order.addOrder)
  yield takeEvery(ORDEREDIT, order.editOrder)

}

export default sagas;
