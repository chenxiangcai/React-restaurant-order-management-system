const { Orders, validateOrder } = require('../../model/Order/Orders')
const { Table } = require('../../model/Table/Table')
const { Dishes } = require('../../model/Dish/Dish')

export = async (req, res) => {
  const { orderid, status, level, cus, receivable, paid } = req.fields
  try {
    validateOrder(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }
  //结束订单
  if (status) {
    if (level && cus) await Orders.updateOne({ _id: orderid }, { finishtime: Date.now(), level, cus, receivable, paid })
    else await Orders.updateOne({ _id: orderid }, { finishtime: Date.now(), receivable, paid })
    //置空餐桌状态
    const table = await Orders.findOne({ _id: orderid }).populate('tableid')
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
  const order = await Orders.updateOne({ _id: orderid }, { orderdetail: req.fields.orderdetail })
  const { addOrder } = req.fields
  //新增菜品时减少对应库存数量
  addOrder.map(async val => {
    const dish = await Dishes.findOne({ _id: val._id })
    dish.number -= val.num
    await Dishes.updateOne({ _id: val._id }, { number: dish.number })
  })

  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    },
    order
  })
}
