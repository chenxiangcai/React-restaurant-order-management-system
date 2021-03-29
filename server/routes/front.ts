const home = require('express').Router();

//用户列表
home.get('/', require('./front/home/list'))
// home.post('/add', require('./admin/staffs/add'))
// home.delete('/:id', require('./admin/staffs/del'))
// home.put('/edit', require('./admin/staffs/edit'))
// home.post('/pwd', require('./admin/staffs/pwd'))

export = home
