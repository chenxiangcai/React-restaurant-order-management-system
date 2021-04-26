const { Orders, validateOrder } = require('../../../model/Order/Orders')
const _ = require('lodash')
export = async (req: any, res: any) => {
  console.log(req.fields)

  try {
    await validateOrder(req.fields)
  } catch (e) {
    return res.send({ status: -7, message: e.message })
  }

  return
  // let order = await Orders.findOne({ foodTypeName: req.fields.foodTypeName })
  // if (order) return res.send({ message: '此订单已存在' })
  let order = new Orders(req.fields)
  await order.save()
  res.send({
    data: (_.pick(order, ['foodTypeName', 'whoAdd'])),
    status: 200
  })
}
