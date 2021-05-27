const { Dishes, validateDishes } = require('../../../model/Dish/Dish')
export = async (req, res) => {
  const { _id, name, isEditName, picture } = req.fields

  try {
    validateDishes(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }

  //如果修改名字
  if (isEditName && picture === '') {
    const dish1 = await Dishes.findOne({ name: name })
    if (dish1) return res.send({ message: '此菜品已存在' })
  }

  const dish = await Dishes.updateOne({ _id: _id }, { $set: req.fields })
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, dish
  })
}
