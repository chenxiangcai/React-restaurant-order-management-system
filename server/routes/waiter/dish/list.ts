const { Dishes } = require('../../../model/Dish/Dish')
export = async (req, res) => {
  const dish = await Dishes.find()
  res.send({ dish, meta: { status: 200, message: '查询成功' } })
}
