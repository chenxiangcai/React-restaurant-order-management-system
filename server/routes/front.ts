const home = require('express').Router();

//热门菜品、随机推荐
home.get('/', require('./front/home/hotlist'))
//菜品分类
home.get('/cate', require('./front/home/cate'))


export = home
