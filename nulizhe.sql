-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-01-28 10:00:33
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `nl_user`
--

INSERT INTO `nl_user` (`user_id`, `user_nickname`, `user_name`, `user_password`, `user_avater`, `user_sign`, `user_sex`, `user_age`, `user_description`, `user_signature`, `user_addr`, `user_create_time`, `user_last_login_time`, `user_last_login_ip`) VALUES
(1, 'dalong', 'dalong', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, 0, NULL, NULL, NULL, NULL, '2016-01-07 00:00:00', '2016-01-13 00:00:00', '127.0.0.1'),
(2, NULL, '123', '123', NULL, NULL, 0, NULL, NULL, NULL, NULL, '2016-01-21 16:42:08', '2016-01-21 16:42:08', '127.0.0.1'),
(4, NULL, '你好啊', 'ca582dc797fedc6faa3e09d198b4cd8823d6f7a8', NULL, NULL, 0, NULL, NULL, NULL, NULL, '2016-01-22 11:01:03', '2016-01-22 11:01:03', '127.0.0.1'),
(5, NULL, 'admin', '20eabe5d64b0e216796e834f52d61fd0b70332fc', NULL, NULL, 0, NULL, NULL, NULL, NULL, '2016-01-25 10:46:50', '2016-01-25 10:46:50', '127.0.0.1'),
(6, NULL, 'liuxiaorong', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, 0, NULL, NULL, NULL, NULL, '2016-01-25 11:21:47', '2016-01-25 11:21:47', '127.0.0.1'),
(7, NULL, 'zhoujielun', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, 0, NULL, NULL, NULL, NULL, '2016-01-26 10:48:21', '2016-01-26 10:48:21', '127.0.0.1'),
(8, NULL, 'linjunjie', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, 0, NULL, NULL, NULL, NULL, '2016-01-26 10:51:07', '2016-01-26 10:51:07', '127.0.0.1');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
