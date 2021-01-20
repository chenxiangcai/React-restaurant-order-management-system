const dish = require('express').Router();

dish.get('/', require('./admin/dishes/list'))
dish.post('/add', require('./admin/dishes/add'))
dish.delete('/del/:id', require('./admin/dishes/del'))
dish.put('/edit', require('./admin/dishes/edit'))
export = dish
