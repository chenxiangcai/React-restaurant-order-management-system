const {Schema, model} = require('mongoose');
const Joi = require('joi');

//分类集合规则
const cateSchema: object = new Schema({
    foodTypeName: {
        type: String,
        required: [true, '请输入菜品分类']
    }
}, {versionKey: false}) //忽略增加的文档在数据库中的__v字段

const Category = model('Category', cateSchema);

//添加验证
const validateCategory = (order: object): object => {
    const Schema = {
        foodTypeName: Joi.string().required().error(new Error('请输入菜品分类！')),
    }
    return Joi.validate(order, Schema, {
        abortEarly: false,   //把所有错误检测完再返回
        allowUnknown: true   //允许对象包含被忽略的未知键
    })
}

export = {
    Category, validateCategory
}
