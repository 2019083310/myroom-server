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

### 获取所有的项目

- 请求路径：/agent/project/list

- 请求方法：get

- 请求参数：

  | 参数名              | 参数说明     | 备注 |
  | ------------------- | ------------ | ---- |
  | headers中的认证字段 | Bearer Token |      |

- 响应参数：具体看如下json数据

  ```json
  {
      "ret": true,
      "message": "获取成功~",
      "data": [
          {
              "id": 4,//projectId  后续编辑要保存起来
              "name": null,
              "author": null,
              "createAt": "2022-05-26T09:08:46.000Z"//创建时间
          },
          {
              "id": 6,
              "name": null,
              "author": null,
              "createAt": "2022-05-26T10:17:57.000Z"
          },
          {
              "id": 7,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-26T10:35:29.000Z"
          },
          {
              "id": 8,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-26T11:50:33.000Z"
          },
          {
              "id": 9,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-26T11:51:29.000Z"
          },
          {
              "id": 12,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-26T13:26:11.000Z"
          },
          {
              "id": 13,
              "name": "山水",
              "author": "kobe",
              "createAt": "2022-05-26T14:58:35.000Z"
          },
          {
              "id": 14,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-27T09:41:33.000Z"
          },
          {
              "id": 15,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-27T10:01:36.000Z"
          },
          {
              "id": 16,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-27T10:13:07.000Z"
          }
      ]
  }
  ```

### 获取某个项目的面板数据(toid,房源详情请求id)

- 请求路径：/agent/active/:projectId

- 请求方法：get

- 请求参数：

  | 参数名              | 参数说明       | 备注     |
  | ------------------- | -------------- | -------- |
  | headers中的认证字段 | Bearer Token   |          |
  | projectId           | params中的字段 | 不能为空 |

- 响应参数：具体看如下json数据

  ```json
  {
      "ret": true,
      "message": "获取成功~",
      "name": "我是项目",
      "author": "futhor",
      "data": [
          {
              "id": "panel",
              "type": "panel",
              "width": "400px",
              "height": "100vh",
              "backgroundColor": "white"
          },
          {
              "id": "text-1",
              "type": "text",
              "data": "我是一号文字",
              "color": "#FF0000",
              "size": "12px",
              "width": "100px",
              "height": "20px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "text-2",
              "type": "text",
              "data": "我是二号文字",
              "color": "#FF0000",
              "size": "12px",
              "width": "100px",
              "height": "20px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "image-1",
              "type": "image",
              "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "image-2",
              "type": "image",
              "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "video-1",
              "type": "video",
              "src": "http://localhost:3000/user/video/d2dcea009d43a2dbaa713b99d3b7dc68",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "video-2",
              "type": "video",
              "src": "http://localhost:3000/user/video/d2dcea009d43a2dbaa713b99d3b7dc68",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "audio-1",
              "type": "audio",
              "src": "http://localhost:3000/user/audio/76899eb0101326f2c0f1486d81047188",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "audio-2",
              "type": "audio",
              "src": "http://localhost:3000/user/audio/76899eb0101326f2c0f1486d81047188",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "card-1",
              "type": "card",
              "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
              "width_img": "100%",
              "height_img": "200px",
              "width": "100%",
              "height": "100px",
              "left": "100px",
              "top": "100px",
              "name": "山水之家",
              "soujia": "980万",
              "guapai": "2022-02-13",
              "fangxing": "三室两厅",
              "zhuangxiu": "精装修",
              "mianji": "99",
              "louxing": "",
              "chaoxiang": "南北",
              "niandai": "2022",
              "toid":12877//通过该id获取相应的房源详情
          },
          {
              "id": "card-2",
              "type": "card",
              "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
              "width_img": "100%",
              "height_img": "200px",
              "width": "100%",
              "height": "100px",
              "left": "100px",
              "top": "100px",
              "name": "山水之家",
              "soujia": "980万",
              "guapai": "2022-02-13",
              "fangxing": "三室两厅",
              "zhuangxiu": "精装修",
              "mianji": "99",
              "louxing": "",
              "chaoxiang": "南北",
              "niandai": "2022",
              "toid":128888
          }
      ]
  
  ```

### 获取房源详情信息

