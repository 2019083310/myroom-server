/*
 Navicat Premium Data Transfer

 Source Server         : myroom
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : 111.62.116.229:3306
 Source Schema         : roomhub

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 22/05/2022 17:40:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for agent
-- ----------------------------
DROP TABLE IF EXISTS `agent`;
CREATE TABLE `agent`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of agent
-- ----------------------------
INSERT INTO `agent` VALUES (1, 'liuyang', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-21 15:17:54', '2022-05-21 15:17:54');
INSERT INTO `agent` VALUES (2, 'liuyangyang', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-21 15:22:15', '2022-05-21 15:22:15');
INSERT INTO `agent` VALUES (3, 'liuyangyang_', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-21 15:23:59', '2022-05-21 15:23:59');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `createAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'kobe', 'e10adc3949ba59abbe56e057f20f883e', '2022-05-21 14:12:04', '2022-05-21 14:12:04');
INSERT INTO `user` VALUES (2, 'curry', '25f9e794323b453885f5181f1b624d0b', '2022-05-21 14:16:33', '2022-05-21 14:16:33');
INSERT INTO `user` VALUES (3, 'james', '25f9e794323b453885f5181f1b624d0b', '2022-05-21 14:16:53', '2022-05-21 14:16:53');
INSERT INTO `user` VALUES (4, 'coder', '25f9e794323b453885f5181f1b624d0b', '2022-05-21 14:27:33', '2022-05-21 14:27:33');

SET FOREIGN_KEY_CHECKS = 1;
