const home = require('express').Router();

//热门菜品、随机推荐
home.get('/', require('./front/home/hotlist'))

//菜品分类
home.get('/cate', require('./front/home/cate'))

//是否会员
home.post('/iscus', require('./front/home/iscus'))

//菜品搜索
home.post('/dish/search', require('./front/home/search'))

export = home