- 请求路径：/user/house/:houseId
- 请求方法：get
- 请求参数

| 参数名  | 参数说明                                    | 备注 |
| ------- | ------------------------------------------- | ---- |
| houseId | houseId是params中的字段(对应上面返回的toid) | 必填 |

- 响应参数:具体如下所示

- 响应数据

  ```json
  {
      "ret": true,
      "message": "获取信息成功~",
      "data": {
          "id": 103612,
          "listing_name": "鑫苑小区 2室 2厅 86平米",
          "first_upload_at": "2018-11-05T02:45:24.000Z",
          "pricing": 51000000,
          "squaremeter": 8600,
          "downpayment": null,
          "floor": null,
          "total_floor": 5,
          "dict_house_id": 6662689540056023000,
          "room_structure": null,
          "ladder_ration": null,
          "heating_type": null,
          "house_duration": null,
          "property_right": null,
          "mortgage": null,
          "usage_area": 0,
          "floor_level": 1,
          "facing_type": 9,
          "decoration_type": null,
          "building_type": null,
          "built_year": "2004",
          "city_name": "德州",
          "city_code": "B189",
          "neighborhood_name": "鑫苑小区",
          "neighborhood_source_code": "9_B189_685",
          "floor_plan_room": 2,
          "floor_plan_hall": 2,
          "floor_plan_bath": 1,
          "floor_plan_kitchen": 1,
          "house_type": 2,
          "layout_type": 0,
          "last_publish_time": "2021-07-23T06:59:21.000Z",
          "ownership": null,
          "right_property": "",
          "property_management_type": 1,
          "elevator": null,
          "house_status": 0,
          "online_house_status": 0,
          "created_at": "2019-02-25T08:12:49.000Z",
          "updated_at": "2021-11-10T10:19:21.000Z",
          "data_source_id": 9,
          "offline_code": "8704",
          "source_code": "9_B189_8704",
          "start_version": 0,
          "last_version": 2000000000,
          "crawl_id": 15098851641500213000,
          "task_id": 0,
          "house_card": "",
          "online_neighborhood_id": 6584044710015271000,
          "online_city_id": 12920,
          "online_district_id": 12921,
          "online_area_id": 21669,
          "property_only": null,
          "property_certificate_period": null
      }
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

### 图片上传

- 请求路径：/upload/picture
- 请求方法：post
- 请求参数

| 参数名                       | 参数说明                     | 备注     |
| ---------------------------- | ---------------------------- | -------- |
| headers中的authorization字段 | Bearer token                 |          |
| picture                      | 图片文件       form-data格式 | 不能为空 |

- 响应参数

- | 参数名  | 参数说明 | 备注 |
  | ------- | -------- | ---- |
  | ret     | 获取成功 |      |
  | message | 信息     |      |
  | src     | 图片地址 |      |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "上传图片成功~",
      "src": "http://180.184.74.25:80/user/images/d6c21cfd0c8e2a6394deb5d05"
  }
  ```

### 音频上传

- 请求路径：/upload/audio
- 请求方法：post
- 请求参数

| 参数名                       | 参数说明                     | 备注     |
| ---------------------------- | ---------------------------- | -------- |
| headers中的authorization字段 | Bearer token                 |          |
| audio                        | 音频文件       form-data格式 | 不能为空 |

- 响应参数

