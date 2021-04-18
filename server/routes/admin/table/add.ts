const { Table, validateTable } = require('../../../model/Table/Table')
export = async (req, res) => {
  console.log(req.fields)
  try {
    await validateTable(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }
  let table = await Table.findOne({ tableID: req.fields.tableID })
  if (table) return res.send({ message: '此餐桌号已存在', status: -1 })
  table = new Table(req.fields)
  await table.save()
  res.send({
    status: 1,
    table
  })
}

