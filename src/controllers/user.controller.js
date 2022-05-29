const fs = require('fs')
const userModel = require('../models/user.model')
const fileModel = require('../models/file.model')

const errorTypes = require('../constants/error.types')
const {
  AVATAR_USER_URL,
  PICTURE_URL,
  VIDEO_URL,
  AUDIO_URL
} = require('../constants/file.path')

// jwt生成token
const jwt = require('jsonwebtoken')
const {
  PRIVATE_KEY
} = require('../app/config')

const md5Password = require('../utils/md5password')

class UserController {
  // ?注册
  async register(ctx, next) {
    // 获取name,password
    ctx.request.body.password = md5Password(ctx.request.body.password)

    const {
      name,
      password
    } = ctx.request.body

    const {
      insertId
    } = await userModel.register(name, password)

    ctx.body = {
      name,
      id: insertId,
      ret: true,
      message: '注册成功~'
    }
  }

  // ?登录
  async login(ctx, next) {
    const {
      id,
      name
    } = ctx.user

    // 更新数据
    await userModel.updateStatus(id, 1)

    // 生成token
    const token = jwt.sign({
      id,
      name
    }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 10,
      algorithm: 'RS256'
    })


    ctx.body = {
      id,
      name,
      token,
      ret: true,
      message: '恭喜你，登陆成功~'
    }
  }

  // ?修改个人信息
  async updateProfileInfo(ctx, next) {
    // 1.拿到用户id和要修改的数据
    const userId = ctx.user.id
    let password, name

    const {
      realname,
      sex,
      age,
      phoneNumber
    } = ctx.request.body

    // 2.给新密码加密
    if (ctx.request.body.password) {
      password = md5Password(ctx.request.body.password)
    }

    if (ctx.request.body.name) {
      name = ctx.request.body.name
      // ?判断用户名是否重复
      const isAlready = await userModel.getUserName(name)
      if (isAlready.length) {
        const error = new Error(errorTypes.NAME_CONFLICT)
        return ctx.app.emit('error', error, ctx)
      }
    }

    // 3.操作数据库
    // 判断手机号是否唯一
    const ret = await userModel.getUserByPhone(phoneNumber)
    if (ret.length) {
      const error = new Error(errorTypes.PHONENUMBER_HAS_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    try {
      const result = await userModel.updateProfileInfo(phoneNumber, realname, userId, sex, age, password, name)
    } catch (err) {
      console.log(err)
    }

    ctx.body = {
      ret: true,
      message: '修改个人信息成功~'
    }
  }

  // ?获取个人信息
  async getProfileInfo(ctx, next) {
    const userId = ctx.user.id

    const [result] = await userModel.getUserProfileInfo(userId)

    const profileInfo = {
      id: result.id,
      name: result.name,
      realname: result.realname,
      age: result.age,
      sex: result.sex,
      phoneNumber: result.phoneNumber,
      avatar_url: result.avatar_url,
      isLogin: result.isLogin === 1 ? true : false,
      createAt: result.createAt,
      updateAt: result.updateAt
    }

    ctx.body = profileInfo
  }

  // ?用户获取头像
  async getUserAvatar(ctx, next) {
    // 获取用户id
    const userId = ctx.params.userId
    const tableName = 'avatar_user'
    const foreignKey = 'user_id'

    // 获取头像
    const result = await fileModel.getAvatarInfo(tableName, userId, foreignKey)

    ctx.response.set('content-type', result[result.length - 1].mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_USER_URL}/${result[result.length-1].filename}`)
  }

  // ?获取房源详情
  async getApartmentList(ctx, next) {
    const userId = ctx.user.id

    const result = await userModel.getApartmentList()

    ctx.body = {
      ret: true,
      data: result,
      message: '获取成功~'
    }
  }

  // ?获取图片信息
  async getPictureInfo(ctx, next) {
    let filename = ctx.request.params.filename

    const fileInfo = await fileModel.getFileByFilename(filename)

    // ?图片处理
    // const type = ctx.query.type
    // console.log(type)
    // const types = ['small', 'middle', 'large']
    // if (types.some(item => item === type)) {
    //   filename = filename + '-' + type
    // }

    ctx.response.set('content-type', fileInfo[0].mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_URL}/${filename}`)
  }

  // ?获取视频信息
  async getVideoInfo(ctx, next) {
    let filename = ctx.request.params.filename

    const fileInfo = await fileModel.getVideoByName(filename)

    ctx.response.set('content-type', fileInfo[0].mimetype)

    ctx.body = fs.createReadStream(`${VIDEO_URL}/${filename}`)
  }

  // ?获取音频信息
  async getAudioInfo(ctx, next) {
    let filename = ctx.request.params.filename

    const fileInfo = await fileModel.getAudioByName(filename)

    ctx.response.set('content-type', fileInfo[0].mimetype)
    ctx.body = fs.createReadStream(`${AUDIO_URL}/${filename}`)
  }

  // ?根据房源卡片id，获取房源详情数据
  async getHouseInfo(ctx, next) {
    const houseId = ctx.params.houseId

    const result = await userModel.getHouseInfo(houseId)

    ctx.body = {
      ret: true,
      message: '获取信息成功~',
      data: result[0]
    }
  }

  // ?退出登录
  async logout(ctx, next) {
    const userId = ctx.user.id

    const result = await userModel.updateStatus(userId, 0)

    ctx.body = {
      ret: true,
      message: '退出成功~'
    }
  }
}

module.exports = new UserController()