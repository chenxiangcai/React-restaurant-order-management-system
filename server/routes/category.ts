const category = require('express').Router();

category.get('/', require('./admin/category/list'))
category.post('/add', require('./admin/category/add'))

export = category
