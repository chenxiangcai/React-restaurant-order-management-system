"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var formidable = require('express-formidable');
var path = require('path');
var expressWs = require('express-ws');
// 连接数据库
require('./model/connect.ts');
app.use(express.static(path.join(__dirname, 'public')));
// 设置跨域和相应数据格式
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization');
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    if (req.method == 'OPTIONS')
        res.sendStatus(200);
    /* 让options请求快速返回 */ else
        next();
});
app.use(formidable({
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    maxFileSize: 2 * 1024 * 1024,
    keepExtensions: true
}));
expressWs(app);
// 路由
require('./routes')(app);
app.listen(8300);
console.log('server run success at port 8300');
