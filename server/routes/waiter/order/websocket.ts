const { Orders } = require('../../../model/Order/Orders')

export = async (ws, req) => {

  ws.on("message", function (msg) {
    ws.send('websocket connected')
    console.log('websocket connected')
    //定时器轮询数据库数据
    // setInterval(async (_this, ws) => {
    //   const orders = await Orders.find({})
    //   //订单变动检查
    //   if (_this.orders !== JSON.stringify(orders)) {
    //     _this.orders = JSON.stringify(orders)
    //     let order = await Orders.find({}).populate('tableid')
    //
    //     //找到未完成订单
    //     order = order.filter(val => val.status !== 1)
    //     order = order.map(val => {
    //       return {
    //         order: val.orderdetail,
    //         orderid: val._id,
    //         tableID: val.tableid.tableID,
    //         fromNow: val.begintime
    //       }
    //     })
    //     order = order.filter(val => val.order.length !== 0)
    //
    //     //每个菜品详情中加入tableID\orderid 便于table显示
    //     order.forEach(val => val.order.forEach(value => {
    //       value.tableID = val.tableID
    //       value.orderid = val.orderid
    //     }))
    //
    //     ws.send(JSON.stringify(order))
    //   }
    // }, 1000, globalThis, ws)
    const lastDayTime = Date.now() - 86400000
    const lastDay = new Date(lastDayTime).toISOString().slice(0, 10)
    const nowDay = new Date().toISOString().slice(0, 10)


    //用于更新订单时间 每秒返回一次
    setInterval(async (_this, ws) => {
      const nowHour = new Date().getHours()
      // var order = []
      //按当前时间统计订单，0-5点统计时将加入前一日订单，以避免未付款订单无法显示的情况
      if (nowHour >= 0 && nowHour <= 5) {
        await Orders.find({
          begintime: {
            '$gte': lastDay,
          }
        }).populate('tableid').then(val => {
          let order = val
          //找到未完成订单
          order = order.filter(val => val.status !== 3)
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
          //每个菜品详情中加入tableID\orderid 便于厨师端table显示
          order.forEach(val => val.order.forEach(value => {
            value.tableID = val.tableID
            value.orderid = val.orderid
          }))
          order = order.sort((a, b) => b.fromNow - a.fromNow)
          // console.log(Date.now())
          ws.send(JSON.stringify(order))
        })
      } else {
        await Orders.find({
          begintime: {
            '$gte': nowDay,
          }
        }).populate('tableid').then(val => {
          let order = val
          //找到未完成订单
          order = order.filter(val => val.status !== 3)
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
          //每个菜品详情中加入tableID\orderid 便于厨师端table显示
          order.forEach(val => val.order.forEach(value => {
            value.tableID = val.tableID
            value.orderid = val.orderid
          }))
          order = order.sort((a, b) => b.fromNow - a.fromNow)
          // console.log(Date.now())
          ws.send(JSON.stringify(order))
        })
      }
    }, 2000, globalThis, ws)
  })
}
