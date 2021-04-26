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
import { reducers as topBarEditInfo } from '../common/Layout'
import { reducers as table } from '../pages/admin/table'
import { reducers as home } from '../pages/front/home'
import { reducers as orderDetail } from '../pages/front/orderdetail'
import { reducers as shopCar } from '../pages/front/shopcar'


// 数据整合导出
export default combineReducers({
  login,
  staff,
  dish,
  cate,
  cuscate,
  cus,
  orders,
  dashboard,
  topBarEditInfo,
  table,
  home,
  orderDetail,
  shopCar
});
