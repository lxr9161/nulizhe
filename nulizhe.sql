-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-01-21 10:14:51
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
  `user_create_time` datetime NOT NULL COMMENT '//用户注册时间',
  `user_last_login_time` datetime NOT NULL COMMENT '//最后登录时间',
  `user_last_login_ip` varchar(20) NOT NULL COMMENT '//会后登陆IP',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `nl_user`
--

INSERT INTO `nl_user` (`user_id`, `user_nickname`, `user_name`, `user_password`, `user_create_time`, `user_last_login_time`, `user_last_login_ip`) VALUES
(1, 'dalong', 'dalong', '7c4a8d09ca3762af61e59520943dc26494f8941b', '2016-01-07 00:00:00', '2016-01-13 00:00:00', '127.0.0.1'),
(2, NULL, '123', '123', '2016-01-21 16:42:08', '2016-01-21 16:42:08', '127.0.0.1');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
