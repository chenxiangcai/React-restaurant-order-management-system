const { Orders } = require('../../../model/Order/Orders')
const { Dishes } = require('../../../model/Dish/Dish')
export = async (req: any, res: any) => {
  const { orderid, orderdetail } = req.fields

  //更新菜名
  if (req.fields.status === 1) {
    /** 需要处理的点：菜品id、name、imgurl、status、price、num
     *              根据修改后的信息同时减少库存
     * */
    const { preDishDetail, updateDishId } = req.fields
    //根据订单id找到订单详情
    const order = await Orders.findOne({ _id: orderid })
    //更改订单状态为未完成
    await Orders.updateOne({ _id: orderid }, { status: 0 })
    //根据更新后的菜品id找到菜品数据库中的菜品详情，更新置换
    const dish = await Dishes.findOne({ _id: updateDishId })

    //在原订单中匹配需要更改的菜品信息
    console.log(order.orderdetail)
    let preOrderDish = order.orderdetail.filter(val => val._id == preDishDetail._id)[0]
    const preOrderIndex = order.orderdetail.findIndex((val) => val._id == preOrderDish._id)
    // console.log('preOD', preOrderDish)
    // console.log('dish', dish)
    preOrderDish._id = dish._id + ''
    preOrderDish.name = dish.name
    preOrderDish.price = dish.price
    preOrderDish.url = dish.picture
    preOrderDish.status = 0

    console.log('跟新后的', preOrderDish)
    //根据index置换当前订单详情
    order.orderdetail[preOrderIndex] = preOrderDish
    //减少库存
    await Dishes.updateOne({ _id: preOrderDish._id }, { number: dish.number - preOrderDish.num })
    //更新订单
    await Orders.updateOne({ _id: orderid }, { orderdetail: order.orderdetail })
    res.send({
      meta: {
        status: 200,
        message: '修改信息成功'
      }, order
    })
  }
  //删除菜品
  else if (req.fields.status === 0) {
    //根据订单id找到订单详情
    const ordere = await Orders.findOne({ _id: req.fields.order.orderid })
    ordere.orderdetail = ordere.orderdetail.filter(val => val._id !== req.fields.order._id)
    console.log(ordere.orderdetail)
    const order = await Orders.updateOne({ _id: req.fields.order.orderid }, { orderdetail: ordere.orderdetail })
    res.send({
      meta: {
        status: 200,
        message: '修改信息成功'
      }, order
    })
  }
  //更新数量
  else {
    const { editDishID, editNum } = req.fields
    const dish = await Dishes.findOne({ _id: editDishID })
    //更改订单状态为未完成
    await Orders.updateOne({ _id: orderid }, { status: 0 })
    await Dishes.updateOne({ _id: editDishID }, { number: dish.number - editNum })
    const order = await Orders.updateOne({ _id: orderid }, { orderdetail })
    res.send({
      meta: {
        status: 200,
        message: '修改信息成功'
      }, order
    })
  }
}
