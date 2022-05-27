// ?下面是上传头像的配置
// const {
//   AVATAR_AGENT_URL,
//   AVATAR_USER_URL,
//   PICTURE_URL,
//   VIDEO_URL,
//   AUDIO_URL
// } = require('../constants/file.path')

// 头像处理
// const avatarUserUpload = multer({
//   dest: AVATAR_USER_URL
// })
// const avatarAgentUpload = multer({
//   dest: AVATAR_AGENT_URL
// })
// const avatarUserHandler = avatarUserUpload.single('avatar')
// const avatarAgentHandler = avatarAgentUpload.single('avatar')

// // 图片处理
// const pictureUpload = multer({
//   dest: PICTURE_URL
// })
// const pictureHandler = pictureUpload.single('picture')

// // 视频处理
// const videoAgentUpload = multer({
//   dest: VIDEO_URL
// })
// const videoHandler = videoAgentUpload.single('video')

// // 音频处理
// const audioAgentUpload = multer({
//   dest: AUDIO_URL
// })
// const audioHandler = audioAgentUpload.single('audio')

// module.exports = {
//   avatarAgentHandler,
//   avatarUserHandler,
//   pictureHandler,
//   videoHandler,
//   audioHandler
// }