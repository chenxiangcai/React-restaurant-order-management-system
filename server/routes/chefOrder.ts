const chefOrder = require('express').Router();

chefOrder.get('/', require('./chef/order/list'))
chefOrder.put('/edit', require('./chef/order/edit'))

export = chefOrder
