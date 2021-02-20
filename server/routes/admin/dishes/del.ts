const { Dishes } = require('../../../model/Dish/Dish')
export = async (req, res) => {
  const id = req.params.id
  if (id.indexOf('-') !== -1) {
    const ids = id.split('-')
    for (const idElement of ids) {
      await Dishes.findOneAndDelete({ _id: idElement })
    }
  } else {
    await Dishes.findOneAndDelete({ _id: req.params.id })
  }
  res.send({ status: 200 })
}
