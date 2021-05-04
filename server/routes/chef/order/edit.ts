const { Orders } = require('../../../model/Order/Orders')

export = async (req, res) => {
  const { orderid, _id } = req.fields

  //找到菜品
  let order = await Orders.findOne({ _id: orderid })
  let { orderdetail } = order
  orderdetail.forEach(val => {
    if (val._id === _id) {
      if (val.status === 0) val.status = 1
      else val.status = 0
    }
  })

  //修改菜品状态
  const result = await Orders.updateOne({ _id: orderid }, { orderdetail })

  //遍历当前订单菜品是否全部完成，如果已完成，修改订单状态为1
  const s = orderdetail.find(value => value.status === 0)
  if (s == undefined) await Orders.updateOne({ _id: orderid }, { status: 1 })
  else await Orders.updateOne({ _id: orderid }, { status: 0 })


  if (result.ok == 1) return res.send({
    meta: {
      status: 200,
      message: '修改信息成功',
      order: order.orderdetail
    }
  })


  res.send({
    meta: {
      status: 0,
      message: '修改信息失败',
    }
  })
}
