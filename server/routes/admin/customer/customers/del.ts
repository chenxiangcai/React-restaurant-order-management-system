const {Customer} = require('../../../../model/Customer/Customer')
const _ = require('lodash')
export = async (req, res) => {
  const customer = await Customer.findOneAndDelete({_id: req.params.id})
  res.send({
    data: _.pick(customer, ['name']),
    status: 200
  })
}
