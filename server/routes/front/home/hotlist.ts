const { Dishes } = require('../../../model/Dish/Dish')
const { Orders } = require('../../../model/Order/Orders')
require('mongoose-query-random')

export = async (req, res) => {
  const nowDay = new Date().toISOString().slice(0, 10)

  //本月
  const getRankMonth = async (val: any) => {
    //根据id遍历菜名
    let f1 = function (i) {
      return new Promise<void>(async function (resolve, reject) {
        const dish = await Dishes.findOne({ _id: `${val[i]._id}` })
        val[i].url = dish.picture
        val[i].name = dish.name
        val[i].price = dish.price
        val[i].num = val[i].paid / dish.price
        resolve(dish);
      });
    };
    for (let i = 0; i < val.length; i++) {
      await f1(i)
    }
    globalThis.RankMonth = val
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
        { $project: { orderdetail: "$orderdetail", paid: "$paid" } },
        { $group: { _id: "$orderdetail._id", num: { $sum: 1 }, paid: { $sum: '$paid' } } },
        { $sort: { num: -1 } },
        { $limit: 7 }

        // { $match: { $or: [{ paid: { $gt: 99999 } }] } },
      ], async function (err, docs) {
        await getRankMonth(docs)
      })

  if (globalThis.RankMonth) globalThis.RankMonth.forEach((val) => val._id = val._id.join(''))

  //随机推荐
  Dishes.find().random(8, true, (err, docs) => {
    globalThis.random = docs
  })

  res.send({
    list: { hotlist: globalThis.RankMonth, randomlist: globalThis.random },
    meta: { status: 200, message: '查询成功' }
  })
}
