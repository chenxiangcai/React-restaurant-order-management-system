const { Orders } = require('../../../model/Order/Orders')
export = async (req, res) => {
  const id = req.params.id
  if (id.indexOf('-') !== -1) {
    const ids = id.split('-')
    for (const idElement of ids) {
      await Orders.findOneAndDelete({ _id: idElement })
    }
  } else {
    await Orders.findOneAndDelete({ _id: req.params.id })
  }
  res.send({ status: 200 })
}
