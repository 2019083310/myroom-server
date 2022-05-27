const fileModel = require('../models/file.model')
const userModel = require('../models/user.model')
const agentModel = require('../models/agent.model')
const config = require('../app/config')
const path = require('path')
const fs = require('fs')

class FileController {
  // ? 用户上传头像
  async saveUserAvatar(ctx, next) {
    // 拿到用户id
    const userId = ctx.user.id
    const {
      newFilename,
      filepath,
      mimetype,
      size
    } = ctx.request.files.avatar; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(filepath);
    let filePath = path.join(__dirname, '../../uploads/user/avatar') + `/${newFilename}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    const tableName = 'avatar_user'
    const foreignKey = 'user_id'

    // 操作数据库
    const result = await fileModel.createAvatar(userId, newFilename, mimetype, size, tableName, foreignKey)

    // 更新用户头像信息
    const avatar_url = `${config.APP_HOST}:${config.APP_PORT}/user/${userId}/avatar`
    await userModel.updateUserAvatar(avatar_url, userId)

    ctx.body = {
      ret: true,
      message: '上传头像成功~'
    }
  }

  // ?经纪人上传头像接口
  async saveAgentAvatar(ctx, next) {
    // 拿到agentId
    const agentId = ctx.user.id
    const {
      newFilename,
      filepath,
      mimetype,
      size
    } = ctx.request.files.avatar; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(filepath);
    let filePath = path.join(__dirname, '../../uploads/agent/avatar') + `/${newFilename}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    const tableName = 'avatar_agent'
    const foreignKey = 'agent_id'

    const result = await fileModel.createAvatar(agentId, newFilename, mimetype, size, tableName, foreignKey)

    // 更新用户头像信息
    const avatar_url = `${config.APP_HOST}:${config.APP_PORT}/agent/${agentId}/avatar`
    await agentModel.updateAgentAvatar(avatar_url, agentId)

    ctx.body = {
      ret: true,
      message: '上传头像成功~'
    }
  }

  // ?经纪人上传图片接口
  async saveHousePicture(ctx, next) {
    const agentId = ctx.user.id
    const {
      newFilename,
      filepath,
      mimetype,
      size
    } = ctx.request.files.picture
    // 创建可读流
    const reader = fs.createReadStream(filepath);
    let filePath = path.join(__dirname, '../../uploads/picture') + `/${newFilename}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    const result = await fileModel.saveHousePicture(agentId, newFilename, mimetype, size)

    ctx.body = {
      ret: true,
      message: '上传图片成功~',
      src: `${config.APP_HOST}:${config.APP_PORT}/user/images/${newFilename}`
    }
  }

  // ?经纪人上传视频接口
  async saveVideoInfo(ctx, next) {
    const agentId = ctx.user.id
    const {
      newFilename,
      filepath,
      mimetype,
      size
    } = ctx.request.files.video
    // 创建可读流
    const reader = fs.createReadStream(filepath);
    let filePath = path.join(__dirname, '../../uploads/video') + `/${newFilename}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    const result = await fileModel.saveHouseVideo(agentId, newFilename, mimetype, size)

    ctx.body = {
      ret: true,
      message: '上传视频成功~',
      src: `${config.APP_HOST}:${config.APP_PORT}/user/video/${newFilename}`
    }
  }

  // ?经纪人上传音频接口
  async saveAudioInfo(ctx, next) {
    const agentId = ctx.user.id
    const {
      newFilename,
      filepath,
      mimetype,
      size
    } = ctx.request.files.audio
    // 创建可读流
    const reader = fs.createReadStream(filepath);
    let filePath = path.join(__dirname, '../../uploads/audio') + `/${newFilename}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    const result = await fileModel.saveHouseAudio(agentId, newFilename, mimetype, size)

    ctx.body = {
      ret: true,
      message: '上传音频成功~',
      src: `${config.APP_HOST}:${config.APP_PORT}/user/audio/${newFilename}`
    }
  }
}

module.exports = new FileController()