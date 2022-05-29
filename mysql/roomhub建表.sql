#创建一个用户表，一个经纪人表
CREATE TABLE IF NOT EXISTS `user` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL,
	`password` VARCHAR(30) NOT NULL,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `agent` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL,
	`password` VARCHAR(30) NOT NULL,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

#修改表的数据类型
ALTER TABLE `agent` MODIFY `password` VARCHAR(120);

SHOW CREATE TABLE `agent`;
-- CREATE TABLE `user` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` varchar(20) COLLATE utf8mb4_croatian_ci NOT NULL,
--   `password` varchar(120) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci

#完善信息
ALTER TABLE `user` ADD phoneNumber INT;
ALTER TABLE `user` ADD phoneNumber BIGINT;

ALTER TABLE `agent` ADD avatarUrl VARCHAR(255) NOT NULL;
ALTER TABLE `agent` ADD username VARCHAR(50) NOT NULL;

ALTER TABLE `agent` MODIFY realname VARCHAR(50);
ALTER TABLE `agent` MODIFY avatarUrl VARCHAR(255);

ALTER TABLE `user` ADD isLogin INT;

-- CREATE TABLE `agent` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` varchar(20) COLLATE utf8mb4_croatian_ci NOT NULL,
--   `password` varchar(120) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   `phoneNumber` int(11) DEFAULT NULL,
--   `avatarUrl` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `realname` varchar(50) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci

#创建用户头像表
CREATE TABLE IF NOT EXISTS `avatar_agent` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`filename` VARCHAR(255) NOT NULL UNIQUE,
	`mimetype` VARCHAR(30),
	`size` INT,
	`agent_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(agent_id) REFERENCES agent(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `avatar_user` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`filename` VARCHAR(255) NOT NULL UNIQUE,
	`mimetype` VARCHAR(30),
	`size` INT,
	`user_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `user` ADD sex VARCHAR(10);
ALTER TABLE `user` ADD realname VARCHAR(50);
ALTER TABLE `user` ADD age INT;
ALTER TABLE `user` ADD avatar_url VARCHAR(255);

ALTER TABLE agent CHANGE avatarUrl avatar_url VARCHAR(255);


#房产详情页
CREATE TABLE IF NOT EXISTS `houses_resources` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`agent_id` INT,
	`name` VARCHAR(255) NOT NULL,//房源名称
	`price` DOUBLE NOT NULL,//价格
	`unitPrice` DOUBLE NOT NULL,//单价
	`area` DOUBLE NOT NULL,//面积
	`apartment` VARCHAR(100),//房型
	`type` VARCHAR(100),//类型
	`years` INT,//年代
	`renovation` VARCHAR(50),//装修
	`listing` TIMESTAMP,//挂牌
	`elevator` INT,//电梯
	`orientation` VARCHAR(50) NOT NULL,//朝向
	`introduction` VARCHAR(255),//小区介绍
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `houses_resources` ADD FOREIGN KEY(agent_id) REFERENCES agent(id);
SHOW CREATE TABLE `houses_resources`;

CREATE TABLE IF NOT EXISTS `home_images` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`filename` VARCHAR(255) NOT NULL UNIQUE,
	`mimetype` VARCHAR(30),
	`size` INT,
	`agent_id` INT,
	`house_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(agent_id) REFERENCES agent(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(house_id) REFERENCES houses_resources(id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- 
-- CREATE TABLE `houses_resources` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `agent_id` int(11) DEFAULT NULL,
--   `name` varchar(255) COLLATE utf8mb4_croatian_ci NOT NULL,
--   `price` double NOT NULL,
--   `unitPrice` double NOT NULL,
--   `area` double NOT NULL,
--   `apartment` varchar(100) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `type` varchar(100) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `years` int(11) DEFAULT NULL,
--   `renovation` varchar(50) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `listing` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   `elevator` int(11) DEFAULT NULL,
--   `orientation` varchar(50) COLLATE utf8mb4_croatian_ci NOT NULL,
--   `introduction` varchar(255) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   KEY `agent_id` (`agent_id`),
--   CONSTRAINT `houses_resources_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci
-- 

DELETE FROM home_images;

SELECT h.id,h.name,h.price,h.unitPrice,h.area,h.apartment,h.type,h.years,h.renovation,h.listing,h.elevator,h.orientation,h.introduction,
JSON_OBJECT('agentId',a.id,'agentName',a.realname,'agentPhone',a.phoneNumber,'agentAvatar',a.avatar_url) agentInfo,
(SELECT JSON_ARRAYAGG(CONCAT('http://localhost:3000/user/images/', img.filename)) 
        FROM home_images img WHERE h.id = img.house_id) images
