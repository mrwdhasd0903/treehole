/*
SQLyog Enterprise v12.09 (64 bit)
MySQL - 5.5.62 : Database - treehole
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`treehole` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `treehole`;

/*Table structure for table `hibernate_sequence` */

DROP TABLE IF EXISTS `hibernate_sequence`;

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `hibernate_sequence` */

insert  into `hibernate_sequence`(`next_val`) values (51),(51);

/*Table structure for table `t_leave` */

DROP TABLE IF EXISTS `t_leave`;

CREATE TABLE `t_leave` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `imglist` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi27560ckp8c51yeuowcx6qi1c` (`user_id`),
  CONSTRAINT `FKi27560ckp8c51yeuowcx6qi1c` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `t_leave` */

insert  into `t_leave`(`id`,`content`,`create_time`,`imglist`,`user_id`) values (8,'123123123','2020-05-23 14:12:26','',1),(9,'12312123','2020-05-23 14:14:49','./io/img/2020/5/26/1590471812574.jpg',1),(10,'123','2020-05-23 14:17:53','./io/img/2020/5/23/1590247367416.jpg,./io/img/2020/5/23/1590247370828.jpg',1),(11,'123123','2020-05-23 14:22:50','./io/img/2020/5/26/1590471564952.jpg',1),(12,'123','2020-05-23 14:23:55','',1),(13,'123123','2020-05-23 15:07:19','',1),(15,'123','2020-05-23 15:22:52','./io/img/2020/5/23/1590247367416.jpg,./io/img/2020/5/23/1590247370828.jpg',1),(16,'阿錒阿啊啊啊啊啊啊','2020-05-23 15:31:02','./io/img/2020/5/23/1590247849055.jpg,./io/img/2020/5/23/1590247858334.jpg',1),(17,'','2020-05-23 15:53:44','./io/img/2020/5/23/1590249219959.jpg',2),(18,'我又来了','2020-05-23 16:13:01','./io/img/2020/5/24/1590250380321.jpg',1),(21,'','2020-05-23 16:50:58','./io/img/2020/5/24/1590252656599.jpg',1),(22,'3123123','2020-05-23 16:59:17','./io/img/2020/5/26/1590471812574.jpg',1),(24,'今晚端一碗水，出门去抓一道月亮','2020-05-26 05:38:59','./io/img/2020/5/26/1590471533900.jpg',2),(25,'山河滚烫，星河浪漫，不如麻辣烫','2020-05-26 05:39:29','./io/img/2020/5/26/1590471564952.jpg',2),(26,'人生得意须尽欢 胡吃海塞须尽兴','2020-05-26 05:39:53','./io/img/2020/5/26/1590471591435.jpg',2),(27,'做人不要太攀比，要比就来比早起','2020-05-26 05:40:55','./io/img/2020/5/26/1590471653534.jpg',2),(28,'只有经历了大风大雨的人才知道，打伞并没有失眠卵用','2020-05-26 05:41:54','./io/img/2020/5/26/1590471709966.jpg',2),(29,'昨晚梦到我死了,见到阎王爷,阎王爷叫我给他写个生死簿后台管理系统','2020-05-26 05:42:53','./io/img/2020/5/26/1590471771339.jpg',2),(30,'现在的年轻人怎么都这么着急上床啊，上了床有什么用，不也是睡不着吗。','2020-05-26 05:43:57','./io/img/2020/5/26/1590471812574.jpg',2),(31,'以后只要是我的朋友，\n谁没钱了尽管和我说一声，\n·\n只要我有空，就可以给你讲讲，\n没钱的日子我是怎么度过的，尤其是最近。','2020-05-26 05:46:31','./io/img/2020/5/26/1590471989858.jpg',2),(32,'“天道不公”翻译成英文是\n·\nGod is a girl','2020-05-26 05:46:59','./io/img/2020/5/26/1590472018371.jpg',2),(33,'你喜欢苹果汁、葡萄汁、西瓜汁、还是我这个小逼崽汁。','2020-05-26 05:48:09','./io/img/2020/5/26/1590472087307.jpg',2),(34,'造作?','2020-05-26 05:50:03','./io/img/2020/5/26/1590472104305.jpg,./io/img/2020/5/26/1590472113820.jpg',2),(35,'','2020-05-26 05:52:09','./io/img/2020/5/26/1590472304280.jpg,./io/img/2020/5/26/1590472311819.jpg,./io/img/2020/5/26/1590472318848.jpg,./io/img/2020/5/26/1590472326798.jpg',2),(36,'经过上述讨论， 了解清楚一天掉多少根头发到底是一种怎么样的存在，是解决一切问题的关键。 带着这些问题，我们来审视一下一天掉多少根头发。 这样看来， 克劳斯·莫瑟爵士曾经说过，教育需要花费钱，而无知也是一样。这启发了我， 总结的来说， 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 左拉说过一句富有哲理的话，生活的道路一旦选定，就要勇敢地走到底，决不回头。','2020-05-26 05:54:13','./io/img/2020/5/26/1590472450443.jpg',3),(38,'莎士比亚说过一句富有哲理的话，本来无望的事，大胆尝试，往往能成功。这句话语虽然很短，但令我浮想联翩。 问题的关键究竟为何？ 从这个角度来看， 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。','2020-05-29 07:33:14','./io/img/2020/5/24/1590250380321.jpg',37),(50,'我是铠甲勇士中的刑天铠甲!!!!!!!!!!!!!!!oliget','2020-06-02 08:07:38','',49);

/*Table structure for table `t_user` */

DROP TABLE IF EXISTS `t_user`;

CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nickname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `t_user` */

insert  into `t_user`(`id`,`avatar`,`nickname`,`password`,`username`) values (1,'./io/img/2020/5/26/1590471354760.jpg','小王2号','21232f297a57a5a743894a0e4a801fc3','admin'),(2,'./io/img/2020/5/26/1590471354761.jpg','小王','0c8c4eeb19abc6c501b59287ba5ae9e4','xiaowang'),(3,'./io/img/2020/5/26/1590471354762.jpg','test','098f6bcd4621d373cade4e832627b4f6','test'),(4,'./io/img/2020/5/26/1590471354760.jpg','bbb4','47bce5c74f589f4867dbd57e9ca9f808','aaa'),(5,'./io/img/2020/5/26/1590471354762.jpg','mnmnm','a6af9ee18209ec45be9b2d955d04ff96','mnmnm'),(37,NULL,'顾朗','33a6008cfac4d0733b0a9486ebc5ca19','lxy9.18'),(49,NULL,'铠甲刑天','c97526955cf3a10e12f265bb6564799c','kaijia');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
