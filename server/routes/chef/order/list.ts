const { Orders } = require('../../../model/Order/Orders')

export = async (req, res) => {
  let order = await Orders.find({}).populate('tableid')

  //找到未完成订单
  order = order.filter(val => val.status !== 1)

  order = order.map(val => {
    return {
      order: val.orderdetail,
      orderid: val._id,
      tableID: val.tableid.tableID
    }
  })
  order = order.filter(val => val.order.length !== 0)

  //每个菜品详情中加入tableID\orderid 便于厨师端table显示
  order.forEach(val => val.order.forEach(value => {
    value.tableID = val.tableID
    value.orderid = val.orderid
  }))
  res.send({ order, meta: { status: 200, message: '查询成功' } })
}