FROM houses_resources h
INNER JOIN agent a ON h.agent_id=a.id;

#创建项目列表
CREATE TABLE IF NOT EXISTS `home_project` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`agent_id` INT,
	`panel_id` VARCHAR(30),
	`type` VARCHAR(30),
	`width` VARCHAR(30),
	`height` VARCHAR(30),
	`backgroundColor` VARCHAR(30),
	FOREIGN KEY(agent_id) REFERENCES agent(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

ALTER TABLE home_project ADD createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE home_project ADD updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE home_project ADD `name` VARCHAR(100);
ALTER TABLE home_project ADD `author` VARCHAR(30);

#删除外键三部曲
-- 1.SHOW CREATE TABLE home_project;
-- CREATE TABLE `home_project` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `houses_resources_id` int(11) DEFAULT NULL,
--   `agent_id` int(11) DEFAULT NULL,
--   `panel_id` varchar(30) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `type` varchar(30) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `width` varchar(30) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `height` varchar(30) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `backgroundColor` varchar(30) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   KEY `houses_resources_id` (`houses_resources_id`),
--   KEY `agent_id` (`agent_id`),
--   CONSTRAINT `home_project_ibfk_1` FOREIGN KEY (`houses_resources_id`) REFERENCES `houses_resources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
--   CONSTRAINT `home_project_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`) ON UPDATE CASCADE
-- ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci
-- 2.拿到外键名称
ALTER TABLE `home_project` DROP FOREIGN KEY home_project_ibfk_1;
ALTER TABLE home_project DROP houses_resources_id;

DROP TABLE IF EXISTS `videocomponent`;

#创建文字组件
CREATE TABLE IF NOT EXISTS `fontComponent` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`font_id` VARCHAR(30),
	`type` VARCHAR(30),
	`data` VARCHAR(255),
	`color` VARCHAR(30),
	`size` VARCHAR(30),
	`width` VARCHAR(30),
	`height` VARCHAR(30),
	`left` VARCHAR(30),
	`top` VARCHAR(30),
	`home_project_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	 FOREIGN KEY(home_project_id) REFERENCES home_project(id) ON DELETE CASCADE ON UPDATE CASCADE
);

