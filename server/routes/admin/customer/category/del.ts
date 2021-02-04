const {CusCate} = require('../../../../model/Customer/Cate')
const _ = require('lodash')
export = async (req, res) => {
  const cuscate = await CusCate.findOneAndDelete({_id: req.params.id})
  res.send({
    data: _.pick(cuscate, ['name', 'discount']),
    status: 200
  })
}
