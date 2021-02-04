const { Customer, validateCus } = require('../../../../model/Customer/Customer')
const { CusCate } = require('../../../../model/Customer/Cate')
const _ = require('lodash')
export = async (req, res) => {
  try {
    await validateCus(req.fields)
  } catch (e) {
    return res.send({ status: -7, message: e.message })
  }
  let user = await CusCate.findOne({ name: req.fields.whoAdd })
  let customer = await Customer.findOne({ foodTypeName: req.fields.foodTypeName })
  if (customer) return res.send({ message: '此顾客已存在' })
  req.fields.whoAdd = user._id
  customer = new Customer(req.fields)
  await customer.save()
  res.send({
    data: (_.pick(customer, ['name'])),
    status: 200
  })
}
