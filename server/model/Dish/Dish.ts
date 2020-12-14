const {Schema, model} = require('mongoose');
const Joi = require('joi');

//菜品集合规则
const dishesSchema: object = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    picture: {
        type: String,
        default: null
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, '请输入菜品分类']
    },
    price: {
        type: Number,
        required: [true, '请输入菜品价格']
    },
    status: { //默认1 未售完 ,0已售完
        type: Number,
        required: true,
        default: 1,
    }
}, {versionKey: false}) //忽略增加的文档在数据库中的__v字段

const Dishes = model('Dishes', dishesSchema);

//添加验证
const validateDishes = (dishes: object): object => {
    const Schema = {
        name: Joi.string().required().min(2).max(4).error(new Error('请输入菜品名！')),
        category: Joi.string().required().error(new Error('请输入菜品分类！')),
        price: Joi.number().required().error(new Error('请输入菜品分类！')),
    }
    return Joi.validate(dishes, Schema, {
        abortEarly: false,   //把所有错误检测完再返回
        allowUnknown: true   //允许对象包含被忽略的未知键
    })
}

export = {
    Dishes, validateDishes
}
