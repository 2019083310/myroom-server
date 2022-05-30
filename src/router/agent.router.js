const Router = require('koa-router')

// 路由中间件处理函数
const {
  register,
  login,
  updateProfileInfo,
  getProfileInfo,
  getOnlineUser,
  getAgentAvatar,
  releaseHouseResource,
  getPersonHouseResourceLists,
  getAllHouseResourceLists,
  saveHouseProjectActive,
  getAllProjectList,
  removeProject,
  getPersonProjectInfo,
  updateProjectInfo,
  getHouseInfo,
  getEnableHouseInfo
} = require('../controllers/agent.controller')

// 路由中间件，工具函数
const {
  verifyAgent
} = require('../middleware/verify.agent')
const {
  verifyPermission
} = require('../middleware/verify.permission')

const {
  verifyToken,
  verifyAgentLogin
} = require('../middleware/verifyLogin')

const agentRouter = new Router({
  prefix: '/agent'
})

// 经纪人注册接口
agentRouter.post('/register', verifyAgent, register)

// 经纪人登录接口
agentRouter.post('/login', verifyAgentLogin, login)

// 经纪人获取个人信息接口
agentRouter.get('/profile', verifyToken, getProfileInfo)

// 经纪人修改个人信息接口
agentRouter.patch('/info', verifyToken, updateProfileInfo)

// 查看在线用户
agentRouter.get('/onlineUser', verifyToken, getOnlineUser)

// 经纪人获取头像
agentRouter.get('/:agentId/avatar', getAgentAvatar)

// 经纪人获取可用的房源id
agentRouter.get('/enable/house', verifyToken, getEnableHouseInfo)

// 经纪人选择对应的房源详情
agentRouter.get('/house/:houseId', getHouseInfo)

// 经纪人发布新的房源详情
agentRouter.post('/release', verifyToken, releaseHouseResource)

// 经纪人获取当前房源详情列表--所有
agentRouter.get('/houses/lists', verifyToken, getAllHouseResourceLists)

// 经纪人自己的
agentRouter.get('/houses/list', verifyToken, getPersonHouseResourceLists)

// 经纪人为某个房源详情创建新的活动页
agentRouter.post('/create/project', verifyToken, saveHouseProjectActive)

// 经纪人获取所有的项目
agentRouter.get('/project/list', verifyToken, getAllProjectList)

// 经纪人删除对应的项目
agentRouter.delete('/:projectId/project', verifyToken, verifyPermission, removeProject)

// 点击编辑获取当前项目的面板信息
agentRouter.get('/active/:projectId', verifyToken, getPersonProjectInfo)

// 更新项目页面的信息
agentRouter.put('/update/:projectId', verifyToken, verifyPermission, updateProjectInfo)

module.exports = agentRouter