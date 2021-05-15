const svgCaptcha = require('svg-captcha');
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
  res.send(captcha.data);
}
