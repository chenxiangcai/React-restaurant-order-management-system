// @ts-ignore
const { Schema, model } = require('mongoose')
// @ts-ignore
const Joi = require('joi');
//订单集合规则
const orderSchema: object = new Schema({
  orderid: {
    type: Number,
    required: true,
    unique: true
  },
  tableid: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
  person: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String
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
    default: Date.now
  },
  finishtime: {
    type: Date,
    // default: Date.now
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'CusCate',
  },
  cus: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  receivable: {
    type: Number,
    // required: true
    default: 0
  },
  paid: {
    type: Number,
    default: 0
  },
  //出餐状态   0未完成/1已完成/2已付款/3未付款
  status: {
    type: Number,
    default: 0
  },
}, { versionKey: false }) //忽略增加的文档在数据库中的__v字段

// @ts-ignore
const Orders = model('Orders', orderSchema);

//添加验证
const validateOrder = (order: any): any => {
  const Schema = {
    orderid: Joi.number().required().error(new Error('订单号只能为纯数字')),
    tableid: Joi.string().required().error(new Error('请输入餐桌订单号')),
    orderdetail: Joi.array().required().error(new Error('请输入订单信息')),
    // receivable: Joi.number().required().error(new Error('应收只能为纯数字')),
    person: Joi.number().required().error(new Error('人数只能为纯数字')),
    // paid: Joi.number().required().error(new Error('实收只能为纯数字')),
    // level: Joi.string().required().error(new Error('请传入会员等级')),
    waiter: Joi.string().required().error(new Error('请传入服务员')),
    // cus: Joi.string().required().error(new Error('请传入顾客id')),
  }
  return Joi.validate(order, Schema, {
    abortEarly: false,   //把所有错误检测完再返回
    allowUnknown: true   //允许对象包含被忽略的未知键
  })
}

module.exports = {
  Orders, validateOrder
}
