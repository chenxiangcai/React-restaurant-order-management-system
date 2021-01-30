const {Category} = require('../../../model/Category/Category')
const _ = require('lodash')
export = async (req, res) => {
  const category = await Category.findOneAndDelete({_id: req.params.id})
  res.send({
    data: _.pick(category, ['name', 'category', 'price']),
    status: 200
  })
}
