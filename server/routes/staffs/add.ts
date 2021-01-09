const {User, validateUser} = require('../../model/User/User')
const bcrypt = require('bcrypt')
const _ = require('lodash')
export = async (req, res) => {
    try {
        await validateUser(req.fields)
    } catch (e) {
        return res.send({status: -7, message: e.message})
    }
    let user = await User.findOne({account: req.fields.account})
    // console.log(user)
    if (user) return res.send({message: '此账号已被注册！'})
    const salt = await bcrypt.genSalt(10)
    req.fields.password = await bcrypt.hash(req.fields.password, salt)
    user = new User(req.fields)
    await user.save()
    res.send(_.pick(user, ['_id', 'role', 'status', 'joinTime']))
}
