/*
* @name: 路由集合
* @description: 一级路由集合
* @author: 陈相材
* @time: 2020-12-14 19:49:21
*/
export = app => {
    app.use('/admin/*',require('./guard')) //权限拦截

    app.use('/admin/staff', require('./staff')) //用户二级路由
    app.use('/admin/dish', require('./dish')) //菜品
    app.use('/admin/category', require('./category')) //分类


    app.post('/login', require('./admin/login')) //用户登录

    app.post('/upload', require('./admin/upload')) //图片上传
}
