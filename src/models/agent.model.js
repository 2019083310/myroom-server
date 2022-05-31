const connection = require('../app/database')

class AgentModel {
  // ? 用户注册
  async register(name, password) {
    const statement = `INSERT INTO agent (name,password) VALUES (?,?);`

    const result = await connection.execute(statement, [name, password])

    return result[0]
  }

  //  ? 判断用户名是否存在
  async getAgentName(name) {
    const statement = `SELECT * FROM agent WHERE name = ?`

    const result = await connection.execute(statement, [name])

    return result[0]
  }

  // ? 判断手机号是否唯一
  async getAgentByPhone(phoneNumber) {
    const statement = `SELECT * FROM agent WHERE phoneNumber = ?;`

    const result = await connection.execute(statement, [phoneNumber])

    return result[0]
  }

  // ? 修改经纪人个人信息
  async updateProfileInfo(phoneNumber, realname, agentId, password, name) {
    let statement
    let result
    if (password === undefined && name === undefined) {
      statement = `UPDATE agent SET realname = ?,phoneNumber = ? WHERE id = ?;`
      result = await connection.execute(statement, [realname, phoneNumber, agentId])
    }
    if (password) {
      statement = `UPDATE agent SET realname = ?,phoneNumber= ?,password= ? WHERE id = ?;`
      result = await connection.execute(statement, [realname, phoneNumber, password, agentId])
    }

    if (name) {
      statement = `UPDATE agent SET realname = ?,phoneNumber= ?,name=? WHERE id = ?;`
      result = await connection.execute(statement, [realname, phoneNumber, name, agentId])
    }

    if (name && password) {
      statement = `UPDATE agent SET realname = ?,phoneNumber= ?,password= ?,name=? WHERE id = ?;`
      result = await connection.execute(statement, [realname, phoneNumber, password, name, agentId])
    }

    return result[0]
  }

  // ?获取经纪人个人信息
  async getProfileInfo(agentId) {
    const statement = `SELECT * FROM agent WHERE id = ?;`

    const result = await connection.execute(statement, [agentId])

    return result[0]
  }

  // ?更新头像信息
  async updateAgentAvatar(avatar_url, agentId) {
    const statement = `UPDATE agent SET avatar_url = ? WHERE id = ?;`
    const result = await connection.execute(statement, [avatar_url, agentId])

    return result[0]
  }

  // ?经纪人发布房源详情
  async releaseHouseResource(agentId, name, price, unitPrice, area, apartment, type, years, renovation, listing, elevator, orientation, introduction) {
    const statement = `INSERT INTO houses_resources (agent_id, name,
      price, unitPrice, area, apartment, type, years, renovation, listing, elevator, orientation, introduction)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`

    const result = await connection.execute(statement, [agentId, name,
      price, unitPrice, area, apartment, type, years, renovation, listing, elevator, orientation, introduction
    ])

    return result[0]
  }

  // ?获取所有经纪人的房源详情信息
  async getAllHouseResourceLists(limit, offset) {
    const statement = `SELECT * FROM houses_resources LIMIT  ? OFFSET  ?;`
    const result = await connection.execute(statement, [limit, offset])

    return result[0]
  }

  // ?获取自己的房源详情信息
  async getPersonHouseResourceLists(agentId, limit, offset) {
    const statement = `SELECT * FROM houses_resources WHERE agent_id = ? LIMIT  ? OFFSET  ?;`
    const result = await connection.execute(statement, [agentId, limit, offset])

    return result[0]
  }

  // ?保存自己创建的项目的数据
  // ?保存画布信息
  async saveHouseProjectActivePanelInfo(agentId, panelId, type, width, height, backgroundColor, name, author) {
    const statement = `INSERT INTO home_project (agent_id, panel_id, type, width, height, backgroundColor,name,author)
     VALUES (?,?,?,?,?,?,?,?);`

    const result = await connection.execute(statement, [agentId, panelId, type, width, height, backgroundColor, name, author])
    return result[0]
  }

  // ?保存文字信息
  async saveProjectFontInfo(id, type, data, color, size, width, height, left, top, homeProjectId) {
    const statement = 'INSERT INTO fontcomponent (font_id,type,data,color,size,width,height,`left`,top,home_project_id) VALUES (?,?,?,?,?,?,?,?,?,?);'

    const result = await connection.execute(statement, [id, type, data, color, size, width, height, left, top, homeProjectId])
    return result[0]
  }

  // ?保存图片信息
  async saveProjectImgInfo(id, type, src, width, height, left, top, homeProjectId) {
    const statement = 'INSERT INTO imgcomponent (img_id,type,src,width,height,`left`,top,home_project_id) VALUES (?,?,?,?,?,?,?,?);'

    const result = await connection.execute(statement, [id, type, src, width, height, left, top, homeProjectId])
    return result[0]
  }

