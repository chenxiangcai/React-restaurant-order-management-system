const qr_image = require('qr-image');
const { Table } = require('../model/Table/Table')
export = async (req, res) => {
  const id = req.params.id;

  //  多张二维码
  if (id === 'all') {
    const urls = []
    //找出所有餐桌id 进行二维码生成
    const table = await Table.find().sort('tableID')
    const tableIDS = table.map(value => value.tableID)
    tableIDS.map(value => {
      var qr_png = qr_image.imageSync(`https://trylive.top/#/prehome/${value}`, { type: 'png' });
      const base64 = Buffer.from(qr_png).toString('base64')
      urls.push({
        id: value,
        url: base64
      })
      return urls
    })
    return res.send({
      meta: { status: 201 },
      qrarray: urls
    })
  }

  //单张二维码
  var qr_png = qr_image.imageSync(`https://trylive.top/#/prehome/${id}`, { type: 'png' });
  qr_png.id = id
  // console.log(qr_png)
  const base64 = Buffer.from(qr_png).toString('base64')
  res.send({
    url: base64,
    id: qr_png.id,
    meta: { status: 200 }
  })
}
