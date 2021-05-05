const { Orders } = require('../../../model/Order/Orders')

export = async (ws, req, res) => {

  ws.on("message", function (msg) {
    ws.send('websocket connected')
    console.log('websocket connected')
  })

  //定时器轮询数据库数据
  globalThis.orders = ''
  setInterval(async (_this) => {
    const orders = await Orders.find({})
    //订单变动检查
    if (_this.orders !== JSON.stringify(orders)) {
      _this.orders = JSON.stringify(orders)
      let order = await Orders.find({}).populate('tableid')
      //找到未完成订单
      order = order.filter(val => val.status !== 1)
      order = order.map(val => {
        return {
          order: val.orderdetail,
          orderid: val._id,
          tableID: val.tableid.tableID,
          fromNow: val.begintime
        }
      })
      order = order.filter(val => val.order.length !== 0)
      //每个菜品详情中加入tableID\orderid 便于厨师端table显示
      order.forEach(val => val.order.forEach(value => {
        value.tableID = val.tableID
        value.orderid = val.orderid
      }))

      ws.send(JSON.stringify(order))
    }
    //修改订单

  }, 1000, globalThis)
}
