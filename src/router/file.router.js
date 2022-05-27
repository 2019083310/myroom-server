const Router = require('koa-router')

const {
  saveUserAvatar,
  saveAgentAvatar,
  saveHousePicture,
  saveVideoInfo,
  saveAudioInfo
} = require('../controllers/file.controller')

const {
  verifyToken
} = require('../middleware/verifyLogin')

const fileRouter = new Router({
  prefix: '/upload'
})

// 上传头像接口
fileRouter.post('/user/avatar', verifyToken, saveUserAvatar)
fileRouter.post('/agent/avatar', verifyToken, saveAgentAvatar)

// 上传房源图片的接口
fileRouter.post('/picture', verifyToken, saveHousePicture)

// 经纪人上传视频接口
fileRouter.post('/video', verifyToken, saveVideoInfo)

// 经纪人上传音频接口
fileRouter.post('/audio', verifyToken, saveAudioInfo)

module.exports = fileRouter