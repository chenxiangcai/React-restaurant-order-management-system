const {User} = require('../../../model/User/User')
const _ = require('lodash')
export = async (req, res) => {
    const user = await User.findOneAndDelete({_id: req.params.id})
    res.send(_.pick(user, ['_id', 'role', 'joinTime']))
}
