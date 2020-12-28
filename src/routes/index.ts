/*
* @name: 路由模块
* @description: 配置主路由和后台管理路由
* @author: 陈相材
* @time: 2020-12-17 21:44:27
*/
import {Login} from "../pages/login";
import Dashboard from "../pages/admin/dashboard";
import {Staff} from "../pages/admin/staff";


export const normalRoute = [{
    path: '/login',
    component: Login
}]

export const adminRoute = [{
    path: '/admin/dashboard',
    component: Dashboard,
    exact: true
}, {
    path: '/admin/staffs',
    component: Staff,
    exact: true
}]
