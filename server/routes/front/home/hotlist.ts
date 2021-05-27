const { Dishes } = require('../../../model/Dish/Dish')
const { Orders } = require('../../../model/Order/Orders')
require('mongoose-query-random')

export = async (req, res) => {
  const nowDay = new Date().toISOString().slice(0, 10)


  //查询近一个月的所有订单
  const order1 = await Orders.find({
    finishtime: {
      $gte: new Date(`${nowDay.slice(0, 7)}-01`),
      $lt: new Date(`${nowDay.slice(0, 7)}-31`)
    }
  })
  //查询每个订单下的点餐详情
  let order2 = await order1.map(val => val.orderdetail).flat()

  // let orderIds = [] //累加去重后的订单数组
  // order2.map(val => {
  //   let flag = true
  //   for (let i = 0; i < orderIds.length; i++) {
  //     if (orderIds[i]._id === val._id) {
  //       orderIds[i].num += val.num
  //       flag = false
  //     }
  //   }
  //   if (flag) orderIds.push(val)
  //   else return false
  // })

  order2 = order2.reduce((cur, pre) => {
    var a = false
    for (let i = 0; i < cur.length; i++) {
      if (cur[i]._id == pre._id) {
        cur[i].num += pre.num
        a = true
      }
    }
    if (a == false) cur.push(pre)
    return cur
  }, [])
  //根据销量反向排序 并截取前7个热门菜品
  order2 = order2.sort((a, b) => b.num - a.num)
  if (order2.length > 7) order2 = order2.splice(0, 7)


  //随机推荐
  Dishes.find().random(8, true, (err, docs) => {
    globalThis.random = docs
  })

  res.send({
    list: { hotlist: order2, randomlist: globalThis.random },
    meta: { status: 200, message: '查询成功' }
  })
}
