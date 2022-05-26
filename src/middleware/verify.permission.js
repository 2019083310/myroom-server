const agentModel = require('../models/agent.model')
const errorTypes = require('../constants/error.types')

const verifyPermission = async function (ctx, next) {
  const agentId = ctx.user.id
  const projectId = ctx.params.projectId
  const result = await agentModel.isPermission(agentId, projectId)

  if (!result.length) {
    const error = new Error(errorTypes.UnAuthorization_MODIFY_PROJECT)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  verifyPermission
}