-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-02-22 10:20:18
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

-- --------------------------------------------------------

--
-- 表的结构 `nl_user`
--

CREATE TABLE IF NOT EXISTS `nl_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '//用户ID',
  `user_nickname` varchar(25) DEFAULT NULL COMMENT '//用户昵称',
  `user_name` varchar(25) NOT NULL COMMENT '//用户名',
  `user_password` varchar(50) NOT NULL COMMENT '//用户密码',
  `user_avater` varchar(40) DEFAULT NULL COMMENT '//用户头像',
  `user_sign` varchar(20) DEFAULT NULL COMMENT '//用户星座',
  `user_sex` tinyint(2) DEFAULT '0' COMMENT '//用户性别，0默认，1男，2女',
  `user_age` varchar(3) DEFAULT NULL COMMENT '//用户年龄',
  `user_description` varchar(200) DEFAULT NULL COMMENT '//用户简介',
  `user_signature` varchar(100) DEFAULT NULL COMMENT '//用户个性签名',
  `user_addr` varchar(20) DEFAULT NULL COMMENT '//用户所在地',
  `user_create_time` datetime NOT NULL COMMENT '//用户注册时间',
  `user_last_login_time` datetime NOT NULL COMMENT '//最后登录时间',
  `user_last_login_ip` varchar(20) DEFAULT NULL COMMENT '//会后登陆IP',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
