const { Customer } = require('../../../../model/Customer/Customer')
const { CusCate } = require('../../../../model/Customer/Cate')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
  let condition: object
  let page = +req.query.page
  let pagesize: number = req.query.pagesize

  if (!page || typeof page !== 'number') page = 1
  if (pagesize == null) pagesize = 10
  if (req.query.query !== '') {
    const val: string = req.query.query ?? ''
    condition = { telephone: val }
  }

  const customer = await pagination(Customer).find(condition).page(page).size(pagesize).populate('level').exec()
  const acuscate = await pagination(CusCate).find({}).page(1).size(10).exec()
  res.send({ customer, acuscate, meta: { status: 200, message: '查询成功' } })
}
