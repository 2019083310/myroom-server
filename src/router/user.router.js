const Router = require('koa-router')

// 路由中间件处理函数
const {
  register,
  login,
  updateProfileInfo,
  getProfileInfo,
  logout,
  getUserAvatar,
  getApartmentList,
  getPictureInfo,
  getVideoInfo,
  getAudioInfo,
  getHouseInfo
} = require('../controllers/user.controller')

// 路由中间件，工具函数
const {
  verifyUser
} = require('../middleware/verify.user')

const {
  verifyLogin,
  verifyToken,
} = require('../middleware/verifyLogin')

const userRouter = new Router({
  prefix: '/user'
})

// 用户注册接口
userRouter.post('/register', verifyUser, register)

// 用户登录接口
userRouter.post('/login', verifyLogin, login)

// 用户修改个人信息接口
userRouter.patch('/profile', verifyToken, updateProfileInfo)

// 获取用户个人信息接口
userRouter.get('/info', verifyToken, getProfileInfo)

// 用户获取头像接口
userRouter.get('/:userId/avatar', getUserAvatar)

// 用户获取房源详情
userRouter.get('/apartment', verifyToken, getApartmentList)

// 用户获取图片
userRouter.get('/images/:filename', getPictureInfo)

// 用户获取视频
userRouter.get('/video/:filename', getVideoInfo)

// 用户获取视频
userRouter.get('/audio/:filename', getAudioInfo)

// 用户根据房源卡片id，获取房源详情信息
userRouter.get('/house/:houseId',getHouseInfo)

// 退出登录接口
userRouter.post('/logout', verifyToken, logout)

module.exports = userRouter