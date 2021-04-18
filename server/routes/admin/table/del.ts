const { Table } = require('../../../model/Table/Table')
export = async (req, res) => {
  console.log(99999)
  const id = req.params.id
  if (id.indexOf('-') !== -1) {
    const ids = id.split('-')
    for (const idElement of ids) {
      await Table.findOneAndDelete({ _id: idElement })
    }
  } else {
    await Table.findOneAndDelete({ _id: req.params.id })
  }
  res.send({ status: 200 })
}
