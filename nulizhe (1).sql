-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-03-04 10:23:06
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nulizhe`
--

-- --------------------------------------------------------

--
-- 表的结构 `nl_picture`
--

CREATE TABLE IF NOT EXISTS `nl_picture` (
  `pic_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '//图片ID',
  `pic_user` varchar(40) NOT NULL COMMENT '//图片所属用户',
  `pic_user_id` int(10) unsigned NOT NULL COMMENT '//用户ID',
  `pic_words` varchar(200) DEFAULT NULL COMMENT '//图片描述',
  `pic_path` varchar(200) NOT NULL COMMENT '//图片路径',
  `pic_create_date` datetime NOT NULL COMMENT '//图片保存时间',
  PRIMARY KEY (`pic_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

-- --------------------------------------------------------

--
-- 表的结构 `nl_task`
--

CREATE TABLE IF NOT EXISTS `nl_task` (
  `task_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '任务id',
  `task_user_id` int(10) unsigned NOT NULL COMMENT '用户id',
  `task_create_time` datetime NOT NULL COMMENT '任务发布时间',
  `task_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '任务状态',
  `task_limit_time` datetime DEFAULT NULL COMMENT '设置任务完成时间',
  `task_property` tinyint(1) NOT NULL DEFAULT '0' COMMENT '任务属性',
  `task_is_remind` tinyint(1) DEFAULT '0' COMMENT '任务是否需要提醒',
  `task_content` varchar(255) NOT NULL COMMENT '任务内容',
  `task_reward` varchar(255) DEFAULT NULL COMMENT '任务奖励',
  `task_punish` varchar(255) DEFAULT NULL COMMENT '任务惩罚',
  `task_close_time` datetime DEFAULT NULL COMMENT '任务完成时间',
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `nl_user`
--

CREATE TABLE IF NOT EXISTS `nl_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '//用户ID',
  `user_nickname` varchar(25) DEFAULT NULL COMMENT '//用户昵称',
  `user_name` varchar(25) NOT NULL COMMENT '//用户名',
  `user_password` varchar(50) NOT NULL COMMENT '//用户密码',
  `user_avatar` varchar(40) DEFAULT NULL COMMENT '//用户头像',
  `user_avatar_mini` varchar(100) DEFAULT NULL COMMENT '//mini头像',
  `user_sign` varchar(20) DEFAULT NULL COMMENT '//用户星座',
  `user_sex` tinyint(2) DEFAULT '0' COMMENT '//用户性别，0默认，1男，2女',
  `user_birthday` varchar(12) DEFAULT NULL COMMENT '//用户生日',
  `user_description` varchar(200) DEFAULT NULL COMMENT '//用户简介',
  `user_signature` varchar(100) DEFAULT NULL COMMENT '//用户个性签名',
  `user_province` varchar(12) DEFAULT NULL COMMENT '//省份名',
  `user_city` varchar(12) DEFAULT NULL COMMENT '//城市名',
  `user_create_time` datetime NOT NULL COMMENT '//用户注册时间',
  `user_last_login_time` datetime NOT NULL COMMENT '//最后登录时间',
  `user_last_login_ip` varchar(20) DEFAULT NULL COMMENT '//会后登陆IP',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
