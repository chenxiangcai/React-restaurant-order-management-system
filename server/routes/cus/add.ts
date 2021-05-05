const { Orders, validateOrder } = require('../../model/Order/Orders')
const { Table } = require('../../model/Table/Table')
const { Dishes } = require('../../model/Dish/Dish')

export = async (req: any, res: any) => {
  let { fields } = req

  //存入之前查询数据库中最后的orderid，自增1
  const orders = await Orders.find()
  const max_orderID = orders.reduce((pre, cur) => pre.orderid > cur.orderid ? pre : cur, 0)
  if (max_orderID === 0) fields.orderid = 1
  else fields.orderid = max_orderID.orderid + 1

  //根据前台的tableid 查询数据库中的table ID ，waiter
  const { tableID } = fields
  const table = await Table.findOne({ tableID })
  fields.tableid = table._id
  fields.waiter = table.staff

  //关联餐桌表，订单生成时自动更改餐桌状态
  await Table.updateOne({ _id: table._id }, { status: 1 })

  //生成时默认订单中每个菜品状态未为制做
  fields.orderdetail.forEach(val => {
    val.status = 0
  })

  //关联商品库存表，自动减少库存数量
  fields.orderdetail.map(async val => {
    const dish = await Dishes.findOne({ _id: val._id })
    dish.number -= val.num
    await Dishes.updateOne({ _id: val._id }, { number: dish.number })
  })

  const saveValue = JSON.parse(JSON.stringify(fields))

  try {
    await validateOrder(saveValue)
  } catch (e) {
    return res.send({ status: -7, message: e.message })
  }

  let order = new Orders(fields)
  await order.save()
  res.send({
    order,
    status: 200
  })
}
