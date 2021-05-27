const { Dishes } = require('../../../model/Dish/Dish')
const { Category } = require('../../../model/Category/Category')


export = async (req, res) => {
  const { id } = req.fields
  const catename = await Category.findOne({ _id: id })
  let dishes = await Dishes.find({ category: id })
  dishes = JSON.parse(JSON.stringify(dishes))

  dishes.forEach(val => {
    delete val.category
    val.category = {
      foodTypeName: catename.foodTypeName
    }
  })

  const dish = dishes
  console.log(dish)
  res.send({
    dish
  })
}
