const {Category, validateCategory} = require('../../../model/Category/Category')
const _ = require('lodash')
export = async (req, res) => {
  try {
    await validateCategory(req.fields)
  } catch (e) {
    return res.send({status: -7, message: e.message})
  }
  let category = await Category.findOne({foodTypeName: req.fields.foodTypeName})
  if (category) return res.send({message: '此菜品已存在'})
  category = new Category(req.fields)
  await category.save()
  res.send({
    data: (_.pick(category, ['foodTypeName', 'whoAdd'])),
    status: 200
  })
}
