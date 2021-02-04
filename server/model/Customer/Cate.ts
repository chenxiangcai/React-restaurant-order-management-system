// @ts-ignore
const { Schema, model } = require('mongoose')
// @ts-ignore
const Joi = require('joi');
//会员分类集合规则
const cusCateSchema: object = new Schema({
  discount: {
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
  }
}, { versionKey: false }) //忽略增加的文档在数据库中的__v字段

// @ts-ignore
const CusCate = model('CusCate', cusCateSchema);


//添加验证
const validateCusCate = (cusCate: any): any => {
  const Schema = {
    discount: Joi.number().required().error(new Error('手机号只能为纯数字！')),
    name: Joi.string().required().error(new Error('请输入正确的分类格式！')),
  }
  return Joi.validate(cusCate, Schema, {
    abortEarly: false,   //把所有错误检测完再返回
    allowUnknown: true   //允许对象包含被忽略的未知键
  })
}

module.exports = {
  CusCate, validateCusCate
}
