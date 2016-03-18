-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-03-18 10:34:11
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
-- 表的结构 `nl_user_behavior`
--

CREATE TABLE IF NOT EXISTS `nl_user_behavior` (
  `behavior_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '行为编码',
  `behavior_user_id` int(10) unsigned NOT NULL COMMENT '用户ID',
  `login_count` int(10) unsigned NOT NULL COMMENT '登录次数',
  `task_count` int(10) unsigned NOT NULL COMMENT '任务总数',
  `task_close_count` int(10) unsigned NOT NULL COMMENT '任务完成总数',
  `task_delete_count` int(10) unsigned NOT NULL COMMENT '任务删除个数',
  PRIMARY KEY (`behavior_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
