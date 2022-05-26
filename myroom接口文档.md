##  API V1 接口说明

- 接口基准地址：`http://180.184.74.25:80`
- 服务端暂时开启 CORS 跨域支持
- API V1 认证统一使用 Token 认证(token有效1天)
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `Bearer token` 令牌
- 数据返回格式统一使用 JSON

##  支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。

##  通用返回状态说明

| *状态码* | *含义*                | *说明*                               |
| -------- | --------------------- | ------------------------------------ |
| 200      | OK                    | 请求成功                             |
| 201      | CREATED               | 创建成功                             |
| 204      | DELETED               | 删除成功                             |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数 |
| 401      | UNAUTHORIZED          | 未授权                               |
| 403      | FORBIDDEN             | 被禁止访问                           |
| 404      | NOT FOUND             | 请求的资源不存在                     |
| 409      | CONFLICT              | 发生冲突                             |
| 500      | INTERNAL SERVER ERROR | 内部错误                             |

## 客户子系统

### 注册

- 请求路径：/user/register
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注                |
| -------- | -------- | ------------------- |
| name     | 用户名   | 不能为空            |
| password | 密码     | 不能为空,字符串类型 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| id     | 用户 ID  |      |
| name   | 用户名   |      |
| ret    | 注册成功 | true |

- 响应数据

```json
{
    "name": "weilat",
    "id": 7,
    "ret": true
}

//如果不成功
status也会有相应的返回
{
    "ret": false,//表示注册失败
    "message": "用户名已存在"
}
```

### 登录

- 请求路径：/user/login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| name     | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名  | 参数说明       | 备注     |
| ------- | -------------- | -------- |
| id      | 用户 ID        |          |
| name    | 用户名         |          |
| ret     | true           | 登陆成功 |
| message | 恭喜你登录成功 |          |
| token   | 暂时设置一天   |          |

- 响应数据

```json
{
    "id": 10,
    "name": "wei",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid2VpIiwiaWF0IjoxNjUzMjc1NDIwLCJleHAiOjE2NTQxMzk0MjB9.OWymZF9HDc0-kfWslyvIHBdAjg1ukBG6fcsrzolO2_3ecbeY1epPKJ-IvXzIeSVrcz8W-c42cwSN2xocT6Eg2Y3FvDjPyQh6_Mf0hT9X-mTxex91kbCROR-Ycz0IgfhCOwm5HHj1isAVhsEXvvKxFsSaMU9w4tILVu-6QPx8Luo",
    "ret": true,
    "message": "恭喜你，登陆成功~"
}
```

### 获取个人信息

- 请求路径：/user/info
- 请求方法：get
- 请求参数

| 参数名                       | 参数说明     | 备注     |
| ---------------------------- | ------------ | -------- |
| headers中的authorization字段 | Bearer token | 不能为空 |

- 响应参数

  | 参数名      | 参数说明 | 备注              |
  | ----------- | -------- | ----------------- |
  | id          | 用户id   |                   |
  | name        | 用户名   | 登陆成功          |
  | realname    | 真实姓名 |                   |
  | age         | 年龄     |                   |
  | sex         | 性别     | male男  female 女 |
  | phoneNumber | 手机号   | 整数              |
  | avatar_url  | 头像url  | url地址           |
  | isLogin     | 是否在线 | 1  在线  0 不在线 |

- 响应数据

  ```json
  {
      "id": 1,
      "name": "kobe",
      "realname": null,
      "age": null,
      "sex": null,
      "phoneNumber": null,
      "avatar_url": null,
      "isLogin": false,
      "createAt": "2022-05-21T14:12:04.000Z",
      "updateAt": "2022-05-23T15:40:08.000Z"
  }
  ```

### 修改个人信息

- 请求路径：/user/info
- 请求方法：patch
- 请求参数

| 参数名                       | 参数说明                | 备注           |
| ---------------------------- | ----------------------- | -------------- |
| headers中的authorization字段 | Bearer token            |                |
| realname                     | 用户真实姓名            | 不能为空       |
| sex                          | 性别 male 男  female 女 | 不能为空       |
| age                          | 年龄  整数              | 不能为空       |
| phoneNumber                  | 手机号                  | 整数  不能为空 |
| password                     | 可选                    |                |
| Name                         | 可选                    |                |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "修改个人信息成功~"
  }
  ```

### 头像上传

- 请求路径：/upload/user/avatar
- 请求方法：post
- 请求参数

| 参数名                       | 参数说明                  | 备注     |
| ---------------------------- | ------------------------- | -------- |
| headers中的authorization字段 | Bearer token              |          |
| avatar                       | 图片文件    form-data格式 | 不能为空 |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "上传头像成功~"
  }
  ```

### 获取房源列表中的图片信息

- 请求路径：/user/images/:filename
- 请求方法：get
- 请求参数

