/*
* @name: 路由集合
* @description: 一级路由集合
* @author: 陈相材
* @time: 2020-12-14 19:49:21
*/
module.exports = app => {
    // 用户登录
    app.post('/login', require('./login'))
}