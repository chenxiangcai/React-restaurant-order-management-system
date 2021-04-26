const adminOrder = require('express').Router();

adminOrder.get('/', require('./admin/order/list'))
// order.post('/add', require('./waiter/order/add'))
// order.put('/edit',require('./waiter/order/edit'))
adminOrder.delete('/del/:id', require('./admin/order/del'))
export = adminOrder
