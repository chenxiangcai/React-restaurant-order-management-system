/*
* @name: 路由模块
* @description: 配置主路由和后台管理路由
* @author: 陈相材
* @time: 2020-12-17 21:44:27
*/
import { lazy } from 'react'

// 普通路由
export const normalRoute = [{
  path: '/',
  redirect: '/login',
  component: lazy(() => import('../pages/login/Login')),
  exact: true
}, {
  path: '/home',
  component: lazy(() => import('../pages/front/home/Home')),
  exact: true
},
  {
    path: '/home/shopcar',
    component: lazy(() => import('../pages/front/shopcar/ShopCar')),
    exact: true

  }, {
    path: '/prehome/:id',
    component: lazy(() => import('../pages/front/prehome/PreHome')),
    exact: true
  }, {
    path: '/home/orderdetail/:type',
    component: lazy(() => import('../pages/front/orderdetail/OrderDetail')),
    exact: true
  },
  {
    path: '/home/search',
    component: lazy(() => import('../pages/front/search/SearchPage')),
    exact: true
  },
  {
    path: '/notfound',
    component: lazy(() => import('../pages/error/NotFound')),
    exact: true
  },
  {
    path: '/noauth',
    component: lazy(() => import('../pages/error/NotAuth')),
    exact: true
  },
  {
    path: '/pay',
    component: lazy(() => import('../pages/front/Pay')),
    exact: true
  }
]

// 管理员路由
export const adminRoute = [{
  path: '/admin/dashboard',
  component: lazy(() => import('../pages/admin/dashboard/Dashboard')),
  exact: true
}, {
  path: '/admin/staffs',
  component: lazy(() => import('../pages/admin/staff/Staff')),
  exact: true
}, {
  path: '/admin/dishes',
  component: lazy(() => import('../pages/admin/dish/Dish')),
  exact: true
}, {
  path: '/admin/dishes/category',
  component: lazy(() => import('../pages/admin/category/Category')),
  exact: true
}, {
  path: '/admin/customer/cate',
  component: lazy(() => import('../pages/admin/customer/cate/Cate')),
  exact: true
}, {
  path: '/admin/customer',
  component: lazy(() => import('../pages/admin/customer/list/CusList')),
  exact: true
}, {
  path: '/admin/orders',
  component: lazy(() => import('../pages/admin/order/Order')),
  exact: true
}, {
  path: '/admin/table',
  component: lazy(() => import('../pages/admin/table/Table')),
  exact: true
}]

//厨师路由
export const chefRoute = [
  {
    path: '/chef/orders',
    component: lazy(() => import('../pages/chef/Chef')),
    exact: true
  },
]

//服务员路由
export const waiterRoute = [
  {
    path: '/waiter/orders',
    component: lazy(() => import('../pages/waiter/order/WaiterOrder')),
    exact: true
  },
  {
    path: '/waiter/table',
    component: lazy(() => import('../pages/waiter/table/Table')),
    exact: true
  },
  {
    path: '/waiter/customer/cate',
    component: lazy(() => import('../pages/waiter/customer/cate/WCusCate')),
    exact: true
  },
  {
    path: '/waiter/customer',
    component: lazy(() => import('../pages/waiter/customer/list/CusList')),
    exact: true
  }
]
