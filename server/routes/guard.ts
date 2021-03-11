// @ts-ignore
const { User } = require('../model/User/User')
// @ts-ignore
const jwt = require('jsonwebtoken')
// @ts-ignore
const { secret } = require('../config/key')
const _ = require('lodash')
module.exports = async (req, res, next) => {
  const token = req.headers.authorization
  await jwt.verify(token, secret, async function (err, decode) {
    if (err) {
      res.json({
        msg: '当前用户未登录',
        status: -1
      })
    } else {
      // 证明用户已经登录
      const { _id } = decode
      const user = await User.findOne({ _id })
      if (user.role !== 'admin') {
        const userInfo = _.pick(user, ['_id', 'name', 'role', 'account', 'joinTime'])
        return res.send({
          status: 0,
          msg: '普通用户',
          userInfo
        })
      } else {
        next()
        // const userInfo = _.pick(user, ['_id', 'name','role', 'account', 'joinTime'])
        // res.send({
        //   status: 1,
        //   msg: '管理员',
        //   userInfo
        // })
      }
    }
  })
}
