const category = require('express').Router();

category.get('/', require('./admin/category/list'))

export = category
