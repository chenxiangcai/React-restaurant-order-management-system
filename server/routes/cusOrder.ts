const expressWs = require('express-ws');

const cusOrder = require('express').Router();
expressWs(cusOrder)

cusOrder.ws('/', require('./cus/websocket'))
cusOrder.post('/add', require('./cus/add'))
cusOrder.put('/edit', require('./cus/edit'))
export = cusOrder
