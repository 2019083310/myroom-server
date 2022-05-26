const connection = require('../app/database')

class FileModel {
  // ? 保存头像信息
  async createAvatar(userId, filename, mimetype, size, tableName, foreignKey) {
    const statement = `INSERT INTO ${tableName} (filename,mimetype,size,${foreignKey}) VALUES (?,?,?,?);`

    const result = await connection.execute(statement, [filename, mimetype, size, userId])

    return result[0]
  }

  // ? 获取头像信息
  async getAvatarInfo(tableName, userId, foreignKey) {
    const statement = `SELECT * FROM ${tableName} WHERE  ${foreignKey} = ?;`
    const result = await connection.execute(statement, [userId])

    return result[0]
  }

  // ?保存图片信息
  async saveHousePicture(agentId, filename, mimetype, size) {
    const statement = `INSERT INTO home_images (filename,mimetype,size,agent_id) VALUES (?,?,?,?);`

    const result = await connection.execute(statement, [filename, mimetype, size, agentId])

    return result[0]
  }

  // ?获取图片根据filename
  async getFileByFilename(filename) {
    const statement = `SELECT * FROM home_images WHERE filename = ?;`

    const result = await connection.execute(statement, [filename])

    return result[0]
  }

  // ?保存视频信息
  async saveHouseVideo(agentId, filename, mimetype, size) {
    const statement = `INSERT INTO home_video (filename,mimetype,size,agent_id) VALUES (?,?,?,?);`

    const result = await connection.execute(statement, [filename, mimetype, size, agentId])

    return result[0]
  }

  // ?获取视频信息
  async getVideoByName(filename) {
    const statement = `SELECT * FROM home_video WHERE filename = ?;`

    const result = await connection.execute(statement, [filename])

    return result[0]
  }

  //?保存音频信息
  async saveHouseAudio(agentId, filename, mimetype, size) {
    const statement = `INSERT INTO home_audio (filename,mimetype,size,agent_id) VALUES (?,?,?,?);`

    const result = await connection.execute(statement, [filename, mimetype, size, agentId])

    return result[0]
  }

  // ?获取音频信息
  async getAudioByName(filename) {
    const statement = `SELECT * FROM home_audio WHERE filename = ?;`

    const result = await connection.execute(statement, [filename])

    return result[0]
  }
}

module.exports = new FileModel()