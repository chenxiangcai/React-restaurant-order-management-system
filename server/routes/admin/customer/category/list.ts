const { CusCate } = require('../../../../model/Customer/Cate')
const {Customer} = require('../../../../model/Customer/Customer')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
    let condition: object = null
    let page = +req.query.page
    let pagesize: number = req.query.pagesize

    if (!page || typeof page !== 'number') page = 1
    if (pagesize == null) pagesize = 10

    const cuscate = await pagination(CusCate).find(condition).page(page).size(pagesize).exec()

    const acuscate = JSON.parse(JSON.stringify(cuscate))
    // 每个分类关联的用户数量
    const recordsArray = cuscate.records
    const idsArray = recordsArray.map(value => value._id)
    // const s = await Dishes.find({ category: `${idsArray[0]}` })

    var contactary = []
    let f1 = function (i) {
        return new Promise<void>(async function (resolve, reject) {
            const num = await Customer.find({ level: `${idsArray[i]}` })
            contactary.push(num.length)
            acuscate.records[i].contactnum = num.length
            resolve(num);
        });
    };
    for (let i = 0; i < idsArray.length; i++) {
        await f1(i)
    }

    res.send({acuscate, meta: { status: 200, message: '查询成功' } })
}
