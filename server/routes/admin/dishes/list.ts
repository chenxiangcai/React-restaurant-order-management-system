const { Dishes } = require('../../../model/Dish/Dish')
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

    condition = { name: regex }
  }

  const dish = await pagination(Dishes).find(condition).page(page).size(pagesize).sort('-createAt').populate('category').exec()
  res.send({ dish, meta: { status: 200, message: '查询成功' } })
}
