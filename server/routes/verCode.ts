const svgCaptcha = require('svg-captcha');
const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto')
//每次验证码生成时，生成公钥和私钥
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

globalThis.privateKey = privateKey

export = async (req, res) => {
  //验证
  const { value } = req.fields
  if (value) {
    if (value == globalThis.verCode) {
      return res.send({
        status: 200
      })
    } else {
      return res.send({
        status: 400
      })
    }
  }

  //生成
  const captcha = svgCaptcha.createMathExpr({
    color: true,
    noise: 2,
    background: '#ced6e0'
  });
  // console.log(captcha.text)
  globalThis.verCode = captcha.text
  res.type('svg');
  res.send({ svg: captcha.data, publicKey });
}
