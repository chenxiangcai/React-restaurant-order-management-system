const {Schema, model} = require('mongoose');
const Joi = require('joi');

//前台 点餐 集合规则
const orderFrontSchema: object = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tabNumber: {
        type: Number,
        required: [true, '请输入桌号！']
    },
    guestNumber: {
        type: Number,
        required: true
    },
    foodName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dishes',
        required: [true, '食物id不存在']
    },
    number: {
        type: Number,
        required: true
    },
    status: { //默认1 已送出 ,0未送出
        type: Number,
        required: true,
        default: 0,
    }
}, {versionKey: false}) //忽略增加的文档在数据库中的__v字段

const OrderFront = model('OrderFront', orderFrontSchema);

//添加验证
const validateOrderFront = (order: object): object => {
    const Schema = {
        foodName: Joi.string().required().error(new Error('请选择菜品')),
        tabNumber: Joi.number().required().error(new Error('请输入桌位号！')),
        guestNumber: Joi.number().required().error(new Error('请输入顾客人数！')),
        number: Joi.number().valid(0, 1).error(new Error('请输入菜品点餐数量！'))
    }
    return Joi.validate(order, Schema, {
        abortEarly: false,   //把所有错误检测完再返回
        allowUnknown: true   //允许对象包含被忽略的未知键
    })
}

export = {
    OrderFront, validateOrderFront
}
