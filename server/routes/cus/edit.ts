const { Orders, validateOrder } = require('../../model/Order/Orders')
const { Table } = require('../../model/Table/Table')
const { Dishes } = require('../../model/Dish/Dish')
const { Customer } = require('../../model/Customer/Customer')

export = async (req, res) => {
  const { orderid, status, level, cus, receivable, paid } = req.fields
  try {
    validateOrder(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }
  //结束订单 付款
  if (status) {
    //如果是会员
    if (level && cus) {
      //更新订单信息
      await Orders.updateOne({ _id: orderid }, { status: 2, finishtime: Date.now(), level, cus, receivable, paid })
      //更新会员表信息
      const cus1 = await Customer.findOne({ _id: cus })
      cus1.xftimes++
      cus1.xftotal += paid
      await Customer.updateOne({ _id: cus }, { $set: cus1 })
    } else await Orders.updateOne({ _id: orderid }, { status: 2, finishtime: Date.now(), receivable, paid })


    //置空餐桌状态
    console.log(orderid)
    const table = await Orders.findOne({ _id: orderid }).populate('tableid')
    console.log(table)
    const tableid = table.tableid._id
    const result = await Table.updateOne({ _id: tableid }, { status: 0 })


    if (result.ok == 1) return res.send({
      meta: {
        status: 200,
        message: '修改信息成功'
      }
    })
  }

  //更新订单
  const { addOrder } = req.fields

  var notE = []
  //新增菜品时减少对应库存数量
  addOrder.map(async val => {
    const dish = await Dishes.findOne({ _id: val._id })
    dish.number -= val.num
    if (dish.number < 0) {
      dish.number += val.num
      notE.push(val.name)
      return res.send({
        notE,
        status: 400
      })
    }

    await Dishes.updateOne({ _id: val._id }, { number: dish.number })
    if (notE.length === 0) {
      const order = await Orders.updateOne({ _id: orderid }, { orderdetail: req.fields.orderdetail })
      res.send({
        meta: {
          status: 200,
          message: '修改信息成功'
        },
        order
      })
    }
  })
}
