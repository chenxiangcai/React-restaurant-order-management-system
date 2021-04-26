const {CusCate, validateCusCate} = require('../../../../model/Customer/Cate')
export = async (req, res) => {
  const {_id} = req.fields

  try {
    validateCusCate(req.fields)
  } catch (e) {
    return res.send({status: -1, message: e.message})
  }
  const cuscate = await CusCate.updateOne({_id: _id}, {$set: req.fields})
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, cuscate
  })
}
