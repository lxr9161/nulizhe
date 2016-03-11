-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-03-11 10:28:12
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
-- 表的结构 `nl_task`
--

CREATE TABLE IF NOT EXISTS `nl_task` (
  `task_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '任务id',
  `task_user_id` int(10) unsigned NOT NULL COMMENT '用户id',
  `task_create_time` datetime NOT NULL COMMENT '任务发布时间',
  `task_start_time` datetime DEFAULT '0000-00-00 00:00:00' COMMENT '任务开始时间',
  `task_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '任务状态',
  `task_limit_time` datetime DEFAULT NULL COMMENT '设置任务完成时间',
  `task_property` tinyint(1) NOT NULL DEFAULT '0' COMMENT '任务属性',
  `task_is_remind` tinyint(1) DEFAULT '0' COMMENT '任务是否需要提醒',
  `task_content` varchar(255) NOT NULL COMMENT '任务内容',
  `task_reward` varchar(255) DEFAULT NULL COMMENT '任务奖励',
  `task_punish` varchar(255) DEFAULT NULL COMMENT '任务惩罚',
  `task_close_time` datetime DEFAULT NULL COMMENT '任务完成时间',
  `task_update_time` datetime DEFAULT NULL COMMENT '任务修改时间',
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
