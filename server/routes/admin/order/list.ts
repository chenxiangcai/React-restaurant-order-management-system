const { Orders } = require('../../../model/Order/Orders')
const { Dishes } = require('../../../model/Dish/Dish')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
  let condition: object
  let page: number = +req.query.page
  let pagesize: number = req.query.pagesize

  if (!page || typeof page !== 'number') page = 1
  if (pagesize == null) pagesize = 10
  if (req.query.query !== '') condition = { orderid: req.query.query }

  // const options = {
  //   sort: { _id: -1 },
  //   page: Number(page),
  //   //limit: Number(),
  //   // populate: ['brand', 'tag'],
  //   populate: [{ path: 'brand', select: 'name' }, 'tag'],
  //   select: '-password -content'
  // };
  let aorder = await pagination(Orders)
      .find(condition)
      .page(page).size(pagesize)
      .populate('cus')
      .populate('level')
      .populate('tableid')
      .populate({
        path: 'waiter',
        select: '-password'
      })
      .exec()

  let f1 = function (i) {
    return new Promise<void>(async function (resolve, reject) {
      const orderIdAry = aorder.records[i].orderdetail.map(val => val._id).flat()
      // console.log(orderIdAry)
      for (let j = 0; j < orderIdAry.length; j++) {
        const dish = await Dishes.findOne({ _id: `${orderIdAry[j]}` })
        // console.log(aorder.records[i].orderdetail[j]._id)
        // console.log(dish.name)
        if (orderIdAry.length === 0) {
          aorder.records[i].orderdetail[0].name = dish.name
          aorder.records[i].orderdetail[0].perprice = dish.price
        }
        aorder.records[i].orderdetail[j].name = dish.name
        aorder.records[i].orderdetail[j].perprice = dish.price
      }
      resolve();
    });
  };


  for (let i = 0; i < aorder.records.length; i++) {
    await f1(i)
  }

  const order = JSON.parse(JSON.stringify(aorder))

  res.send({ order, meta: { status: 200, message: '查询成功' } })
}
