const { Customer } = require("../../../model/Customer/Customer")

export = async (req, res) => {
  const { telephone } = req.fields
  const cus = await Customer.findOne({ telephone: telephone }).populate('level')
  if (!cus) return res.send({
    status: 400,
    message: '查询失败'
  })

  res.send({ cus, meta: { status: 200, message: '查询成功' } })
}