#创建图片组件
CREATE TABLE IF NOT EXISTS `imgComponent` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`img_id` VARCHAR(30),
	`type` VARCHAR(30),
	`src` VARCHAR(255),
	`width` VARCHAR(30),
	`height` VARCHAR(30),
	`left` VARCHAR(30),
	`top` VARCHAR(30),
	`home_project_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	 FOREIGN KEY(home_project_id) REFERENCES home_project(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `videoComponent` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`video_id` VARCHAR(30),
	`type` VARCHAR(30),
	`src` VARCHAR(255),
	`width` VARCHAR(30),
	`height` VARCHAR(30),
	`left` VARCHAR(30),
	`top` VARCHAR(30),
	`home_project_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	 FOREIGN KEY(home_project_id) REFERENCES home_project(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `audioComponent` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`audio_id` VARCHAR(30),
	`type` VARCHAR(30),
	`src` VARCHAR(255),
	`width` VARCHAR(30),
	`height` VARCHAR(30),
	`left` VARCHAR(30),
	`top` VARCHAR(30),
	`home_project_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	 FOREIGN KEY(home_project_id) REFERENCES home_project(id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM houses_resources WHERE agent_id = 5 limit  10 offset  0;

INSERT INTO fontcomponent (font_id,type,data,color,size,width,height,`left`,top,houses_resources_id) VALUES ('text-1','text','我是一号文字','#FF0000','12px','100px','20px','100px','100px',1);

#删除home_images的外键
SHOW CREATE TABLE `home_images`;
-- CREATE TABLE `home_images` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `filename` varchar(255) COLLATE utf8mb4_croatian_ci NOT NULL,
--   `mimetype` varchar(30) COLLATE utf8mb4_croatian_ci DEFAULT NULL,
--   `size` int(11) DEFAULT NULL,
--   `agent_id` int(11) DEFAULT NULL,
--   `house_id` int(11) DEFAULT NULL,
--   `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `filename` (`filename`),
--   KEY `agent_id` (`agent_id`),
--   KEY `house_id` (`house_id`),
--   CONSTRAINT `home_images_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `agent` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
--   CONSTRAINT `home_images_ibfk_2` FOREIGN KEY (`house_id`) REFERENCES `houses_resources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_croatian_ci

ALTER TABLE `home_images` DROP FOREIGN KEY home_images_ibfk_2;
ALTER TABLE home_images DROP house_id;

#创建保存视频表
CREATE TABLE IF NOT EXISTS `home_video` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`filename` VARCHAR(255) NOT NULL UNIQUE,
	`mimetype` VARCHAR(30),
	`size` INT,
	`agent_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(agent_id) REFERENCES agent(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `home_audio` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`filename` VARCHAR(255) NOT NULL UNIQUE,
	`mimetype` VARCHAR(30),
	`size` INT,
	`agent_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(agent_id) REFERENCES agent(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `cardcomponent` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`card_id` VARCHAR(30),
	`type` VARCHAR(30),
	`src` VARCHAR(255),
	`width_img` VARCHAR(30),
	`height_img` VARCHAR(30),
	`width` VARCHAR(30),
	`height` VARCHAR(30),
	`left` VARCHAR(30),
	`top` VARCHAR(30),
	`name` VARCHAR(30),
	`soujia` VARCHAR(30),
	`guapai` VARCHAR(30),
	`fangxing` VARCHAR(30),
	`zhuangxiu` VARCHAR(30),
	`mianji` VARCHAR(30),
	`louxing` VARCHAR(30),
	`chaoxiang` VARCHAR(30),
	`niandai` VARCHAR(30),
	`home_project_id` INT,
	`createAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updateAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	 FOREIGN KEY(home_project_id) REFERENCES home_project(id) ON DELETE CASCADE ON UPDATE CASCADE
);

DELETE FROM `home_project` WHERE id = 10;

SELECT name,author,createAt FROM home_project;

SELECT p.name,p.author,p.createAt,
	JSON_ARRAY(JSON_OBJECT('id',p.panel_id,'type',p.type,'width',p.width,'height',p.height,'backgroundColor',p.backgroundColor),
	JSON_OBJECT('id',f.font_id,'type',f.type,'data',f.`data`,'color',f.color,'size',f.size,'width',f.width,'height',f.height,'left',f.`left`,'top',f.top),
	JSON_OBJECT('id',m.img_id,'type',m.type,'src',m.src,'width',m.width,'height',m.height,'left',m.`left`,'top',m.top),
	JSON_OBJECT('id',a.audio_id,'type',a.type,'src',a.src,'width',a.width,'height',a.height,'left',a.`left`,'top',a.top),
	JSON_OBJECT('id',v.video_id,'type',v.type,'src',v.src,'width',v.width,'height',v.height,'left',v.`left`,'top',v.top),
	JSON_OBJECT('id',c.card_id,'type',c.type,'src',c.src,'width_img',c.width_img,'height_img',c.height_img,'width',c.width,'height',c.height,'left',c.`left`,'top',c.top,'name',c.`name`,'soujia',c.soujia,'guapai',c.guapai,'fangxing',c.fangxing,'zhuangxiu',c.zhuangxiu,'mianji',c.mianji,'louxing',c.louxing,'chaoxiang',c.chaoxiang,'niandai',c.niandai)) `data`
FROM home_project p
LEFT JOIN fontcomponent f ON f.home_project_id=p.id
LEFT JOIN imgcomponent m ON m.home_project_id=p.id
LEFT JOIN audiocomponent a ON a.home_project_id=p.id
LEFT JOIN videocomponent v ON v.home_project_id=p.id
LEFT JOIN cardcomponent c ON c.home_project_id=p.id
WHERE p.id=12;

SELECT name ,author, panel_id id,type,width,height,backgroundColor FROM home_project WHERE id = 12;
SELECT font_id id,type,`data`,color,size,width,height,`left`,top FROM fontcomponent WHERE home_project_id = 13;

SELECT img_id id,type,src,width,height,`left`,top FROM fontcomponent WHERE home_project_id = 13
SELECT video_id id,type,src,width,height,`left`,top FROM fontcomponent WHERE home_project_id = 13
SELECT card_id id,type,src,width_img,height_img,width,height,`left`,top,`name`,soujia,guapai,fangxing,zhuangxiu,mianji,louxing,chaoxiang,niandai
FROM cardcomponentard WHERE home_project_id = ?;

UPDATE home_project SET panel_id = ?,type = ?,width = ?,height = ?,backgroundColor = ?,`name` =?,author = ?;

UPDATE home_project SET `name` = '中建群星汇' WHERE id = 15;

CREATE TABLE `agent_house` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '房源 id',
  `listing_name` varchar(1024) COLLATE utf8mb4_general_ci NOT NULL COMMENT '房源 title',
  `first_upload_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '房源上架时间',
  `pricing` bigint unsigned NOT NULL COMMENT '报价，单位分',
  `squaremeter` int NOT NULL COMMENT '建筑面积，单位平方米（需要除以 100）',
  `downpayment` bigint unsigned DEFAULT NULL COMMENT '首付，单位分',
  `floor` int unsigned DEFAULT NULL COMMENT '楼层',
  `total_floor` int DEFAULT NULL COMMENT '总楼层数',
  `dict_house_id` bigint DEFAULT NULL,
  `room_structure` int DEFAULT NULL,
  `ladder_ration` int DEFAULT NULL,
  `heating_type` int DEFAULT NULL,
  `house_duration` int DEFAULT NULL,
  `property_right` int DEFAULT NULL COMMENT '共有，非共有',
  `mortgage` int DEFAULT NULL,
  `usage_area` int DEFAULT NULL,
  `floor_level` int unsigned DEFAULT NULL COMMENT '楼层位置：1: 高 2:中 3:低',
  `facing_type` int unsigned DEFAULT NULL COMMENT '朝向分类，1：南北',
  `decoration_type` int unsigned DEFAULT NULL COMMENT '装修程度，1:简装 2:豪装',
  `building_type` int unsigned DEFAULT NULL COMMENT '楼型，TODO',
  `built_year` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '建造年代',
  `city_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `city_code` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `neighborhood_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `neighborhood_source_code` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT '小区 id，neighborhood 主键',
  `floor_plan_room` int unsigned DEFAULT NULL COMMENT '卧室个数',
  `floor_plan_hall` int unsigned DEFAULT NULL COMMENT '厅个数',
  `floor_plan_bath` int unsigned DEFAULT NULL COMMENT '厕所个数',
  `floor_plan_kitchen` int unsigned DEFAULT NULL COMMENT '厨房个数',
  `house_type` int unsigned DEFAULT NULL COMMENT '房源类型，1: 新房 2: 二手房 3:租房',
  `layout_type` int DEFAULT '0' COMMENT '户型类型',
  `last_publish_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '房源更新时间',
  `ownership` int DEFAULT NULL COMMENT '交易权属: 1.商品房， 2. 公房，3.央产房，4.军产房，5.校产房， 6.私产，7. 经济适用房， 8.永久产权，9.空置房，10.使用权房，99.其他',
  `right_property` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '产权年限，多种以/分隔，如70年/40年/50年',
  `property_management_type` int DEFAULT NULL COMMENT '房屋类型 ，房屋类型: 1.普通住宅，2.别墅，3.写字楼， 4.商铺，5.商住两用，6.公寓，7.工业厂房，8.车库，9.经济适用房，99. 其他',
  `elevator` int DEFAULT NULL COMMENT '是否有电梯，0： 没有；1：有；null：未知',
  `house_status` int NOT NULL DEFAULT '0' COMMENT '房源状态 0：正常；1：下架',
  `online_house_status` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `data_source_id` bigint NOT NULL DEFAULT '0' COMMENT '1：诸葛；2：安居客',
  `offline_code` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '抓取房源 id',
  `source_code` varchar(128) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '离线房源编号',
  `start_version` int NOT NULL,
  `last_version` int NOT NULL,
  `crawl_id` bigint unsigned NOT NULL COMMENT '抓取id',
  `task_id` bigint unsigned DEFAULT NULL COMMENT 'taskid',
  `house_card` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `online_neighborhood_id` bigint NOT NULL DEFAULT '0',
  `online_city_id` int NOT NULL DEFAULT '0',
  `online_district_id` int NOT NULL DEFAULT '0',
  `online_area_id` int NOT NULL DEFAULT '0',
  `property_only` int DEFAULT NULL COMMENT '唯一住房:1.是，0.否',
  `property_certificate_period` int DEFAULT NULL COMMENT '房本年限: 0.不满二，1.满二，2.满五，99.其他',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uniq_source_code_st_ver_lt_ver` (`source_code`,`start_version`,`last_version`) USING BTREE,
  KEY `idx_created_at` (`created_at`) USING BTREE,
  KEY `idx_updated_at` (`updated_at`) USING BTREE,
  KEY `idx_offline_code_data_source_id` (`offline_code`,`data_source_id`) USING BTREE,
  KEY `idx_neighborhood_code_lt_ver` (`neighborhood_source_code`,`last_version`) USING BTREE,
  KEY `idx_crawl_id` (`crawl_id`) USING BTREE,
  KEY `idx_city_name` (`city_name`) USING BTREE,
  KEY `idx_data_source_id` (`data_source_id`) USING BTREE,
  KEY `idx_dict_house_id` (`dict_house_id`) USING BTREE,
  KEY `idx_house_card` (`house_card`) USING BTREE,
  KEY `idx_online_house_status` (`online_house_status`) USING BTREE,
  KEY `idx_online_neighborhood_id` (`online_neighborhood_id`) USING BTREE,
  KEY `idx_online_city_id` (`online_city_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1973698705 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
