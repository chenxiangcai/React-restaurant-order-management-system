const {Category} = require('../../../model/Category/Category')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
    let condition: object = null
    let page = +req.query.page
    let pagesize: number = req.query.pagesize

    if (!page || typeof page !== 'number') page = 1
    if (pagesize == null) pagesize = 10

    // console.log(page,pagesize)
    const category = await pagination(Category).find(condition).page(page).size(pagesize).exec()

    res.send({category, meta: {status: 200, message: '查询成功'}})
}
