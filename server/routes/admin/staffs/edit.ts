const { User, validateUser } = require('../../../model/User/User')
export = async (req, res) => {
  let { name, role, status, account } = req.fields
  try {
    validateUser(req.fields)
  } catch (e) {
    return res.send({ status: -1, message: e.message })
  }
  if (status == null) status = 1
  await User.updateOne({ account: account }, { name, role, status, account })
  const user = await User.findOne({ account: account }).select('-password')
  res.send({
    meta: {
      status: 200,
      message: '修改信息成功'
    }, user
  })

}
