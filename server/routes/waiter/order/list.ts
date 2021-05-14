const { Orders } = require('../../../model/Order/Orders')

export = async (req, res) => {
  const lastDayTime = Date.now() - 86400000
  const lastDay = new Date(lastDayTime).toISOString().slice(0, 10)
  const nowDay = new Date().toISOString().slice(0, 10)

  const nowHour = new Date().getHours()
  var order = []
  //按当前时间统计订单，0-5点统计时将加入前一日订单，以避免未付款订单无法显示的情况
  if (nowHour >= 0 && nowHour <= 5) {
    order = await Orders.find({
      begintime: {
        '$gte': lastDay,
      }
    }).populate('tableid')
  } else {
    order = await Orders.find({
      begintime: {
        '$gte': nowDay,
      }
    }).populate('tableid')
  }

  //找到未完成订单 0未完成/2已付款/1未付款
  // order = order.filter(val => val.status !== 0)

  order = order.map(val => {
    return {
      order: val.orderdetail,
      orderid: val._id,
      isPaid: val.status === 2,
      tableID: val.tableid.tableID,
      fromNow: val.begintime
    }
  })
  order = order.filter(val => val.order.length !== 0)

  //每个菜品详情中加入tableID\orderid 便于table显示
  order.forEach(val => val.order.forEach(value => {
    value.tableID = val.tableID
    value.orderid = val.orderid
  }))
  //按时间顺序降序排列
  order = order.sort((a, b) => b.fromNow - a.fromNow)
  res.send({ order, meta: { status: 200, message: '查询成功' } })
}
