const mysql = require('mysql2')
const config = require('./config')

// 创建连接池
const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD
})

// 监听数据库的链接
connection.getConnection((err, conn) => {
  conn.connect(err => {
    if (err) {
      console.log('数据库连接失败~', err)
    } else {
      console.log('数据库连接成功~')
    }
  })
})

module.exports = connection.promise()