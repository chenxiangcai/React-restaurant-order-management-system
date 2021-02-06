const { Customer, validateCus } = require('../../../../model/Customer/Customer')
export = async (req, res) => {
  try {
    await validateCus(req.fields)
  } catch (e) {
    return res.send({ status: -7, message: e.message })
  }
  let customer = await Customer.findOne({ telephone: req.fields.telephone })
  if (customer) return res.send({ message: '此会员已存在' })
  customer = new Customer(req.fields)
  await customer.save()
  res.send({
    customer,
    status: 200
  })
}
