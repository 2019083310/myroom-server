const userModel = require('../models/user.model')

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_CONFLICT
} = require('../constants/error.types')

const verifyUser = async function (ctx, next) {
  // 1.获取用户输入的账号密码
  const {
    name,
    password
  } = ctx.request.body

  // 2.判断是否为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户名是否冲突
  const result = await userModel.getUserName(name)
  if (result.length) {
    const error = new Error(NAME_CONFLICT)
    return ctx.app.emit('error', error, ctx)
  }

  // 4.执行下一个中间件
  // ?注意：这里中间件的Next函数必须是await ,Koa里面的洋葱模型，我们ctx.body的内容并不会立即返回
  // ?而是遵循洋葱模型的概念，显示一层一层往里走，执行完之后，一层一层往外走，走完之后，才会返回结果
  await next()
}

module.exports = {
  verifyUser
}