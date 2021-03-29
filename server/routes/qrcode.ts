const qr_image = require('qr-image');

export = (req, res, next) => {
  // var temp_qrcode = qr_image.image('http://localhost:3000/prehome');
  // Buffer.alloc(temp_qrcode).toString('base64')
  var qr_svg = qr_image.imageSync('http://localhost:3000/prehome', { type: 'svg' });
  const base64 = Buffer.from(qr_svg).toString('base64')
  res.send({
    url: base64,
    meta: { status: 200 }
  })
  // temp_qrcode.pipe(res);
}
