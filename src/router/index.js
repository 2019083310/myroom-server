const fs = require('fs')
const path = require('path')

// 读取当前目录下的路由
const useRoutes = function () {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    const router = require(`./${file}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

module.exports = useRoutes