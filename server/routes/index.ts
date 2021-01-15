/*
* @name: 路由集合
* @description: 一级路由集合
* @author: 陈相材
* @time: 2020-12-14 19:49:21
*/
export = app => {
    app.use('/staff', require('./staff')) // 用户二级路由
    app.use('/dish', require('./dish')) // 菜品
    app.use('/category', require('./category')) // 分类


    app.post('/login', require('./login')) // 用户登录

}
