const { Table } = require('../../../model/Table/Table')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
  let condition: object
  let page = +req.query.page
  let pagesize: number = req.query.pagesize

  if (!page || typeof page !== 'number') page = 1
  if (pagesize == null) pagesize = 32
  if (req.query.query !== '') {
    const val: string = req.query.query ?? ''
    const regex = new RegExp(escapeRegex(val), 'gi') // 全局匹配规则
    function escapeRegex(text: string) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }

    condition = { name: regex }
  }

  // console.log(page,pagesize)
  let table = await pagination(Table).find({}).page(page).size(pagesize).exec()
  table.records = table.records.sort((a: any, b: any) => a.tableID - b.tableID)


  res.send({ table, meta: { status: 200, message: '查询成功' } })
}