- | 参数名  | 参数说明 | 备注 |
  | ------- | -------- | ---- |
  | ret     | 获取成功 |      |
  | message | 信息     |      |
  | src     | 音频地址 |      |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "上传音频成功~",
      "src": "http://180.184.74.25:80/user/audio/d6c21cfd0c8e2a6394deb5d06"
  }
  ```

### 视频上传

- 请求路径：/upload/video
- 请求方法：post
- 请求参数

| 参数名                       | 参数说明                     | 备注     |
| ---------------------------- | ---------------------------- | -------- |
| headers中的authorization字段 | Bearer token                 |          |
| video                        | 视频文件       form-data格式 | 不能为空 |

- 响应参数

- | 参数名  | 参数说明 | 备注 |
  | ------- | -------- | ---- |
  | ret     | 获取成功 |      |
  | message | 信息     |      |
  | src     | 视频地址 |      |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "上传视频成功~",
      "src": "http://180.184.74.25:80/user/video/d6c21cfd0c8e2a6394deb5d05"
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

### 创建项目

- 请求路径：/agent/create/project
- 请求方法：post
- 请求参数：具体看下面的数据+token

```json
{
    "name":"我是项目",//项目名称
    "author":"futhor",//作者
    "data":[//具体的面板信息
  {
    "id": "panel",
    "type": "panel",
    "width": "400px",
    "height": "100vh",
    "backgroundColor": "white"
  },
  {
    "id": "text-1",
    "type": "text",
    "data": "我是一号文字",
    "color": "#FF0000",
    "size": "12px",
    "width": "100px",
    "height": "20px",
    "left": "100px",
    "top": "100px"
  },
  {
    "id": "image-1",
    "type": "image",
    "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
    "width": "100px",
    "height": "100px",
    "left": "100px",
    "top": "100px"
  },
  {
    "id": "video-1",
    "type": "video",
    "src": "http://localhost:3000/user/video/d2dcea009d43a2dbaa713b99d3b7dc68",
    "width": "100px",
    "height": "100px",
    "left": "100px",
    "top": "100px"
  },
  {
    "id": "audio-1",
    "type": "audio",
    "src": "http://localhost:3000/user/audio/76899eb0101326f2c0f1486d81047188",
    "width": "100px",
    "height": "100px",
    "left": "100px",
    "top": "100px"
  },
  {
    "id": "card-1",
    "type": "card",
    "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
    "width_img": "100%",
    "height_img": "200px",
    "width": "100%",
    "height": "100px",
    "left": "100px",
    "top": "100px",
    "name": "山水之家",
    "soujia": "980万",
    "guapai": "2022-02-13",
    "fangxing": "三室两厅",
    "zhuangxiu": "精装修",
    "mianji": "99",
    "louxing": "",
    "chaoxiang": "南北",
    "niandai": "2022",
     "toid":12877//bigint大整数
  },
  {
    "id": "text-2",
    "type": "text",
    "data": "我是二号文字",
    "color": "#FF0000",
    "size": "12px",
    "width": "100px",
    "height": "20px",
    "left": "100px",
    "top": "100px"
  },
  {
    "id": "image-2",
    "type": "image",
    "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
    "width": "100px",
    "height": "100px",
    "left": "100px",
    "top": "100px"
  },
  {
    "id": "video-2",
    "type": "video",
    "src": "http://localhost:3000/user/video/d2dcea009d43a2dbaa713b99d3b7dc68",
    "width": "100px",
    "height": "100px",
    "left": "100px",
    "top": "100px"
  },
  {
    "id": "audio-2",
    "type": "audio",
    "src": "http://localhost:3000/user/audio/76899eb0101326f2c0f1486d81047188",
    "width": "100px",
    "height": "100px",
    "left": "100px",
    "top": "100px"
  },
  {
    "id": "card-2",
    "type": "card",
    "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
    "width_img": "100%",
    "height_img": "200px",
    "width": "100%",
    "height": "100px",
    "left": "100px",
    "top": "100px",
    "name": "山水之家",
    "soujia": "980万",
    "guapai": "2022-02-13",
    "fangxing": "三室两厅",
    "zhuangxiu": "精装修",
    "mianji": "99",
    "louxing": "",
    "chaoxiang": "南北",
    "niandai": "2022",
    "toid":12888//BigInt大整数
  }
]
}
```

- 响应信息

  ```json
  {
      "ret": true,
      "message": "创建活动页成功~"
  }
  ```

### 获取可用id

- 请求路径：/agent/enable/house
- 请求方法：get
- 请求参数

| 参数名              | 参数说明     | 备注     |
| ------------------- | ------------ | -------- |
| headers中的认证字段 | Bearer Token | 不能为空 |

- 响应数据

  ```json
  {
      "ret": true,
      "message": "获取成功~",
      "data": [
          {
              "id": 65140,
              "listing_name": "aa"
          },
          {
              "id": 103612,
              "listing_name": "鑫苑小区 2室 2厅 86平米"
          },
          {
              "id": 123435,
              "listing_name": "富力城小区 2室 2厅 86.97平米"
          },
          {
              "id": 124010,
              "listing_name": "中海碧林湾 4室 2厅 137平米"
          },
          {
              "id": 124936,
              "listing_name": "中建群星汇 2室 2厅 88平米"
          },
          {
              "id": 125071,
              "listing_name": "奥达文景观园 2室 2厅 90平米"
          },
          {
              "id": 127625,
              "listing_name": "万科金域曲江 2室 2厅 77.61平米"
          },
          {
              "id": 130855,
              "listing_name": "碧水西岸南湖1号 4室 2厅 210平米"
          }
  }
  ```

### 获取房源详情数据

- 请求路径：/agent/house/:houseId
- 请求方法：get
- 请求参数

| 参数名  | 参数说明                | 备注 |
| ------- | ----------------------- | ---- |
| houseId | houseId是params中的字段 | 必填 |

- 响应参数:具体如下所示

- 响应数据

  ```json
  {
      "ret": true,
      "message": "获取信息成功~",
      "data": {
          "id": 103612,
          "listing_name": "鑫苑小区 2室 2厅 86平米",
          "first_upload_at": "2018-11-05T02:45:24.000Z",
          "pricing": 51000000,
          "squaremeter": 8600,
          "downpayment": null,
          "floor": null,
          "total_floor": 5,
          "dict_house_id": 6662689540056023000,
          "room_structure": null,
          "ladder_ration": null,
          "heating_type": null,
          "house_duration": null,
          "property_right": null,
          "mortgage": null,
          "usage_area": 0,
          "floor_level": 1,
          "facing_type": 9,
          "decoration_type": null,
          "building_type": null,
          "built_year": "2004",
          "city_name": "德州",
          "city_code": "B189",
          "neighborhood_name": "鑫苑小区",
          "neighborhood_source_code": "9_B189_685",
          "floor_plan_room": 2,
          "floor_plan_hall": 2,
          "floor_plan_bath": 1,
          "floor_plan_kitchen": 1,
          "house_type": 2,
          "layout_type": 0,
          "last_publish_time": "2021-07-23T06:59:21.000Z",
          "ownership": null,
          "right_property": "",
          "property_management_type": 1,
          "elevator": null,
          "house_status": 0,
          "online_house_status": 0,
          "created_at": "2019-02-25T08:12:49.000Z",
          "updated_at": "2021-11-10T10:19:21.000Z",
          "data_source_id": 9,
          "offline_code": "8704",
          "source_code": "9_B189_8704",
          "start_version": 0,
          "last_version": 2000000000,
          "crawl_id": 15098851641500213000,
          "task_id": 0,
          "house_card": "",
          "online_neighborhood_id": 6584044710015271000,
          "online_city_id": 12920,
          "online_district_id": 12921,
          "online_area_id": 21669,
          "property_only": null,
          "property_certificate_period": null
      }
  }
  ```

### 获取某个项目

- 请求路径：/agent/active/:projectId

- 请求方法：get

- 请求参数：

  | 参数名              | 参数说明       | 备注     |
  | ------------------- | -------------- | -------- |
  | headers中的认证字段 | Bearer Token   |          |
  | projectId           | params中的字段 | 不能为空 |

- 响应参数：具体看如下json数据

  ```json
  {
      "ret": true,
      "message": "获取成功~",
      "name": "我是项目",
      "author": "futhor",
      "data": [
          {
              "id": "panel",
              "type": "panel",
              "width": "400px",
              "height": "100vh",
              "backgroundColor": "white"
          },
          {
              "id": "text-1",
              "type": "text",
              "data": "我是一号文字",
              "color": "#FF0000",
              "size": "12px",
              "width": "100px",
              "height": "20px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "text-2",
              "type": "text",
              "data": "我是二号文字",
              "color": "#FF0000",
              "size": "12px",
              "width": "100px",
              "height": "20px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "image-1",
              "type": "image",
              "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "image-2",
              "type": "image",
              "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "video-1",
              "type": "video",
              "src": "http://localhost:3000/user/video/d2dcea009d43a2dbaa713b99d3b7dc68",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "video-2",
              "type": "video",
              "src": "http://localhost:3000/user/video/d2dcea009d43a2dbaa713b99d3b7dc68",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "audio-1",
              "type": "audio",
              "src": "http://localhost:3000/user/audio/76899eb0101326f2c0f1486d81047188",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "audio-2",
              "type": "audio",
              "src": "http://localhost:3000/user/audio/76899eb0101326f2c0f1486d81047188",
              "width": "100px",
              "height": "100px",
              "left": "100px",
              "top": "100px"
          },
          {
              "id": "card-1",
              "type": "card",
              "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
              "width_img": "100%",
              "height_img": "200px",
              "width": "100%",
              "height": "100px",
              "left": "100px",
              "top": "100px",
              "name": "山水之家",
              "soujia": "980万",
              "guapai": "2022-02-13",
              "fangxing": "三室两厅",
              "zhuangxiu": "精装修",
              "mianji": "99",
              "louxing": "",
              "chaoxiang": "南北",
              "niandai": "2022",
              "toid":18887
          },
          {
              "id": "card-2",
              "type": "card",
              "src": "http://localhost:3000/user/images/fdf75f022f30ef623871f2d9ceb25c47",
              "width_img": "100%",
              "height_img": "200px",
              "width": "100%",
              "height": "100px",
              "left": "100px",
              "top": "100px",
              "name": "山水之家",
              "soujia": "980万",
              "guapai": "2022-02-13",
              "fangxing": "三室两厅",
              "zhuangxiu": "精装修",
              "mianji": "99",
              "louxing": "",
              "chaoxiang": "南北",
              "niandai": "2022",
              "toid":12888
          }
      ]
  }
  ```

### 获取所有经纪人创建的项目

- 请求路径：/agent/project/list

- 请求方法：get

- 请求参数：

  | 参数名              | 参数说明     | 备注 |
  | ------------------- | ------------ | ---- |
  | headers中的认证字段 | Bearer Token |      |

- 响应参数：具体看如下json数据

  ```json
  {
      "ret": true,
      "message": "获取成功~",
      "data": [
          {
              "id": 4,//projectId  后续编辑要保存起来
              "name": null,
              "author": null,
              "createAt": "2022-05-26T09:08:46.000Z"//创建时间
          },
          {
              "id": 6,
              "name": null,
              "author": null,
              "createAt": "2022-05-26T10:17:57.000Z"
          },
          {
              "id": 7,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-26T10:35:29.000Z"
          },
          {
              "id": 8,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-26T11:50:33.000Z"
          },
          {
              "id": 9,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-26T11:51:29.000Z"
          },
          {
              "id": 12,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-26T13:26:11.000Z"
          },
          {
              "id": 13,
              "name": "山水",
              "author": "kobe",
              "createAt": "2022-05-26T14:58:35.000Z"
          },
          {
              "id": 14,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-27T09:41:33.000Z"
          },
          {
              "id": 15,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-27T10:01:36.000Z"
          },
          {
              "id": 16,
              "name": "我是项目",
              "author": "futhor",
              "createAt": "2022-05-27T10:13:07.000Z"
          }
      ]
  }
  ```

### 删除某一个项目(有权限，只能删除自己的，我做了验证)

- 请求路径：/agent/:projectId/project

- 请求方法：delete

- 请求参数：

  | 参数名              | 参数说明     | 备注     |
  | ------------------- | ------------ | -------- |
  | headers中的认证字段 | bearer Token | 权限认证 |
  | projectId           | 活动id       | 不能为空 |

- 响应参数

  ```json
  {
      "ret": true,
      "message": "删除项目成功~"
  }
  ```

### 修改自己创建的活动面板信息(我也做了验证，只能修改自己的项目)

- 请求路径：agent/update/:projectId

- 请求方法：put

- 请求参数：和创建项目一样  那面板data中的数据传过来+token

- 响应参数

  ```json
  {
      "ret": true,
      "message": "更新项目信息成功~"
  }
  ```

### 获取组件的图片，音频，视频的接口，就是返回给你的src，就可以访问，不过视频因为换了第三方库，延迟太高，后续考虑分片吧

### 下面这两个接口，是以前错误的理解，先留着

#### 经纪人发布房源信息(这个是我用经纪人身份模拟的)

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

#### 经纪人房源信息图片上传(也是经纪人身份模拟)

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

