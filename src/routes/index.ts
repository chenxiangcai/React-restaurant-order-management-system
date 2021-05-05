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
import { Home } from "../pages/front/home";
import { ShopCar } from "../pages/front/shopcar";
import { PreHome } from "../pages/front/prehome";
import { OrderDetail } from "../pages/front/orderdetail";
import { Table } from "../pages/admin/table";
import NotFound from "../pages/error/NotFound";
import NotAuth from "../pages/error/NotAuth";
import Waiter from "../pages/waiter/Waiter";
import Pay from "../pages/front/Pay";
import Chef from "../pages/chef/Chef";
import SearchPage from "../pages/front/search/SearchPage";

// 普通路由
export const normalRoute = [{
  path: '/',
  redirect: '/login',
  component: Login,
  exact: true
}, {
  path: '/home',
  component: Home,
  exact: true
},
  {
    path: '/home/shopcar',
    component: ShopCar,
    exact: true

  }, {
    path: '/prehome/:id',
    component: PreHome,
    exact: true
  }, {
    path: '/home/orderdetail/:type',
    component: OrderDetail,
    exact: true
  },
  {
    path: '/home/search',
    component: SearchPage,
    exact: true
  },
  {
    path: '/waiter',
    component: Waiter,
    exact: true
  },
  {
    path: '/notfound',
    component: NotFound,
    exact: true
  },
  {
    path: '/noauth',
    component: NotAuth,
    exact: true
  },
  {
    path: '/pay',
    component: Pay,
    exact: true
  }
]

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
}, {
  path: '/admin/table',
  component: Table,
  exact: true
}]

//厨师路由
export const chefRoute = [
  {
    path: '/chef/orders',
    component: Chef,
    exact: true
  },
]

//服务员路由
export const waiterRoute = [
  {
    path: '/waiter/orders',
    component: Waiter,
    exact: true
  },
]