| 参数名   | 参数说明                                           | 备注                |
| -------- | -------------------------------------------------- | ------------------- |
| filename | filename是params中的字段                           |                     |
| type     | small 320px\| middle 640px\|large1280px  为空 原图 | type为query中的字段 |

- 响应参数---就是图片

- 响应数据

  ```json
  图片
  ```

### 获取房源列表信息----具体的看相应数据有说明

- 请求路径：/user/apartment
- 请求方法：get
- 请求参数

| 参数名                       | 参数说明         | 备注     |
| ---------------------------- | ---------------- | -------- |
| name                         | 用户名           | 不能为空 |
| password                     | 密码             | 不能为空 |
| headers中的authorization字段 | 携带Bearer token | 不能为空 |

- 响应参数

| 参数名  | 参数说明               | 备注     |
| ------- | ---------------------- | -------- |
| data    | 具体的每一项列表的数据 |          |
| ret     | true                   | 登陆成功 |
| message | 恭喜你登录成功         |          |

- 响应数据

```json
{
    "ret": true,
    "data": [
        {
            "id": 1,//房源列表id
            "name": "远洋山水",
            "price": 190,//价格
            "unitPrice": 17592,//单价
            "area": 108.99,//面积
            "apartment": "三室两厅",//房源户型
            "type": "普通住宅",//类型
            "years": 2019,//年份
            "renovation": "精装修",//装修
            "listing": "2020-12-23T00:00:00.000Z",//挂牌时间
            "elevator": 1,//有无电梯  1有 0没有
            "orientation": "南北",//朝向
            "introduction": "我是小区，我是小区，我是小区",//小区介绍
            "agentInfo": {//经纪人信息
                "agentId": 5,//id
                "agentName": "delai",//真实名称
                "agentPhone": 19931077931,//电话
                "agentAvatar": "http://180.184.74.25:80:80/agent/5/avatar"//头像
            },
            "images": [//房源介绍图片
                "http://180.184.74.25:80/user/images/6b56fa57b3d08cd28cd524f12c99e2af",
                "http://180.184.74.25:80/user/images/9a4b6cc00e8d83dbbc376a0cffd9196c",
                "http://180.184.74.25:80/user/images/10e3bd51ce37bdf6b36ec0f351d6e358",
                "http://180.184.74.25:80/user/images/dee7b2e4b981da32909cb3a3ecf45995"
            ]
        },
        {
            "id": 2,
            "name": "远洋山水",
            "price": 130,
            "unitPrice": 28181,
            "area": 88,
            "apartment": "三室一厅",
            "type": "普通住宅",
            "years": 2019,
            "renovation": "精装修",
            "listing": "2020-12-23T00:00:00.000Z",
            "elevator": 1,
            "orientation": "南北",
            "introduction": "我是小区，我是小区，我是小区",
            "agentInfo": {
                "agentId": 1,
                "agentName": "",
                "agentPhone": null,
                "agentAvatar": ""
            },
            "images": [
                "http://180.184.74.25:80/user/images/2025e4e883dd4e47d5aa4fd4a148df8e"
            ]
        },
        {
            "id": 3,
            "name": "远洋山水",
            "price": 120,
            "unitPrice": 28180,
            "area": 88,
            "apartment": "三室一厅",
            "type": "普通住宅",
            "years": 2019,
            "renovation": "精装修",
            "listing": "2020-12-23T00:00:00.000Z",
            "elevator": 1,
            "orientation": "南北",
            "introduction": "我是小区，我是小区，我是小区",
            "agentInfo": {
                "agentId": 1,
                "agentName": "",
                "agentPhone": null,
                "agentAvatar": ""
            },
            "images": null
        }
    ],
    "message": "获取成功~"
}
```

## 经纪人子系统

### 注册

- 请求路径：/agent/register
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注                |
| -------- | -------- | ------------------- |
| name     | 用户名   | 不能为空            |
| password | 密码     | 不能为空,字符串类型 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| id     | 用户 ID  |      |
| name   | 用户名   |      |
| ret    | 注册成功 | true |

- 响应数据

```json
{
    "name": "liuyangyang__",
    "id": 4,
    "ret": true,
    "message":"注册成功~"
}
```

### 登录

- 请求路径：/agent/login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| name     | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名  | 参数说明                  | 备注     |
| ------- | ------------------------- | -------- |
| id      | 用户 ID                   |          |
| name    | 用户名                    |          |
| ret     | true                      | 登陆成功 |
| message | 恭喜你登录成功            |          |
| token   | Bearer token 暂时设置一天 |          |

- 响应数据

