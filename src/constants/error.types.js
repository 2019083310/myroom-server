//400 用户名或者密码不存在
const NAME_OR_PASSWORD_IS_REQUIRED = 'name_or_password_is_required'

// 409用户名冲突
const NAME_CONFLICT = 'name_conflict'

// 409用户名冲突
const PHONENUMBER_HAS_EXISTS = 'phoneNumber_has_exists'

// 400密码错误
const PASSWORD_ERROR = 'password_error'

// 400用户不存在
const USERNAME_IS_NOT_EXISTS = 'username_is_not_exists'

// 401未授权
const UnAuthorization = 'UnAuthorization'

// 400  插入信息错误
const INSERT_MESSAGE_ERROR = 'insert_message_error'

// 400 插入信息错误
const Missing_PANEL_INFO = 'missing_panel_info'

// 401没有权限
const UnAuthorization_MODIFY_PROJECT='unAuthorization_modify_project'

module.exports = {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_CONFLICT,
  PASSWORD_ERROR,
  USERNAME_IS_NOT_EXISTS,
  UnAuthorization,
  PHONENUMBER_HAS_EXISTS,
  INSERT_MESSAGE_ERROR,
  Missing_PANEL_INFO,
  UnAuthorization_MODIFY_PROJECT
}