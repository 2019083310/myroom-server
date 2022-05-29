const connection = require('../app/database')

class UserModel {
  // 用户注册
  async register(name, password) {
    const statement = `INSERT INTO user (name,password) VALUES (?,?);`

    const result = await connection.execute(statement, [name, password])

    return result[0]
  }

  //  判断用户名是否存在
  async getUserName(name) {
    const statement = `SELECT * FROM user WHERE name = ?`

    const result = await connection.execute(statement, [name])

    return result[0]
  }

  // 更新用户状态
  async updateStatus(userId, statusNumber) {
    const statement = `update user SET isLogin = ? WHERE id = ?;`
    const result = await connection.execute(statement, [statusNumber, userId])

    return result[0]
  }

  // 获取所有在线的用户
  async getUserInfo() {
    const statement = `SELECT * FROM user WHERE isLogin = 1;`

    const result = await connection.execute(statement)
    return result[0]
  }

  // 判断用户手机号是否唯一
  async getUserByPhone(phoneNumber) {
    const statement = `SELECT * FROM user WHERE phoneNumber = ?;`
    const result = await connection.execute(statement, [phoneNumber])

    return result[0]
  }

  // 更新用户信息
  async updateProfileInfo(phoneNumber, realname, userId, sex, age, password, name) {
    let statement
    let result
    if (password === undefined && name === undefined) {
      statement = `UPDATE user SET realname = ?,phoneNumber = ?,sex = ?,age = ? WHERE id = ?;`
      result = await connection.execute(statement, [realname, phoneNumber, sex, age, userId])
    }

    if (name && password) {
      statement = `UPDATE user SET realname = ?,phoneNumber= ?,password= ?,name=?,sex = ?,age = ? WHERE id = ?;`
      result = await connection.execute(statement, [realname, phoneNumber, password, name, sex, age, userId])
    }

    if (password && name === undefined) {
      statement = `UPDATE user SET realname = ?,phoneNumber= ?,password= ?,sex = ?,age = ? WHERE id = ?;`
      result = await connection.execute(statement, [realname, phoneNumber, password, sex, age, userId])
    }

    if (name && password === undefined) {
      statement = `UPDATE user SET realname = ?,phoneNumber= ?,sex = ?,age = ?,name=? WHERE id = ?;`
      result = await connection.execute(statement, [realname, phoneNumber, sex, age, name, userId])
    }

    return result[0]
  }

  // 获取用户个人信息
  async getUserProfileInfo(userId) {
    const statement = `SELECT * FROM user WHERE id = ?;`

    const result = await connection.execute(statement, [userId])

    return result[0]
  }

  // 更新用户头像信息
  async updateUserAvatar(avatar_url, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const result = await connection.execute(statement, [avatar_url, userId])

    return result[0]
  }

  // 获取房源详情
  async getApartmentList() {
    const statement = `SELECT h.id,h.name,h.price,h.unitPrice,h.area,h.apartment,h.type,h.years,h.renovation,h.listing,h.elevator,h.orientation,h.introduction,
    JSON_OBJECT('agentId',a.id,'agentName',a.realname,'agentPhone',a.phoneNumber,'agentAvatar',a.avatar_url) agentInfo,
    (SELECT JSON_ARRAYAGG(CONCAT('http://180.184.74.25:80/user/images/', img.filename)) 
            FROM home_images img WHERE h.id = img.house_id) images
    FROM houses_resources h
    INNER JOIN agent a ON h.agent_id=a.id; `

    const result = await connection.execute(statement)

    return result[0]
  }

  // 获取房源详情信息
  async getHouseInfo(houseId) {
    const statement = 'SELECT * FROM agent_house WHERE id = ?;'
    const result = await connection.execute(statement, [houseId])

    return result[0]
  }
}

module.exports = new UserModel()