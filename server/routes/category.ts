const category = require('express').Router();

category.get('/', require('./category/list'))

export = category
