const order = require('express').Router();

order.get('/', require('./admin/order/list'))
order.post('/add', require('./waiter/order/add'))
order.put('/edit',require('./waiter/order/edit'))
order.delete('/del/:id',require('./admin/order/del'))
export = order
