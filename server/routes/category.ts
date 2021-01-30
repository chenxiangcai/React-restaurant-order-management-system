const category = require('express').Router();

category.get('/', require('./admin/category/list'))
category.post('/add', require('./admin/category/add'))
category.put('/edit',require('./admin/category/edit'))
category.delete('/del/:id',require('./admin/category/del'))
export = category
