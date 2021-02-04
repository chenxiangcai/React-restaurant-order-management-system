import { combineReducers } from "redux";
//引入各个组件的数据
import { reducers as login } from "../pages/login/";
import { reducers as staff } from '../pages/admin/staff/';
import { reducers as dish } from '../pages/admin/dish/'
import { reducers as cate } from '../pages/admin/category/'
import { reducers as cuscate } from '../pages/admin/customer/cate'
// 数据整合导出
export default combineReducers({
  login, staff, dish, cate, cuscate
});
