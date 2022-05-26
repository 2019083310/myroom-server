const app = require('./app')

// 注入环境变量
const config = require('./app/config')

// 启动数据库
require('./app/database')

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功~`)
})