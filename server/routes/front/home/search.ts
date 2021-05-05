const { Dishes } = require("../../../model/Dish/Dish")

export = async (req, res) => {
  const { name } = req.fields
  const regex = new RegExp(escapeRegex(name), 'gi') // 全局匹配规则
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  const condition = { name: regex }

  const dishes = await Dishes.find(condition)
  if (!dishes) return res.send({
    status: 400,
    message: '查询失败'
  })

  res.send({ dishes, meta: { status: 200, message: '查询成功' } })
}
