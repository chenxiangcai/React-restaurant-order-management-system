const { Orders } = require('../../model/Order/Orders')


export = async (ws, req) => {
  ws.on("message", function (msg) {
    ws.send('websocket connected')
    console.log(msg)

    //用于更新
    setInterval(async (_this, ws) => {
      if (msg !== '连接成功') {
        Orders.findOne({ _id: msg }).then(val => {
              if (val) ws.send(JSON.stringify(val))
              else ws.send(-1)
            }
        )
      }
    }, 2000, globalThis, ws)
    console.log('websocket connected')
  })
}
