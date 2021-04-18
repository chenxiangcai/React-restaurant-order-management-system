const { Schema, model } = require('mongoose');
const Joi = require('joi');

//桌台集合规则
const TableSchema: object = new Schema({
  tableID: {
    type: Number,
    required: true
  },
  //餐桌负责人
  staff: {
    type: Schema.Types.ObjectId,
    required: true
  },
  //可容纳人数
  canSeat: {
    type: Number,
    required: true
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    // default: 1
  },
  status: { //0 使用中 , 1 未使用
    type: Number,
    required: true,
  }
}, { versionKey: false }) //忽略增加的文档在数据库中的__v字段

const Table = model('Table', TableSchema);

//添加验证
const validateTable = (order: object): object => {
  const Schema = {
    tableID: Joi.number().required().error(new Error('请输入餐桌号')),
    staff: Joi.string().required().error(new Error('请输入员工id！')),
    status: Joi.number().required().error(new Error('请输入餐桌状态！')),
    canSeat: Joi.number().required().error(new Error('请输入餐桌可容纳人数！')),

    // orderId: Joi.string().required().error(new Error('请输入订单id！')),
  }
  return Joi.validate(order, Schema, {
    abortEarly: false,   //把所有错误检测完再返回
    allowUnknown: true   //允许对象包含被忽略的未知键
  })
}

export = {
  Table, validateTable
}
