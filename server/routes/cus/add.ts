const { Orders, validateOrder } = require('../../model/Order/Orders')
const { Table } = require('../../model/Table/Table')
const { Dishes } = require('../../model/Dish/Dish')

export = async (req: any, res: any) => {
  let { fields } = req
  var isOrdering = false

  //存入之前判断是否当前餐桌是否已使用，如正使用则添加菜品
  const tableID1 = fields.tableID
  const table1 = await Table.findOne({ tableID: tableID1 })
  const tableid = table1._id
  const order = await Orders.find({ tableid })

  //找到对应的订单
  let nowOrder = order.filter(val => val.status === 0)

  if (nowOrder.length > 0) {
    //生成时默认订单中每个菜品状态未为制做
    fields.orderdetail.forEach(val => {
      val.status = 0
    })
    //根据前台的tableid 查询数据库中的table ID ，waiter
    const { tableID } = fields
    const table = await Table.findOne({ tableID })
    fields.tableid = table._id
    fields.waiter = table.staff
    fields.tableID = tableID

    //关联商品库存表，自动减少库存数量;不足时直接返回
    const notEnough = []
    fields.orderdetail.map(async (val, index) => {
      const dish = await Dishes.findOne({ _id: val._id })
      //判断库存是否充足
      if (dish.number - val.num < 0) {
        notEnough.push(val.name)
        // val.status = -1
        return res.send({
          notEnough,
          status: 400
        })
      } else {
        dish.number -= val.num
        await Dishes.updateOne({ _id: val._id }, { number: dish.number })

      }
      //筛选库存不足的商品，添加正常的商品到订单中
      fields.orderdetail = fields.orderdetail.filter(val => val.status !== -1)
      nowOrder[0].orderdetail = [...nowOrder[0].orderdetail, ...fields.orderdetail]
      fields.orderid = nowOrder[0].orderid
      const saveValue = JSON.parse(JSON.stringify(fields))
      try {
        await validateOrder(saveValue)
      } catch (e) {
        return res.send({ status: -7, message: e.message })
      }
      if (notEnough.length === 0) {
        await Orders.updateOne({ _id: nowOrder[0]._id }, { orderdetail: nowOrder[0].orderdetail })
        const NewOrder = await Orders.findOne({ _id: nowOrder[0]._id })
        res.send({
          order: NewOrder,
          notEnough,
          status: 200
        })
      }
    })
  } else {
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
    fields.tableID = tableID

    //关联餐桌表，订单生成时自动更改餐桌状态
    await Table.updateOne({ _id: table._id }, { status: 1 })

    //生成时默认订单中每个菜品状态未为制做
    fields.orderdetail.forEach(val => {
      val.status = 0
    })

    //关联商品库存表，自动减少库存数量;不足时直接返回
    const notEnough = []
    fields.orderdetail.map(async (val, index) => {
      const dish = await Dishes.findOne({ _id: val._id })
      //判断库存是否充足
      if (dish.number - val.num < 0) {
        notEnough.push(val.name)
        // val.status = -1
        return res.send({
          notEnough,
          status: 400
        })
      } else {
        dish.number -= val.num
        await Dishes.updateOne({ _id: val._id }, { number: dish.number })
      }
      //筛选库存不足的商品，添加正常的商品到订单中
      fields.orderdetail = fields.orderdetail.filter(val => val.status !== -1)


      console.log(isOrdering)

      const saveValue = JSON.parse(JSON.stringify(fields))

      try {
        await validateOrder(saveValue)
      } catch (e) {
        return res.send({ status: -7, message: e.message })
      }

      if (notEnough.length === 0) {
        let order = new Orders(fields)
        await order.save()
        res.send({
          order,
          notEnough,
          status: 200
        })
      }
    })
  }
}
