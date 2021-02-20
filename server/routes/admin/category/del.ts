const { Category } = require('../../../model/Category/Category')
export = async (req, res) => {
  const id = req.params.id
  if (id.indexOf('-') !== -1) {
    const ids = id.split('-')
    for (const idElement of ids) {
      await Category.findOneAndDelete({ _id: idElement })
    }
  } else {
    await Category.findOneAndDelete({ _id: req.params.id })
  }
  res.send({ status: 200 })
}
