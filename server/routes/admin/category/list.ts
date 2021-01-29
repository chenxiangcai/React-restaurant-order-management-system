const { Category } = require('../../../model/Category/Category')
const { Dishes } = require('../../../model/Dish/Dish')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
    let condition: object = null
    let page = +req.query.page
    let pagesize: number = req.query.pagesize

    if (!page || typeof page !== 'number') page = 1
    if (pagesize == null) pagesize = 10

    const category = await pagination(Category).find(condition).page(page).size(pagesize).exec()

    const acategory = JSON.parse(JSON.stringify(category))
    // 查询菜每个分类关联的菜品数量
    const recordsArray = category.records
    const idsArray = recordsArray.map(value => value._id)
    // const s = await Dishes.find({ category: `${idsArray[0]}` })

    var contactary = []
    let f1 = function (i) {
        return new Promise<void>(async function (resolve, reject) {
            const num = await Dishes.find({ category: `${idsArray[i]}` })
            contactary.push(num.length)
            acategory.records[i].contactnum = num.length
            resolve(num);
        });
    };
    for (let i = 0; i < idsArray.length; i++) {
        await f1(i)
    }

    res.send({ category, acategory, meta: { status: 200, message: '查询成功' } })
}
