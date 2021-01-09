const {User, validateUser} = require('../../model/User/User')
export = async (req, res) => {
    console.log(req.fields)
    const {name, role, status, account} = req.fields
    try {
        validateUser(req.fields)
    } catch (e) {
        return res.send({status: -1, message: e.message})
    }
    await User.updateOne({account: account}, {name, role, status, account})
    res.send({
        meta: {
            status: 200,
            message: '修改信息成功'
        }
    })

}
