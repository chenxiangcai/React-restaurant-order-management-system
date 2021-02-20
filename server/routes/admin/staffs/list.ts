const {User} = require('../../../model/User/User')
const pagination = require('mongoose-sex-page')

export = async (req, res) => {
    let condition: object
    let page = +req.query.page
    let pagesize: number = req.query.pagesize

    if (!page || typeof page !== 'number') page = 1
    if (pagesize == null) pagesize = 10
    if (req.query.query !== '') {
        const val: string = req.query.query ?? ''
        const regex = new RegExp(escapeRegex(val), 'gi') // 全局匹配规则
        function escapeRegex(text: string) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
        }

        condition = { name: regex }
    }

    // console.log(page,pagesize)
    const user = await pagination(User).find(condition).page(page).size(pagesize).select('-password').sort('-joinTime').exec()

    res.send({user, meta: {status: 200, message: '查询成功'}})
}
