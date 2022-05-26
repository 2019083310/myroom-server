const Router = require('koa-router')

const {
  saveUserAvatar,
  saveAgentAvatar,
  saveHousePicture,
  saveVideoInfo,
  saveAudioInfo
} = require('../controllers/file.controller')

// 头像上传处理函数
const {
  avatarAgentHandler,
  avatarUserHandler,
  pictureHandler,
  videoHandler,
  audioHandler
} = require('../middleware/file.middleware')

const {
  verifyToken
} = require('../middleware/verifyLogin')

const fileRouter = new Router({
  prefix: '/upload'
})

// 上传头像接口
fileRouter.post('/user/avatar', verifyToken, avatarUserHandler, saveUserAvatar)
fileRouter.post('/agent/avatar', verifyToken, avatarAgentHandler, saveAgentAvatar)

// 上传房源图片的接口
fileRouter.post('/picture', verifyToken, pictureHandler, saveHousePicture)

// 经纪人上传视频接口
fileRouter.post('/video', verifyToken, videoHandler, saveVideoInfo)

// 经纪人上传音频接口
fileRouter.post('/audio', verifyToken, audioHandler, saveAudioInfo)

module.exports = fileRouter