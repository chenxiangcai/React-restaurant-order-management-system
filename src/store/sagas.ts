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
import { sagas as dashboard } from '../pages/admin/dashboard'
import { sagas as topBarEditInfo } from '../common/Layout'
import { sagas as table } from '../pages/admin/table'
import { sagas as home } from '../pages/front/home'
import { sagas as orderdetail } from '../pages/front/orderdetail'
import { sagas as shopCar } from '../pages/front/shopcar'
import { sagas as chef } from '../pages/chef'
import { sagas as searchPage } from '../pages/front/search'
import { sagas as waiterOrder } from '../pages/waiter/order'
import { sagas as waiterTable } from '../pages/waiter/table'
import { sagas as wcuslist } from '../pages/waiter/customer/list'
import { sagas as wcuscate } from '../pages/waiter/customer/cate'


const { TOLOGIN } = login.types;
const { GETLIST, ADDSTAFF, TOGGLEPAGE, DELSTAFF, EDITSTAFF } = staff.types;
const { GETDISHLIST, ADDDISH, DELDISH, EDITDISH } = dish.types
const { GETCATELISTS, CATEADD, CATEEDIT, CATEDEL } = category.types
const { GETCUSCATELIST, CUSCATEADD, CUSCATEEDIT, CUSCATEDEL } = cusCate.types
const { GETCUSLIST, CUSADD, CUSEDIT, CUSDEL } = cusList.types
const { GETORDERLIST, ORDERDEL } = order.types
const { GETDASHBOARD } = dashboard.types
const { EDITUSERINFO } = topBarEditInfo.types
const { GETQRCODE, GETTABLE, ADDTABLE, EDITTABLE, DELTABLE } = table.types
const { GETHDISH } = home.types
const { ISCUS } = orderdetail.types
const { CUSORDERADD, CUSOREDEREDIT } = shopCar.types
const { CGETORDERLIST, CORDEREDIT } = chef.types
const { SEARCHDISH } = searchPage.types
const { WGETORDERLIST, WORDEREDIT, WORDERADD } = waiterOrder.types
const { WGETTABLE, WGETQRCODE } = waiterTable.types
const { WGETCUSCATELIST } = wcuscate.types
const { WGETCUSLIST, WCUSADD } = wcuslist.types


function* sagas() {
  console.log('saga总监听执行')
  // 登录
  yield takeEvery(TOLOGIN, login.toLogin);

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
  yield takeEvery(WGETCUSCATELIST, wcuscate.toggleCusCatePage)
  yield takeEvery(WGETCUSCATELIST, wcuscate.toggleCusCatePage)
  yield takeEvery(WGETCUSLIST, wcuslist.toggleCusPage)


  //会员
  yield takeEvery(GETCUSLIST, cusList.toggleCusPage)
  yield takeEvery(CUSADD, cusList.addCus)
  yield takeEvery(CUSEDIT, cusList.editCus)
  yield takeEvery(CUSDEL, cusList.delCus)
  yield takeEvery(WCUSADD, wcuslist.addCus)


  //订单
  yield takeEvery(GETORDERLIST, order.toggleOrderPage)
  yield takeEvery(ORDERDEL, order.delOrder)
  yield takeEvery(CUSORDERADD, shopCar.addOrder)
  yield takeEvery(CUSOREDEREDIT, shopCar.updateOrder)
  yield takeEvery(CGETORDERLIST, chef.GetOrder)
  yield takeEvery(CORDEREDIT, chef.UpdateOrder)
  yield takeEvery(WORDEREDIT, waiterOrder.updateOrder)
  yield takeEvery(WGETORDERLIST, waiterOrder.getOrderList)
  yield takeEvery(WORDERADD, waiterOrder.addDish)


  //看板
  yield takeEvery(GETDASHBOARD, dashboard.getDetail)

  //topBar修改个人信息
  yield takeEvery(EDITUSERINFO, topBarEditInfo.editInfo)

  //餐桌
  yield takeEvery(GETQRCODE, table.getQR)
  yield takeEvery(GETTABLE, table.getTable)
  yield takeEvery(ADDTABLE, table.addTable)
  yield takeEvery(EDITTABLE, table.editTable)
  yield takeEvery(DELTABLE, table.delTable)
  yield takeEvery(WGETTABLE, waiterTable.getTable)
  yield takeEvery(WGETQRCODE, waiterTable.getQR)


  /** 前台saga*/
  yield takeEvery(GETHDISH, home.GetHomeDish)
  yield takeEvery(ISCUS, orderdetail.isCus)
  yield takeEvery(SEARCHDISH, searchPage.searchDish)

}

export default sagas;
