import { combineReducers } from "redux";
//引入各个组件的数据
import { reducers as login } from "../pages/login/";
import { reducers as staff } from '../pages/admin/staff/';
import { reducers as dish } from '../pages/admin/dish/'
import { reducers as cate } from '../pages/admin/category/'
import { reducers as cuscate } from '../pages/admin/customer/cate'
import { reducers as cus } from '../pages/admin/customer/list'
import { reducers as orders } from '../pages/admin/order/'
import { reducers as dashboard } from '../pages/admin/dashboard/'
// @ts-ignore
import { reducers as topBarEditInfo } from '../common/Layout'
import { reducers as setting } from '../pages/admin/setting'

// 数据整合导出
export default combineReducers({
  login, staff, dish, cate, cuscate, cus, orders, dashboard, topBarEditInfo, setting
});
