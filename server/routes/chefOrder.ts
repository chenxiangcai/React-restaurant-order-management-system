const expressWs = require('express-ws');

const chefOrder = require('express').Router();
expressWs(chefOrder)

chefOrder.ws('/', require('./chef/order/websocket'))
chefOrder.get('/', require('./chef/order/list'))
chefOrder.put('/edit', require('./chef/order/edit'))

export = chefOrder
