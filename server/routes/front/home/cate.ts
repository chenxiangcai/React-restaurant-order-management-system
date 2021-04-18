const { Dishes } = require("../../../model/Dish/Dish")
const { Category } = require('../../../model/Category/Category')

export = async (req, res) => {
  const acategory = await Category.find()


  // 查询每个分类关联的菜品
  const recordsArray = JSON.parse(JSON.stringify(acategory))
  const idsArray = recordsArray.map(value => value._id)

  var dishes = []
  let f1 = function (i) {
    return new Promise<void>(async function (resolve, reject) {
      const dish = await Dishes.find({ category: `${idsArray[i]}` })
      dishes.push(dish)
      resolve(dish);
    });
  };
  console.log(dishes)
  for (let i = 0; i < idsArray.length; i++) {
    await f1(i)
  }

  res.send({ acategory, dishes, meta: { status: 200, message: '查询成功' } })
}
