const {Dishes, validateDishes} = require('../../../model/Dish/Dish')
const _ = require('lodash')
export = async (req, res) => {
    try {
        await validateDishes(req.fields)
    } catch (e) {
        return res.send({status: -7, message: e.message})
    }
    let dish = await Dishes.findOne({name: req.fields.name})
    if (dish) return res.send({message: '此菜品已存在'})
    dish = new Dishes(req.fields)
    await dish.save()
    res.send({
        data: (_.pick(dish, ['name', 'category', 'price','number'])),
        status: 200
    })
}
