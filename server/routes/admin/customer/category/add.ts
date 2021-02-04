const { CusCate, validateCusCate } = require('../../../../model/Customer/Cate')
const _ = require('lodash')
export = async (req, res) => {
  try {
    await validateCusCate(req.fields)
  } catch (e) {
    return res.send({ status: -7, message: e.message })
  }
  let cuscate = await CusCate.findOne({ name: req.fields.name })
  if (cuscate) return res.send({ message: '此分类已存在' })
  cuscate = new CusCate(req.fields)
  await cuscate.save()
  res.send({
    data: (_.pick(cuscate, ['name', 'discount'])),
    status: 200
  })
}
