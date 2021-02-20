const {Customer} = require('../../../../model/Customer/Customer')
export = async (req, res) => {
  const id = req.params.id
  if (id.indexOf('-') !== -1) {
    const ids = id.split('-')
    for (const idElement of ids) {
      await Customer.findOneAndDelete({ _id: idElement })
    }
  } else {
    await Customer.findOneAndDelete({ _id: req.params.id })
  }
  res.send({ status: 200 })
}
