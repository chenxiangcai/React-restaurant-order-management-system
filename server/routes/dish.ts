const dish = require('express').Router();

dish.get('/', require('./dishes/list'))


export = dish
