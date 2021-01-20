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
        // type: String,
        required: [true, '请输入菜品分类']
    },
    price: {
        type: Number,
        required: [true, '请输入菜品价格']
    },
     number: {
        type: Number,
        required: true,
        // default: 1,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false}) //忽略增加的文档在数据库中的__v字段

const Dishes = model('Dishes', dishesSchema);

//添加验证
const validateDishes = (dishes: object): object => {
    const Schema = {
        name: Joi.string().required().error(new Error('请输入菜品名！')),
        category: Joi.string().required().error(new Error('请输入菜品分类！')),
        price: Joi.number().required().error(new Error('请输入菜品价格！')),
        number:Joi.number().required().error(new Error('请输入菜品库存'))
    }
    return Joi.validate(dishes, Schema, {
        abortEarly: false,   //把所有错误检测完再返回
        allowUnknown: true   //允许对象包含被忽略的未知键
    })
}

/*//初始化菜品
Dishes.findOne({name: '这是一个测试菜品2'}).then(
    async (result: null | object): Promise<void> => {
        if (result == null) {
            await Dishes.create({
                name: '回锅肉',
                picture: '',
                category: '5ff97c1fffe1551a78f01fb4',
                price: 77,
                number: 888
            })
        }
    })*/


export = {
    Dishes, validateDishes
}
