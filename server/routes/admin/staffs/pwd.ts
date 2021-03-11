// @ts-ignore
const { User } = require('../../../model/User/User')
// @ts-ignore
const jwt = require('jsonwebtoken')
// @ts-ignore
const { secret } = require('../../../config/key')
const bcrypt = require('bcrypt')
// @ts-ignore
const Joi = require('joi')
module.exports = async (req, res) => {
  const token = req.headers.authorization
  jwt.verify(token, secret, async function (err, decode) {
    if (err) return res.send({ message: '请先登录' })
    else {
      // 证明用户已经登录
      const { _id } = decode // 解密出加密的token信息
      const user = await User.findOne({ _id })
      const userPwd = user.password
      const { lastPwd, newPwd, confirmPwd } = req.fields
      const Schema = {
        newPwd: Joi.string().required().regex(/^[0-9a-zA-Z]{3,}$/).error(new Error('请输入3位以上的密码'))
      }
      if (await bcrypt.compare(lastPwd, userPwd)) { // 输入密码与正确密码比对
        if (newPwd == confirmPwd) { // 新密码比对成功
          if (await bcrypt.compare(newPwd, userPwd)) return res.send({ message: '新旧密码一致，无需更改' })// 输入的新旧密码比对
          const { error } = Joi.validate(req.fields, Schema, { allowUnknown: true })
          if (error) return res.send({ message: error.message })
          const salt = await bcrypt.genSalt(10)
          const password = await bcrypt.hash(newPwd, salt)
          await User.updateOne({ _id }, { password: password })
          res.send({ message: '密码修改成功' })
        } else {
          return res.send({ message: '两次输入密码不一致，请重新输入' })
        }
      } else {
        return res.send({ message: '初始密码错误，请输入正确的密码' })
      }
    }
  })
}
