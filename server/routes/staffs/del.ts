const {User} = require('../../model/User/User')
const _ = require('lodash')
export = async (req, res) => {
    console.log(req)
    console.log(req.params)
    console.log(req.params.id)
    const user = await User.findOneAndDelete({_id: req.params.id})
    console.log(user)
    res.send(_.pick(user, ['_id', 'role', 'joinTime']))
}
