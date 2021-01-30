const {Dishes, validateDishes} = require('../../../model/Dish/Dish')
//const {Category} = require('../../../model/Category/Category')
export = async (req, res) => {
    const {_id} = req.fields
    console.log(req.fields)
    try {
        validateDishes(req.fields)
    } catch (e) {
        return res.send({status: -1, message: e.message})
    }
    //const category = await Category.findOne({_id: categoryId})
    //console.log(category)
    const dish = await Dishes.updateOne({_id: _id}, {$set: req.fields})
    res.send({
        meta: {
            status: 200,
            message: '修改信息成功'
        }, dish
    })
}
