const customer = require('express').Router();

customer.get('/', require('./admin/customer/customers/list'))
customer.post('/add', require('./admin/customer/customers/add'))
customer.put('/edit',require('./admin/customer/customers/edit'))
customer.delete('/del/:id',require('./admin/customer/customers/del'))

customer.get('/cate', require('./admin/customer/category/list'))
customer.post('/cate/add', require('./admin/customer/category/add'))
customer.put('/cate/edit',require('./admin/customer/category/edit'))
customer.delete('/cate/del/:id',require('./admin/customer/category/del'))

export = customer
