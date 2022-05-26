const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

// 注入根目录下的env文件
dotenv.config()

//读取生成的密钥key
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, './keys/privat.key'))
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, './keys/public.key'))

const {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD
} = process.env

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY,
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD
}