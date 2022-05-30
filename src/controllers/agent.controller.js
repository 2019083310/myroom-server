const fs = require('fs')
const agentModel = require('../models/agent.model')
const userModel = require('../models/user.model')
const fileModel = require('../models/file.model')

const errorTypes = require('../constants/error.types')
const {
  AVATAR_AGENT_URL
} = require('../constants/file.path')

// jwt生成token
const jwt = require('jsonwebtoken')
const {
  PRIVATE_KEY
} = require('../app/config')
const md5Password = require('../utils/md5password')
class AgentController {
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
    } = await agentModel.register(name, password)

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

  // ? 修改个人信息
  async updateProfileInfo(ctx, next) {
    // 1.拿到用户id和要修改的数据
    const agentId = ctx.user.id
    let password, name

    const {
      realname,
      phoneNumber
    } = ctx.request.body

    // 2.给新密码加密
    if (ctx.request.body.password) {
      password = md5Password(ctx.request.body.password)
    }

    if (ctx.request.body.name) {
      name = ctx.request.body.name
      // ?判断用户名是否重复
      const isAlready = await agentModel.getAgentName(name)
      if (isAlready.length) {
        const error = new Error(errorTypes.NAME_CONFLICT)
        return ctx.app.emit('error', error, ctx)
      }
    }

    // 3.操作数据库
    // 判断手机号是否唯一
    const ret = await agentModel.getAgentByPhone(phoneNumber)
    if (ret.length) {
      const error = new Error(errorTypes.PHONENUMBER_HAS_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await agentModel.updateProfileInfo(phoneNumber, realname, agentId, password, name)

    ctx.body = {
      ret: true,
      message: '修改个人信息成功~'
    }
  }

  // ? 获取个人信息
  async getProfileInfo(ctx, next) {
    // 拿到经纪人id
    const agentId = ctx.user.id

    const [result] = await agentModel.getProfileInfo(agentId)

    const profileInfo = {
      id: result.id,
      name: result.name,
      realname: result.realname,
      phoneNumber: result.phoneNumber,
      avatar_url: result.avatar_url,
      createAt: result.createAt,
      updateAt: result.updateAt
    }
    ctx.body = {
      ret: true,
      message: '获取个人信息成功~',
      profileInfo
    }
  }

  // ?查看在线用户
  async getOnlineUser(ctx, user) {
    const result = await userModel.getUserInfo()

    const newArr = result.map((item) => {
      const newItem = {
        name: item.name,
        realname: item.realname,
        sex: item.sex,
        phoneNumber: item.phoneNumber,
        isLogin: item.isLogin === 1 ? true : false
      }

      return newItem
    })
    ctx.body = newArr
  }

  // ?经纪人获取头像
  async getAgentAvatar(ctx, next) {
    // 获取用户id
    const agentId = ctx.params.agentId
    const tableName = 'avatar_agent'
    const foreignKey = 'agent_id'

    // 获取头像
    const result = await fileModel.getAvatarInfo(tableName, agentId, foreignKey)

    ctx.response.set('content-type', result[result.length - 1].mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_AGENT_URL}/${result[result.length-1].filename}`)
  }

  // ?经纪人发布房源详情
  async releaseHouseResource(ctx, next) {
    // 拿到数据
    const agentId = ctx.user.id
    const {
      name,
      price,
      unitPrice,
      area,
      apartment,
      type,
      years,
      renovation,
      listing,
      elevator,
      orientation,
      introduction
    } = ctx.request.body

    // 操作数据库，存储数据
    try {
      const result = await agentModel.releaseHouseResource(agentId, name,
        price, unitPrice, area, apartment, type, years, renovation, listing, elevator, orientation, introduction)
    } catch (error) {
      console.log(error)
    }
    ctx.body = {
      ret: true,
      message: '操作成功~'
    }
  }

  // ?获取当前经纪人发布的房源详情列表
  async getPersonHouseResourceLists(ctx, next) {
    const agentId = ctx.user.id
    const {
      limit,
      offset
    } = ctx.query

    const result = await agentModel.getPersonHouseResourceLists(agentId, limit, offset)

    const newArr = []
    for (const item of result) {
      const obj = {
        houseResourceId: item.id,
        agentId: item.agent_id,
        houseName: item.name,
        price: item.price,
        unitPrice: item.unitPrice,
        area: item.area,
        type: item.type,
        years: item.years,
        renovation: item.renovation,
        listing: item.listing,
        elevator: item.elevator,
        orientation: item.orientation,
        introduction: item.introduction,
        createTime: item.createAt
      }
      newArr.push(obj)
    }

    ctx.body = {
      ret: true,
      data: newArr,
      message: '获取成功~'
    }
  }

  // ?获取所有经纪人发布的房源详情列表
  async getAllHouseResourceLists(ctx, next) {
    const {
      limit,
      offset
    } = ctx.query
    const result = await agentModel.getAllHouseResourceLists(limit, offset)

    const newArr = []
    for (const item of result) {
      const obj = {
        houseResourceId: item.id,
        agentId: item.agent_id,
        houseName: item.name,
        price: item.price,
        unitPrice: item.unitPrice,
        area: item.area,
        type: item.type,
        years: item.years,
        renovation: item.renovation,
        listing: item.listing,
        elevator: item.elevator,
        orientation: item.orientation,
        introduction: item.introduction,
        createTime: item.createAt
      }
      newArr.push(obj)
    }

    ctx.body = {
      ret: true,
      data: newArr,
      message: '获取成功~'
    }
  }

  // ?经纪人创建活动页项目
  async saveHouseProjectActive(ctx, next) {
    const agentId = ctx.user.id

    let homeProjectId

    const panelInfo = ctx.request.body.data
    const {
      name,
      author
    } = ctx.request.body
    for (const item of panelInfo) {
      if (item.type === 'panel') {
        // 保存画布信息
        const result = await agentModel.saveHouseProjectActivePanelInfo(agentId, item.id,
          item.type, item.width, item.height, item.backgroundColor, name, author)
        homeProjectId = result.insertId
      }
    }
    if (homeProjectId) {
      for (const item of panelInfo) {
        if (item.type === 'panel') {
          continue
        } else if (item.type === 'text') {
          // 保存文字信息
          await agentModel.saveProjectFontInfo(item.id, item.type, item.data, item.color,
            item.size, item.width, item.height, item.left, item.top, homeProjectId)
        } else if (item.type === 'image') {
          // 保存图片信息
          await agentModel.saveProjectImgInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, homeProjectId)
        } else if (item.type === 'video') {
          // 保存视频信息
          await agentModel.saveProjectVideoInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, homeProjectId)
        } else if (item.type === 'audio') {
          // 保存音频信息
          await agentModel.saveProjectAudioInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, homeProjectId)
        } else if (item.type === 'card') {
          // 保存卡片信息
          await agentModel.saveProjectCardInfo(item.id, item.type, item.src, item.width_img, item.height_img,
            item.width, item.height, item.left, item.top, item.name, item.soujia, item.guapai, item.fangxing, item.zhuangxiu,
            item.mianji, item.louxing, item.chaoxiang, item.niandai, homeProjectId, item.toid)
        } else {
          const error = new Error(errorTypes.INSERT_MESSAGE_ERROR)
          return ctx.app.emit('error', error, ctx)
        }
      }
    } else {
      const error = new Error(errorTypes.Missing_PANEL_INFO)
      return ctx.app.emit('error', error, ctx)
    }

    ctx.body = {
      ret: true,
      message: '创建活动页成功~'
    }
  }

  // ?经纪人获取自己创建的活动页项目列表
  async getPersonProjectInfo(ctx, next) {
    const projectId = ctx.params.projectId

    // 1.获取面板信息
    const panelInfo = await agentModel.getProjectPanelInfo(projectId)
    const name = panelInfo[0].name
    const author = panelInfo[0].author
    delete panelInfo[0]['name']
    delete panelInfo[0]['author']
    // 2.获取文字组件信息
    const fontComInfo = await agentModel.getProjectFontInfo(projectId)
    // 3.获取图片组件
    const imgComInfo = await agentModel.getProjectImgInfo(projectId)
    // 4.获取视频组件
    const videoComInfo = await agentModel.getProjectVideoInfo(projectId)
    // 5.获取音频组件信息
    const audioComInfo = await agentModel.getProjectAudioInfo(projectId)
    // 6.获取卡片组件信息
    const cardComInfo = await agentModel.getProjectCardInfo(projectId)

    const finalResult = [...panelInfo, ...fontComInfo, ...imgComInfo, ...videoComInfo, ...audioComInfo, ...cardComInfo]
    ctx.body = {
      ret: true,
      message: '获取成功~',
      name,
      author,
      data: finalResult
    }
  }

  // ?经纪人获取所有的活动列表
  async getAllProjectList(ctx, next) {
    const result = await agentModel.getAllProjectList()

    ctx.body = {
      ret: true,
      message: '获取成功~',
      data: result
    }
  }

  // ?经纪人删除某个项目
  async removeProject(ctx, next) {
    const projectId = ctx.params.projectId

    const result = await agentModel.removeProjectInfo(projectId)

    ctx.body = {
      ret: true,
      message: '删除项目成功~'
    }
  }

  // ?经纪人编辑某个项目
  async updateProjectInfo(ctx, next) {
    const projectId = ctx.params.projectId

    const panelInfo = ctx.request.body.data
    const {
      name,
      author
    } = ctx.request.body
    for (const item of panelInfo) {
      if (item.type === 'panel') {
        // 更新画布信息
        await agentModel.updateProjectPanelInfo(item.id,
          item.type, item.width, item.height, item.backgroundColor, name, author, projectId)
      } else if (item.type === 'text') {
        // 更新文字信息
        // 1.如果这个text组件是存在的
        const fontId = item.id
        const result = await agentModel.getFontComInfo(projectId, fontId)
        if (result.length) {
          await agentModel.updateProjectFontInfo(item.id, item.type, item.data, item.color,
            item.size, item.width, item.height, item.left, item.top, projectId, fontId)
        } else {
          // 2.这个组件是新增的 保存文字信息
          await agentModel.saveProjectFontInfo(item.id, item.type, item.data, item.color,
            item.size, item.width, item.height, item.left, item.top, projectId)
        }
      } else if (item.type === 'image') {
        // 更新图片信息
        // 1.如果图片组件存在
        const imgId = item.id
        const result = await agentModel.getImgComInfo(projectId, imgId)
        if (result.length) {
          await agentModel.updateProjectImgInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, projectId, imgId)
        } else {
          // 2.不存在 保存图片信息
          await agentModel.saveProjectImgInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, projectId)
        }
      } else if (item.type === 'video') {
        // 更新视频信息
        const videoId = item.id
        const result = await agentModel.getVideoComInfo(projectId, videoId)
        if (result.length) {
          await agentModel.updateProjectVideoInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, projectId, videoId)
        } else {
          // 保存视频信息
          await agentModel.saveProjectVideoInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, projectId)
        }
      } else if (item.type === 'audio') {
        // 更新音频信息
        const audioId = item.id
        const result = await agentModel.getAudioComInfo(projectId, audioId)
        if (result.length) {
          await agentModel.updateProjectAudioInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, projectId, audioId)
        } else {
          // 保存音频信息
          await agentModel.saveProjectAudioInfo(item.id, item.type, item.src, item.width, item.height, item.left,
            item.top, projectId)
        }
      } else if (item.type === 'card') {
        // 更新卡片信息
        const cardId = item.id
        const result = await agentModel.getCardComInfo(projectId, cardId)
        if (result.length) {
          await agentModel.updateProjectCardInfo(item.id, item.type, item.src, item.width_img, item.height_img,
            item.width, item.height, item.left, item.top, item.name, item.soujia, item.guapai, item.fangxing, item.zhuangxiu,
            item.mianji, item.louxing, item.chaoxiang, item.niandai, projectId, cardId, item.toid)
        } else {
          // 保存卡片信息
          await agentModel.saveProjectCardInfo(item.id, item.type, item.src, item.width_img, item.height_img,
            item.width, item.height, item.left, item.top, item.name, item.soujia, item.guapai, item.fangxing, item.zhuangxiu,
            item.mianji, item.louxing, item.chaoxiang, item.niandai, projectId, item.toid)
        }
      } else {
        const error = new Error(errorTypes.INSERT_MESSAGE_ERROR)
        return ctx.app.emit('error', error, ctx)
      }
    }

    ctx.body = {
      ret: true,
      message: '更新项目信息成功~'
    }
  }

  // ?获取可用的房源详情id
  async getEnableHouseInfo(ctx, next) {
    const result = await agentModel.getEnableHouseInfo()

    ctx.body = {
      ret: true,
      message: '获取成功~',
      data: result
    }
  }

  // ?经纪人获取房源详情数据
  async getHouseInfo(ctx, next) {
    const houseId = ctx.params.houseId

    const result = await agentModel.getHouseInfo(houseId)

    ctx.body = {
      ret: true,
      message: '获取成功~',
      data: result[0]
    }
  }
}

module.exports = new AgentController()