const { User } = require('../../../model/User/User')
export = async (req, res) => {
  const id = req.params.id
  if (id.indexOf('-') !== -1) {
    const ids = id.split('-')
    for (const idElement of ids) {
      await User.findOneAndDelete({ _id: idElement })
    }
  } else {
    await User.findOneAndDelete({ _id: req.params.id })
  }
  res.send({ status: 200 })
}
