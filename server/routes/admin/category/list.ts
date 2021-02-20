const { Category } = require('../../../model/Category/Category')
const { Dishes } = require('../../../model/Dish/Dish')
const { User } = require('../../../model/User/User')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
  let condition: object
  let page = +req.query.page
  let pagesize: number = req.query.pagesize

  if (!page || typeof page !== 'number') page = 1
  if (pagesize == null) pagesize = 10
  if (req.query.query !== '') {
    const val: string = req.query.query ?? ''
    const regex = new RegExp(escapeRegex(val), 'gi') // 全局匹配规则
    function escapeRegex(text: string) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }

    condition = { foodTypeName: regex }
  }

  const category = await pagination(Category).find(condition).page(page).size(pagesize).exec()

  const acategory = JSON.parse(JSON.stringify(category))
  // 查询每个分类关联的菜品数量
  const recordsArray = category.records
  const idsArray = recordsArray.map(value => value._id)
  const usersArray = recordsArray.map(val => val.whoAdd)
  // const s = await Dishes.find({ category: `${idsArray[0]}` })

  var contactary = []
  let f1 = function (i) {
    return new Promise<void>(async function (resolve, reject) {
      const num = await Dishes.find({ category: `${idsArray[i]}` })
      const user = await User.findOne({ _id: `${usersArray[i]}` })
      contactary.push(num.length)
      acategory.records[i].contactnum = num.length
      acategory.records[i].whoAdd = user.name
      resolve(num);
    });
  };
  for (let i = 0; i < idsArray.length; i++) {
    await f1(i)
  }

  res.send({ acategory, meta: { status: 200, message: '查询成功' } })
}
