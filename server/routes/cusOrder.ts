const cusOrder = require('express').Router();

cusOrder.post('/add', require('./cus/add'))
cusOrder.put('/edit', require('./cus/edit'))
export = cusOrder
