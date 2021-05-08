const { Dishes } = require("../../../model/Dish/Dish")
const { Orders } = require('../../../model/Order/Orders')
const { Customer } = require('../../../model/Customer/Customer')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
  //订单表
  const orders = await pagination(Orders).find({}).exec()
  //会员表
  const customers = await pagination(Customer).find({}).exec()

  /** 总销售模块 */
  const allMoney: number = orders.records.reduce((pre, cur) => pre + cur.receivable, 0)
  //今日销售额
  let dayMoney = 0
  const nowDay = new Date().toISOString().slice(0, 10)
  const isNowDayAry = orders.records.filter(val => val?.finishtime?.toISOString()?.slice(0, 10) === nowDay)
  if (isNowDayAry.length !== 0) dayMoney = isNowDayAry.reduce((pre, cur) => pre + cur.receivable, 0)

  //周环比 = （当前日期-6 求本周数据 / 当前日期-13 求上周数据）/  *100%
  const sevenday = 518400000
  const fourteenday = 1.1232E+9
  const thisWeek = Date.now() - sevenday
  const lastWeek = Date.now() - fourteenday
  const sixDayAgoTime = new Date(thisWeek).toISOString().slice(0, 10) //本周起始日
  const thirteenAgoTime = new Date(lastWeek).toISOString().slice(0, 10) //上周起始日
  const nowDayTime = new Date().toISOString() //当前日期
  const nowYear = new Date().toISOString().slice(0, 4)

  //本周范围
  const thisWeekTime = {
    "$and": [
      { "finishtime": { "$gte": `${sixDayAgoTime}` } },
      { "finishtime": { "$lt": `${nowDayTime}` } }
    ]
  }
  //上周范围
  const lastWeekTime = {
    "$and": [
      { "finishtime": { "$gte": `${thirteenAgoTime}` } },
      { "finishtime": { "$lt": `${sixDayAgoTime}` } }
    ]
  }

  const thisWeekOrders = await pagination(Orders).find(thisWeekTime).exec()
  const lastWeekOrders = await pagination(Orders).find(lastWeekTime).exec()
  const thisWeekMoney: number = thisWeekOrders.records.reduce((pre, cur) => pre + cur.receivable, 0)
  const lastWeekMoney: number = lastWeekOrders.records.reduce((pre, cur) => pre + cur.receivable, 0)
  let weekRate: number | string

  if (lastWeekMoney != 0) weekRate = ((thisWeekMoney / lastWeekMoney) * 0.1).toFixed(2)
  else if (thisWeekMoney == 0) weekRate = -8888
  else weekRate = -9999
  if (weekRate == 0) weekRate = -8888

  //日环比 = （今日销售数据 / 昨日销售数据） *100%
  const onedaytime = 86400000
  const lastdaytime = new Date(Date.now() - onedaytime).toISOString().slice(0, 10)
  const lastdayorders = await pagination(Orders).find({
    finishtime: {
      '$gte': lastdaytime,
      '$lte': nowDay
    }
  }).exec()
  const todayorders = await pagination(Orders).find({ finishtime: { '$gte': nowDay, } }).exec()

  const lastDayMoney: number = lastdayorders.records.reduce((pre, cur) => pre + cur.receivable, 0)
  const todayMoney: number = todayorders.records.reduce((pre, cur) => pre + cur.receivable, 0)
  let dayRate: string | number
  if (lastDayMoney != 0) dayRate = ((todayMoney / lastDayMoney) * 0.1).toFixed(2)
  else if (todayMoney == 0) dayRate = -8888
  else dayRate = -9999


  /** 销售实收模块 */
  const allReMoney = orders.records.reduce((pre, cur) => pre + cur.paid, 0).toFixed(2)
  //日销售额
  const reTodayMoney: number = todayorders.records.reduce((pre, cur) => pre + cur.paid, 0)
  //按日期分组查询 统计本周每日订单数和实际收入
  const getThisWeekRe = (val: []) => {
    globalThis.thisWeekRe = val
  }

  await Orders.aggregate(
      [
        { $project: { finishtime: { $substr: ["$finishtime", 0, 10] }, paid: "$paid" } },
        { $group: { _id: "$finishtime", num: { $sum: 1 }, paid: { $sum: '$paid' } } },
        { $sort: { _id: -1 } },
        { $limit: 7 }
        // { $match: { $or: [{ paid: { $gt: 99999 } }] } },
      ], async function (err, docs) {
        // console.log(docs)
        await getThisWeekRe(docs.reverse())
      })

  let thisWeekRe = globalThis.thisWeekRe

  /** 订单量模块 */
  const totalordernum: number = orders.total
  const todayordernum: number = todayorders.total

  /** 会员量模块 */
  const vipnum: number = customers.total
  //计算会员周活跃量
  const getActive = (val: []) => {
    globalThis.WeekVipActiveNum = val.length
    globalThis.WeekVipActiveRate = (val.length / vipnum)
    // console.log(globalThis.dayVipActiveRate, globalThis.dayVipActiveNum)
  }
  await Orders.aggregate(
      [
        {
          $match: {
            'finishtime': {
              $gte: new Date(sixDayAgoTime),
              $lt: new Date(nowDayTime)
            }
          }
        },
        { $project: { finishtime: { $substr: ["$finishtime", 0, 10] }, cus: "$cus" } },
        { $group: { _id: "$cus", num: { $sum: 1 } } },
        { $sort: { _id: -1 } },
        // { $match: { $or: [{ paid: { $gt: 99999 } }] } },
      ], async function (err, docs) {
        // console.log('周活跃')
        // console.log(docs)
        await getActive(docs)
      })

  //计算会员日活跃量
  const getActiveDay = (val: []) => {
    globalThis.dayVipActiveNum = val.length
    // console.log(globalThis.dayVipActiveRate, globalThis.dayVipActiveNum)
  }
  await Orders.aggregate(
      [
        {
          $match: {
            'finishtime': {
              '$gte': new Date(nowDay),
            }
          }
        },
        { $project: { finishtime: { $substr: ["$finishtime", 0, 10] }, cus: "$cus" } },
        { $group: { _id: "$cus", num: { $sum: 1 } } },
        { $sort: { _id: -1 } },
        // { $match: { $or: [{ paid: { $gt: 99999 } }] } },
      ], async function (err, docs) {
        // console.log('日活跃')
        // console.log(docs)
        await getActiveDay(docs)
      })
  let weekVipActiveRate = globalThis.WeekVipActiveRate
  let dayVipActiveNum = globalThis.dayVipActiveNum


  /** 销售额模块 */
      //本年每月销售额与订单量
  const getSoldModule = (val: []) => {
        globalThis.soldModule = val
      }
  await Orders.aggregate(
      [
        {
          $match: {
            'finishtime': {
              $gte: new Date(`${nowYear}-01-01`),
              $lt: new Date(`${nowYear}-12-31`)
            }
          }
        },
        { $project: { finishtime: { $substr: ["$finishtime", 0, 7] }, paid: "$paid" } },
        { $group: { _id: "$finishtime", num: { $sum: 1 }, paid: { $sum: '$paid' } } },
        { $sort: { _id: 1 } },
        // { $match: { $or: [{ paid: { $gt: 99999 } }] } },
      ], async function (err, docs) {
        await getSoldModule(docs)
      })
  const soldModule = globalThis.soldModule

  //本月每日销售额与订单量
  const getSoldModuleDay = (val: []) => {
    globalThis.soldModuleDay = val
  }
  await Orders.aggregate(
      [
        {
          $match: {
            'finishtime': {
              $gte: new Date(`${nowDay.slice(0, 7)}-01`),
              $lt: new Date(`${nowDay.slice(0, 7)}-31`)
            }
          }
        },
        { $project: { finishtime: { $substr: ["$finishtime", 0, 10] }, paid: "$paid" } },
        { $group: { _id: "$finishtime", num: { $sum: 1 }, paid: { $sum: '$paid' } } },
        { $sort: { _id: 1 } },
        // { $match: { $or: [{ paid: { $gt: 99999 } }] } },
      ], async function (err, docs) {
        await getSoldModuleDay(docs)
      })
  const soldModuleDay = globalThis.soldModuleDay


  /** 销售排行模块 */

      //查询近一个月的所有订单
  const monthOrders = await Orders.find({
        finishtime: {
          $gte: new Date(`${nowDay.slice(0, 7)}-01`),
          $lt: new Date(`${nowDay.slice(0, 7)}-31`)
        }
      })
  //查询每个订单下的点餐详情
  let rankMonth = await monthOrders.map(val => val.orderdetail).flat()
  rankMonth = rankMonth.reduce((cur, pre) => {
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
  rankMonth = rankMonth.sort((a, b) => b.num - a.num)
  if (rankMonth.length > 7) rankMonth.splice(0, 7)

  //查询近一周的所有订单
  const weekOrders = await Orders.find({
    finishtime: {
      $gte: new Date(`${sixDayAgoTime}`),
      $lt: new Date(`${nowDayTime}`)
    }
  })
  //查询每个订单下的点餐详情
  let RankWeek = await weekOrders.map(val => val.orderdetail).flat()
  RankWeek = RankWeek.reduce((cur, pre) => {
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
  RankWeek = RankWeek.sort((a, b) => b.num - a.num)
  if (RankWeek.length > 7) RankWeek.splice(0, 7)


  //查询今日的所有订单
  const dayorders = await Orders.find({
    finishtime: {
      $gte: new Date(`${nowDay}`),
    }
  })
  //查询每个订单下的点餐详情
  let RankDay = await dayorders.map(val => val.orderdetail).flat()
  RankDay = RankDay.reduce((cur, pre) => {
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
  RankDay = RankDay.sort((a, b) => b.num - a.num)
  if (RankDay.length > 7) RankDay.splice(0, 7)

  res.send({
    allSold: { allMoney, dayMoney, weekRate, dayRate },
    allReceive: { allReMoney, reTodayMoney, thisWeekRe },
    orderNum: { totalordernum, todayordernum },
    vip: { vipnum, dayVipActiveNum, weekVipActiveRate, },
    SoldModule: { soldModule, soldModuleDay },
    rank: { rankMonth: rankMonth, rankWeek: RankWeek, rankDay: RankDay },
    meta: { status: 200, message: '查询成功' }
  })
}
