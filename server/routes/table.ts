const table = require('express').Router();
//用户列表
table.get('/', require('./admin/table/list'))
table.post('/add', require('./admin/table/add'))
table.delete('/del/:id', require('./admin/table/del'))
table.put('/edit', require('./admin/table/edit'))

export = table
