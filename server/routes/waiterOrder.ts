const expressWs = require('express-ws');

const waiterOrder = require('express').Router();
expressWs(waiterOrder)

waiterOrder.ws('/', require('./waiter/order/websocket'))
waiterOrder.get('/', require('./waiter/order/list'))
waiterOrder.put('/edit', require('./waiter/order/edit'))
waiterOrder.post('/add', require('./waiter/order/add'))


export = waiterOrder
