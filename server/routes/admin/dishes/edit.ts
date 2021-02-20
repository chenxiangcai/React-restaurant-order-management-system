const { Dishes, validateDishes } = require('../../../model/Dish/Dish')
export = async (req, res) => {
  const { _id, name, createAt } = req.fields
  console.log(req.fields)
  try {
    validateDishes(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }

  const dish1 = await Dishes.findOne({ name: name })
  // 根据创建时间判断是否是同一个菜品
  if (dish1.createAt === createAt) return res.send({ message: '此菜品已存在' })

  const dish = await Dishes.updateOne({ _id: _id }, { $set: req.fields })
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, dish
  })
}
