const {Category, validateCategory} = require('../../../model/Category/Category')
const {User} = require('../../../model/User/User')
export = async (req, res) => {
  const {_id} = req.fields
  try {
    validateCategory(req.fields)
  } catch (e) {
    return res.send({status: -1, message: e.message})
  }
  let user = await User.findOne({ name: req.fields.whoAdd })
  req.fields.whoAdd = user._id
  console.log(req.fields)
  const category = await Category.updateOne({_id: _id}, {$set: req.fields})
  console.log(category)
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, category
  })
}
