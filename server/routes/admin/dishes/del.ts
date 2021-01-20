const {Dishes} = require('../../../model/Dish/Dish')
const _ = require('lodash')
export = async (req, res) => {
    const dish = await Dishes.findOneAndDelete({_id: req.params.id})
    res.send({
        data: _.pick(dish, ['name', 'category', 'price']),
        status: 200
    })
}
