const { Orders } = require('../../../model/Order/Orders')
const { Dishes } = require('../../../model/Dish/Dish')

export = async (req: any, res: any) => {
  let { orderid, dish } = req.fields

  const order = await Orders.findOne({ _id: orderid })
  const dishes = await Dishes.findOne({ _id: dish.id })


  //添加时如果存在已存在的菜品,直接添加数量
  if (order.orderdetail.filter(val => val._id === dish.id).length > 0) {
    order.orderdetail.filter(async (val, index) => {
      if (val._id === dish.id) {
        //订单添加
        order.orderdetail[index].num += +dish.num
        order.orderdetail[index].status = 0
        await Orders.updateOne({ _id: orderid }, { orderdetail: order.orderdetail })
        //库存减少
        const n = dishes.number -= +dish.num
        if (n < 0) dishes.number += +dish.num
        else {
          dishes.number -= +dish.num
          await Dishes.updateOne({ _id: dish.id }, { $set: dishes })
        }
      }
    })
  }
  //否则新增菜品到订单中
  else {
    order.orderdetail.push({
      orderid: orderid,
      _id: dish.id,
      num: +dish.num,
      price: dishes.price,
      name: dishes.name,
      url: dishes.picture,
      status: 0,
      tableID: dish.tableID
    })

    await Orders.updateOne({ _id: orderid }, { orderdetail: order.orderdetail })
  }

  res.send({
    order,
    status: 200
  })
}