  // ?保存视频信息
  async saveProjectVideoInfo(id, type, src, width, height, left, top, homeProjectId) {
    const statement = 'INSERT INTO videocomponent (video_id,type,src,width,height,`left`,top,home_project_id) VALUES (?,?,?,?,?,?,?,?);'

    const result = await connection.execute(statement, [id, type, src, width, height, left, top, homeProjectId])
    return result[0]
  }

  // ?保存音频相关
  async saveProjectAudioInfo(id, type, src, width, height, left, top, homeProjectId) {
    const statement = 'INSERT INTO audiocomponent (audio_id,type,src,width,height,`left`,top,home_project_id) VALUES (?,?,?,?,?,?,?,?);'

    const result = await connection.execute(statement, [id, type, src, width, height, left, top, homeProjectId])
    return result[0]
  }

  // ?保存卡片信息
  async saveProjectCardInfo(id, type, src, img_width, img_height, width, height, left, top,
    name, soujia, guapai, fangxing, zhuangxiu, mianji, louxing, chaoxiang, niandai, homeProjectId,toid) {
    const statement = 'INSERT INTO cardcomponent (card_id,type,src,width_img,height_img,width,height,`left`,top,`name`,soujia,guapai,fangxing,zhuangxiu,mianji,louxing,chaoxiang,niandai,home_project_id,toid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'

    const result = await connection.execute(statement, [id, type, src, img_width, img_height, width, height, left, top,
      name, soujia, guapai, fangxing, zhuangxiu, mianji, louxing, chaoxiang, niandai, homeProjectId,toid
    ])
    return result[0]
  }

  // ?获取所有的项目信息
  async getAllProjectList() {
    const statement = `SELECT id,name,author,createAt FROM home_project;`

    const result = await connection.execute(statement)
    return result[0]
  }

  // ?删除某个项目的权限
  async isPermission(agentId, projectId) {
    const statement = `SELECT * FROM home_project WHERE id = ? AND agent_id = ?;`

    const result = await connection.execute(statement, [projectId, agentId])

    return result[0]
  }

  // ?删除某个项目
  async removeProjectInfo(projectId) {
    const statement = `DELETE FROM home_project WHERE id = ?;`

    const result = await connection.execute(statement, [projectId])

    return result[0]
  }

  // ?获取某一个项目的具体面板信息
  async getProjectPanelInfo(projectId) {
    const statement = `SELECT name ,author, panel_id id,type,width,height,backgroundColor FROM home_project WHERE id = ?;`
    const result = await connection.execute(statement, [projectId])

    return result[0]
  }

  // ?获取某一个项目具体的文字组件信息
  async getProjectFontInfo(projectId) {
    const statement = 'SELECT font_id id,type,`data`,color,size,width,height,`left`,top FROM fontcomponent WHERE home_project_id = ?;'
    const result = await connection.execute(statement, [projectId])

    return result[0]
  }

  async getFontComInfo(projectId, fontId) {
    const statement = 'SELECT font_id id,type,`data`,color,size,width,height,`left`,top FROM fontcomponent WHERE home_project_id = ? AND font_id = ?;'
    const result = await connection.execute(statement, [projectId, fontId])

    return result[0]
  }

  // ?获取某一个项目具体的图片组件信息
  async getProjectImgInfo(project) {
    const statement = 'SELECT img_id id,type,src,width,height,`left`,top FROM imgcomponent WHERE home_project_id = ?;'

    const result = await connection.execute(statement, [project])

    return result[0]
  }
  async getImgComInfo(project, imgId) {
    const statement = 'SELECT * FROM imgcomponent WHERE home_project_id = ? AND img_id = ?;'

    const result = await connection.execute(statement, [project, imgId])

    return result[0]
  }

  // ?获取某一个项目的视频组件信息
  async getProjectVideoInfo(projectId) {
    const statement = 'SELECT video_id id,type,src,width,height,`left`,top FROM videocomponent WHERE home_project_id = ?;'
    const result = await connection.execute(statement, [projectId])

    return result[0]
  }
  async getVideoComInfo(projectId, videoId) {
    const statement = 'SELECT * FROM videocomponent WHERE home_project_id = ? AND video_id = ?;'
    const result = await connection.execute(statement, [projectId, videoId])

    return result[0]
  }

