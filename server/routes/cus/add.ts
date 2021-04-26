const { Orders, validateOrder } = require('../../model/Order/Orders')
const { Table } = require('../../model/Table/Table')

export = async (req: any, res: any) => {
  console.log(req.fields)
  let { fields } = req

  //存入之前查询数据库中最后的orderid，自增1
  const orders = await Orders.find()
  const max_orderID = orders.reduce((pre, cur) => pre.orderid > cur.orderid ? pre : cur, 0)
  fields.orderid = max_orderID.orderid + 1

  //根据前台的tableid查询 数据库中的table ID ，waiter
  const { tableID } = fields
  const table = await Table.findOne({ tableID })
  fields.tableid = table._id
  fields.waiter = table.staff


  //订单生成时自动更改餐桌状态
  const send = await Table.updateOne({ _id: table._id }, { status: 1 })
  // console.log('send', send)
  console.log('fields', fields)

  const saveValue = JSON.parse(JSON.stringify(fields))

  try {
    await validateOrder(saveValue)
  } catch (e) {
    return res.send({ status: -7, message: e.message })
  }

  // let order = await Orders.findOne({ foodTypeName: req.fields.foodTypeName })
  // if (order) return res.send({ message: '此订单已存在' })
  let order = new Orders(fields)
  await order.save()
  res.send({
    order,
    status: 200
  })
}
