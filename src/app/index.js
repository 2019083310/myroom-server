const Koa = require('koa')
const cors = require('@koa/cors')
const koaBody = require('koa-body')

// 处理body参数中间件
const bodyParser = require('koa-bodyparser')

const useRoutes = require('../router')
// 错误处理函数
const errorHandle = require('./errorhandle')

const app = new Koa()
app.useRoutes = useRoutes
app.use(cors())

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 1024 * 1024 * 200
  }
}))

app.use(bodyParser())
// 路由中间件
app.useRoutes()
// 抛出错误捕获
app.on('error', errorHandle)

module.exports = app