  // ?获取某一个项目的音频组件信息
  async getProjectAudioInfo(projectId) {
    const statement = 'SELECT audio_id id,type,src,width,height,`left`,top FROM audiocomponent WHERE home_project_id = ?;'
    const result = await connection.execute(statement, [projectId])

    return result[0]
  }
  async getAudioComInfo(projectId, audioId) {
    const statement = 'SELECT * FROM audiocomponent WHERE home_project_id = ? AND audio_id = ?;'
    const result = await connection.execute(statement, [projectId, audioId])

    return result[0]
  }

  // ?获取某一个项目的卡片信息
  async getProjectCardInfo(projectId) {
    const statement = 'SELECT card_id id,type,src,width_img,height_img,width,height,`left`,top,`name`,soujia,guapai,fangxing,zhuangxiu,mianji,louxing,chaoxiang,niandai,toid FROM cardcomponent WHERE home_project_id = ?;'
    const result = await connection.execute(statement, [projectId])

    return result[0]
  }
  async getCardComInfo(projectId, cardId) {
    const statement = 'SELECT * FROM cardcomponent WHERE home_project_id = ? AND card_id = ?;'
    const result = await connection.execute(statement, [projectId, cardId])

    return result[0]
  }

  // ?更新画布信息
  async updateProjectPanelInfo(panelId, type, width, height, backgroundColor, name, author, projectId) {
    const statement = 'UPDATE home_project SET panel_id = ?,type = ?,width = ?,height = ?,backgroundColor = ?,`name` =?,author = ? WHERE id = ?;'
    const result = await connection.execute(statement, [panelId, type, width, height, backgroundColor, name, author, projectId])
    return result[0]
  }

  // ?更新文字组件信息
  async updateProjectFontInfo(id, type, data, color, size, width, height, left, top, projectId, fontId) {
    const statement = 'UPDATE fontcomponent SET font_id = ?,type = ?,`data` = ?,color=?,size=?,width=?,height=?,`left`=?,top=? WHERE home_project_id =? AND font_id=?;'
    const result = await connection.execute(statement, [id, type, data, color, size, width, height, left, top, projectId, fontId])
    return result[0]
  }

  // ?更新图片信息
  async updateProjectImgInfo(id, type, src, width, height, left, top, projectId, imgId) {
    const statement = 'UPDATE imgcomponent SET img_id =?,type=?,src=?,width=?,height=?,`left`=?,top=? WHERE home_project_id = ? AND img_id=?;'
    const result = await connection.execute(statement, [id, type, src, width, height, left, top, projectId, imgId])

    return result[0]
  }

  // ?更新视频信息
  async updateProjectVideoInfo(id, type, src, width, height, left, top, projectId, videoId) {
    const statement = 'UPDATE videocomponent SET video_id =?,type=?,src=?,width=?,height=?,`left`=?,top=? WHERE home_project_id = ? AND video_id=?;'
    const result = await connection.execute(statement, [id, type, src, width, height, left, top, projectId, videoId])

    return result[0]
  }

  // ?更新音频信息
  async updateProjectAudioInfo(id, type, src, width, height, left, top, projectId, audioId) {
    const statement = 'UPDATE audiocomponent SET audio_id =?,type=?,src=?,width=?,height=?,`left`=?,top=? WHERE home_project_id = ? AND audio_id=?;'
    const result = await connection.execute(statement, [id, type, src, width, height, left, top, projectId, audioId])

    return result[0]
  }

  // ?更新卡片信息
  async updateProjectCardInfo(id, type, src, width_img, height_img, width, height, left, top, name, soujia, guapai, fangxing, zhuangxiu,
    mianji, louxing, chaoxiang, niandai, projectId, cardId,toid) {

    const statement = 'UPDATE cardcomponent SET card_id = ?,type=?,src=?,width_img=?,height_img=?,width=?,height=?,`left`=?,top=?,`name`=?,soujia=?,guapai=?,fangxing=?,zhuangxiu=?,mianji=?,louxing=?,chaoxiang=?,niandai=?,toid=? WHERE home_project_id =? AND card_id =?;'
    const result = await connection.execute(statement, [id, type, src, width_img, height_img, width, height, left, top, name, soujia, guapai, fangxing, zhuangxiu,
      mianji, louxing, chaoxiang, niandai,toid, projectId, cardId
    ])
    return result[0]
  }

  // ?获取房源详情
  async getHouseInfo(houseId) {
    const statement = 'SELECT * FROM agent_house WHERE id = ?;'
    const result = await connection.execute(statement, [houseId])

    return result[0]
  }

  // ?获取可用卡片id
  async getEnableHouseInfo() {
    const statement = 'SELECT id,`listing_name` FROM agent_house;'
    const result = await connection.execute(statement)

    return result[0]
  }

}

module.exports = new AgentModel()