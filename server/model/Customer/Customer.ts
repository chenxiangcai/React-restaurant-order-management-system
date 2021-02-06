// @ts-ignore
const { Schema, model } = require('mongoose')
// @ts-ignore
const Joi = require('joi');
//会员集合规则
const cusSchema: object = new Schema({
  telephone: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  joinTime: {
    type: Date,
    default: Date.now
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'CusCate',
    required: true,
  },
  // 消费次数
  xftimes: {
    type: Number,
    default: 0
  },
  // 总消费金额
  xftotal: {
    type: Number,
    default: 0
  },
  status: { //默认1 正常 ,0 挂失, -1 停用
    type: Number,
    required: true,
    enum: [1, 0, -1]
  }
}, { versionKey: false }) //忽略增加的文档在数据库中的__v字段

// @ts-ignore
const Customer = model('Customer', cusSchema);


//会员添加验证
const validateCus = (cus: any): any => {
  const Schema = {
    telephone: Joi.number().required().error(new Error('手机号只能为纯数字！')),
    name: Joi.string().required().error(new Error('请输入会员的正确姓名！')),
    status: Joi.number().valid(0, 1, -1),
  }
  return Joi.validate(cus, Schema, {
    abortEarly: false,   //把所有错误检测完再返回
    allowUnknown: true   //允许对象包含被忽略的未知键
  })
}

module.exports = {
  Customer, validateCus
}
