const { Table, validateTable } = require('../../../model/Table/Table')
export = async (req, res) => {
  let { tableID, staff, status, _id, canSeat } = req.fields
  try {
    validateTable(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }
  if (status == null) status = 1
  const table = await Table.updateOne({ _id: _id }, { status, staff, tableID, canSeat })
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, table
  })

}
