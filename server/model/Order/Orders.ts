// @ts-ignore
const { Schema, model } = require('mongoose')
// @ts-ignore
const Joi = require('joi');
//订单集合规则
const orderSchema: object = new Schema({
  orderid: {
    type: Number,
    required: true,
  },
  tableid: {
    type: Number,
    required: true,
  },
  person: {
    type: Number,
    required: true,
  },
  waiter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderdetail: {
    type: Array,
    required: true,
  },
  begintime: {
    type: Date,
    required: true,
    default: Date.now
  },
  finishtime: {
    type: Date,
    default: Date.now
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'CusCate',
    required: true,
  },
  cus: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  receivable: {
    type: Number,
    required: true
  },
  paid: {
    type: Number,
    required: true
  },
}, { versionKey: false }) //忽略增加的文档在数据库中的__v字段

// @ts-ignore
const Orders = model('Orders', orderSchema);

//初始化测试订单
Orders.findOne({ orderid: 73499 }).then(
    async (result: null | object): Promise<void> => {
      if (result == null) {
        await Orders.create({
          orderid: 73499,
          tableid: 8,
          waiter: '6015033b71e42a1dcf104f74',
          orderdetail: [
            { _id: '60162a2a64a75c03f3e60b9e', num: 92 },
          ],
          receivable: 777,
          paid: 666,
          person: 12,
          cus: '601e74d42015bb03b6f7ca91',
          level: '6017aa76610c061ff04fc6cf'
        })
      }
    })

//添加验证
const validateOrder = (order: any): any => {
  const Schema = {
    orderid: Joi.number().required().error(new Error('订单号只能为纯数字')),
    tableid: Joi.number().required().error(new Error('桌号只能为纯数字')),
    orderdetail: Joi.object().required().error(new Error('请输入订单信息')),
    receivable: Joi.number().required().error(new Error('应收只能为纯数字')),
    person: Joi.number().required().error(new Error('人数只能为纯数字')),
    paid: Joi.number().required().error(new Error('实收只能为纯数字')),
    level: Joi.string().required().error(new Error('请传入会员等级')),
    waiter: Joi.string().required().error(new Error('请传入服务员'))
  }
  return Joi.validate(order, Schema, {
    abortEarly: false,   //把所有错误检测完再返回
    allowUnknown: true   //允许对象包含被忽略的未知键
  })
}

module.exports = {
  Orders, validateOrder
}
