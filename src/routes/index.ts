/*
* @name: 路由模块
* @description: 配置主路由和后台管理路由
* @author: 陈相材
* @time: 2020-12-17 21:44:27
*/
import { Login } from "../pages/login";
import { Dashboard } from "../pages/admin/dashboard/";
import { Staff } from "../pages/admin/staff";
import { Dish } from "../pages/admin/dish";
import { Category } from "../pages/admin/category";
import { CusCate } from "../pages/admin/customer/cate";
import { CusList } from "../pages/admin/customer/list";
import { Order } from "../pages/admin/order";

// 普通路由
export const normalRoute = [{
  path: '/login',
  component: Login
}]
// 管理员路由
export const adminRoute = [{
  path: '/admin/dashboard',
  component: Dashboard,
  exact: true
}, {
  path: '/admin/staffs',
  component: Staff,
  exact: true
}, {
  path: '/admin/dishes',
  component: Dish,
  exact: true
}, {
  path: '/admin/dishes/category',
  component: Category,
  exact: true
}, {
  path: '/admin/customer/cate',
  component: CusCate,
  exact: true
}, {
  path: '/admin/customer',
  component: CusList,
  exact: true
}, {
  path: '/admin/orders',
  component: Order,
  exact: true
}]
