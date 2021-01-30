const { Category, validateCategory } = require('../../../model/Category/Category')
const { User } = require('../../../model/User/User')
const _ = require('lodash')
export = async (req, res) => {
  try {
    await validateCategory(req.fields)
  } catch (e) {
    return res.send({ status: -7, message: e.message })
  }
  let user = await User.findOne({ name: req.fields.whoAdd })
  let category = await Category.findOne({ foodTypeName: req.fields.foodTypeName })
  if (category) return res.send({ message: '此菜品已存在' })
  req.fields.whoAdd = user._id
  category = new Category(req.fields)
  await category.save()
  res.send({
    data: (_.pick(category, ['foodTypeName', 'whoAdd'])),
    status: 200
  })
}