```json
{
    "id": 5,
    "name": "zijie",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemlqaWUiLCJpYXQiOjE2NTMyNzU2MDksImV4cCI6MTY1NDEzOTYwOX0.AUjQOmtJaeahfu7tXDDAt710jjXjy90iQ4KFwKKiBS6yPtTs0f3KcxdUNFMPffdoea7aaDLfiiRMko1TN7DqaalJ3ln7-HGWxgomjp8HHbiv3e_KU34m9ayRQspSLfYt5_GTbV4rkf3ZFaiXCb2udTy4tDnDsB06r4_wXY4v6hE",
    "ret": true,
    "message": "恭喜你，登陆成功~"
}
```

### 获取个人信息

- 请求路径：/agent/info
- 请求方法：get
- 请求参数

| 参数名                       | 参数说明     | 备注     |
| ---------------------------- | ------------ | -------- |
| headers中的authorization字段 | Bearer token | 不能为空 |

- 响应参数

  | 参数名      | 参数说明 | 备注    |
  | ----------- | -------- | ------- |
  | id          | 经纪人id |         |
  | name        | 用户名   |         |
  | realname    | 真实姓名 |         |
  | ret         | 获取成功 |         |
  | phoneNumber | 手机号   | 整数    |
  | avatar_url  | 头像url  | url地址 |
  | createAt    | 注册时间 |         |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "获取个人信息成功~",
      "profileInfo": {
          "id": 5,
          "name": "future",
          "realname": "delai",
          "phoneNumber": 19931077930,
          "avatar_url": "http://180.184.74.25:80:80/agent/5/avatar",
          "createAt": "2022-05-23T11:00:27.000Z",
          "updateAt": "2022-05-24T18:45:38.000Z"
      }
  }
  ```

### 头像上传

- 请求路径：/upload/agent/avatar
- 请求方法：post
- 请求参数

| 参数名                       | 参数说明                     | 备注     |
| ---------------------------- | ---------------------------- | -------- |
| headers中的authorization字段 | Bearer token                 |          |
| avatar                       | 图片文件       form-data格式 | 不能为空 |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "上传头像成功~"
  }
  ```

### 修改个人信息

- 请求路径：/agent/info
- 请求方法：patch

- 请求参数

  | 参数名                       | 参数说明     | 备注       |
  | ---------------------------- | ------------ | ---------- |
  | headers中的authorization字段 | Bearer token |            |
  | Password                     | 可选         |            |
  | realname                     | 真实姓名     | 必选       |
  | phoneNumber                  | 手机号       | 整数  必选 |
  | name                         | 可选         |            |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "修改个人信息成功~"
  }
  ```

### 获取用户在线情况

- 请求路径：/agent/onlineUser
- 请求方法：get
- 请求参数

| 参数名                       | 参数说明     | 备注 |
| ---------------------------- | ------------ | ---- |
| headers中的authorization字段 | Bearer token |      |

- 响应参数

| 参数名      | 参数说明 | 备注              |
| ----------- | -------- | ----------------- |
| name        | 用户名   |                   |
| realname    | 真实姓名 |                   |
| sex         | 性别     | male男  female 女 |
| phoneNumber | 电话     |                   |
| isLogin     | 是否在线 | true              |

- 响应数据

```json
[
    {
        "name": "curry",
        "realname": null,
        "sex": null,
        "phoneNumber": null,
        "isLogin": true
    },
    {
        "name": "james",
        "realname": null,
        "sex": null,
        "phoneNumber": null,
        "isLogin": true
    },
    {
        "name": "coder",
        "realname": null,
        "sex": null,
        "phoneNumber": null,
        "isLogin": true
    }
]
```

### 经纪人发布房源信息(这个是我用经纪人身份模拟的)

- 请求路径：/agent/release
- 请求方法：post
- 请求参数

| 参数名                       | 参数说明     | 备注     |
| ---------------------------- | ------------ | -------- |
| headers中的authorization字段 | Bearer token |          |
| price                        | 价格(整数)   | 不能为空 |
| unitPrice                    | 单价(整数)   | 不能为空 |
| area                         | 面积(整数)   | 不能为空 |
| apartment                    | 房源型号     | 不能为空 |
| type                         | 类型         | 不能为空 |
| years                        | 年份(整数)   | 不能为空 |
| renovation                   | 装修         | 不能为空 |
| listing                      | 挂牌时间     | 不能为空 |
| elevator                     | 电梯(1  有)  | 不能为空 |
| orientation                  | 朝向         | 不能为空 |
| introduction                 | 小区介绍     | 不能为空 |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "操作成功~"
  }
  ```

### 经纪人房源信息图片上传(也是经纪人身份模拟)

- 请求路径：/upload/houses/:houseId/picture
- 请求方法：post
- 请求参数

| 参数名                       | 参数说明                                 | 备注         |
| ---------------------------- | ---------------------------------------- | ------------ |
| headers中的authorization字段 | Bearer token                             |              |
| houseId                      | params字段    表示那个房源详情id         | 不能为空     |
| picture                      | 上传图片字段   必须为这个   formdata格式 | 可以上传多张 |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "上传头像成功~"
  }
  ```

