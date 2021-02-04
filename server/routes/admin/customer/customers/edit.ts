const { Customer, validateCus } = require('../../../../model/Customer/Customer')
export = async (req, res) => {
  const { _id } = req.fields
  try {
    validateCus(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }
  const cus = await Customer.updateOne({ _id: _id }, { $set: req.fields })
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, cus
  })
}
