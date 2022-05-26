const errorTypes = require('../constants/error.types')

const errorHandle = function (error, ctx) {
  let status
  let message
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 //400 用户输入错误
      message = '用户名或密码错误'
      break
    case errorTypes.NAME_CONFLICT:
      status = 409 //409 发生冲突
      message = '用户名已存在'
      break
    case errorTypes.PASSWORD_ERROR:
      status = 400 //400 发生冲突
      message = '用户名或者密码错误'
      break
    case errorTypes.USERNAME_IS_NOT_EXISTS:
      status = 400 //400 发生冲突
      message = '用户名不存在'
      break
    case errorTypes.UnAuthorization:
      status = 401 //401 
      message = '用户未认证~'
      break
    case errorTypes.PHONENUMBER_HAS_EXISTS:
      status = 409 //409 发生冲突
      message = '手机号已经被注册~'
      break
    case errorTypes.INSERT_MESSAGE_ERROR:
      status = 400 //400 信息错误
      message = '插入信息错误~'
      break
    case errorTypes.Missing_PANEL_INFO:
      status = 400 //400 信息错误
      message = '缺少面板信息~'
      break
    case errorTypes.UnAuthorization_MODIFY_PROJECT:
      status = 401 //401 没有权限
      message = '对不起您没有权限修改删除他人的项目~'
      break
    default:
      status = 404 //路径错误
      message = 'Not Found'
  }

  ctx.status = status
  ctx.body = {
    ret: false,
    message
  }
}

module.exports = errorHandle