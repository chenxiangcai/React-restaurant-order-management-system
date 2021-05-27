const { Dishes } = require('../../../model/Dish/Dish')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
  let condition: object
  let page = +req.query.page
  let pagesize: number = req.query.pagesize

  if (!page || typeof page !== 'number') page = 1
  if (pagesize == null) pagesize = 10

  if (req.query.query) {
    const search = JSON.parse(req.query.query)
    const name: string = search.name ?? ''
    const category = search.categoryId ?? null
    const regex = new RegExp(escapeRegex(name), 'gi') // 全局匹配规则
    function escapeRegex(text: string) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }

    if (category !== '' && name !== '') {
      condition = {// 多字段匹配
        $and: [
          { name: regex },
          { category: category }
        ]
      }
    } else {
      if (name === '' && category !== '') condition = { category: category }
      else if (category === '' && name !== '') condition = { name: regex }
      else condition = {}
    }
  }

  console.log(condition)

  const dish = await pagination(Dishes).find(condition).page(page).size(pagesize).sort('-createAt').populate('category').exec()
  res.send({ dish, meta: { status: 200, message: '查询成功' } })
}
