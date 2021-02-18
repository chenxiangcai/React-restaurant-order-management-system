const { Orders, validateOrder } = require('../../../model/Order/Orders')
export =  async (req: any, res: any) => {
  const { _id } = req.fields
  try {
    validateOrder(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }
  const order = await Orders.updateOne({ _id: _id }, { $set: req.fields })
  console.log(order)
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, order
  })
}
