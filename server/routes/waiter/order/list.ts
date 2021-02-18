const { Orders } = require('../../../model/Order/Orders')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
  let condition: object = null
  let page: number = +req.query.page
  let pagesize: number = req.query.pagesize

  if (!page || typeof page !== 'number') page = 1
  if (pagesize == null) pagesize = 10

  const dish = await pagination(Orders).find(condition).page(page).size(pagesize).sort('-createAt').populate('category').exec()
  res.send({ dish, meta: { status: 200, message: '查询成功' } })
}
