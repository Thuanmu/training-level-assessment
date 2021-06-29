-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: traininglevelassessment
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `athlete`
--

DROP TABLE IF EXISTS `athlete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `athlete` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `athlete_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `athlete_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `athlete_rank` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` int NOT NULL,
  `grade` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hometown` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `total_scores_of_criterias` double DEFAULT NULL,
  `coach_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_e7jb6wdmeetfvs3777qahin0` (`athlete_code`),
  KEY `FKshq4bkudtp2pcowvgptfdyh3p` (`coach_id`),
  CONSTRAINT `FKshq4bkudtp2pcowvgptfdyh3p` FOREIGN KEY (`coach_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athlete`
--

LOCK TABLES `athlete` WRITE;
/*!40000 ALTER TABLE `athlete` DISABLE KEYS */;
INSERT INTO `athlete` VALUES (1,'AT00001','Nguyễn Công Phượng','3','2021-03-10 06:19:17','1999-10-25',0,'Trung bình','Nghệ An 1','2021-06-22 11:16:39',89.78,2),(2,'AT00002','Vũ Văn Thanh','1','2021-03-10 06:20:08','1999-02-23',0,'Trung bình','Hải Dương','2021-06-15 10:01:43',90.11,2),(3,'AT00003','Nguyễn Văn Toàn','2','2021-03-10 06:21:24','1999-05-15',0,'Trung bình','Nam Định','2021-06-15 10:01:43',90.11,2),(21,'AT00004','Bùi Tấn Trường','2','2021-03-12 16:58:35','1997-05-14',0,'Khá','Thanh Hóa','2021-06-15 12:17:27',111.51,5),(22,'AT00005','Đỗ Duy Mạnh','3','2021-03-12 17:00:11','1998-06-14',0,'Trung bình','Hà Nội','2021-06-15 12:17:27',96.87,5),(23,'AT00006','Quế Ngọc Hải','1','2021-03-12 17:01:25','1997-02-23',0,'Khá','Hải Phòng','2021-06-15 12:17:27',135.78,5),(24,'AT00007','Nguyễn Quang Hải','5','2021-03-12 17:04:02','1999-05-15',0,'Trung bình','Hà Nội','2021-06-15 12:17:27',94.19,5),(25,'AT00008','Lương Xuân Trường','4','2021-03-12 17:04:56','1999-09-15',0,'Trung bình','Tuyên Quang','2021-06-15 12:17:27',95.64,5),(26,'AT00009','Phan Văn Đức','10','2021-03-12 17:06:03','1998-04-11',0,'Yếu','Thái Bình','2021-06-15 12:17:27',59.47,5),(27,'AT00010','Nguyễn Tiến Linh','9','2021-03-12 17:07:13','1997-12-05',0,'Yếu','Bình Dương','2021-06-15 12:17:27',69.4,5),(28,'AT00011','Nguyễn Hoàng Đức','7','2021-03-12 17:08:44','1999-07-17',0,'Trung bình','Nam Định','2021-06-15 12:17:27',77.4,5),(29,'AT00012',' Phạm Đức Huy','6','2021-03-12 17:10:07','1998-09-19',0,'Trung bình','Hà Nam','2021-06-15 12:17:27',86.09,5),(30,'AT00013','Đặng Văn Lâm','8','2021-03-12 17:13:28','1997-01-11',0,'Trung bình','Thái Bình','2021-06-15 12:17:27',73.63,5);
/*!40000 ALTER TABLE `athlete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `athlete_classification`
--

DROP TABLE IF EXISTS `athlete_classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `athlete_classification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `athlete_count` int DEFAULT NULL,
  `athlete_rank` int DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `grade` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_scores_of_criterias` double DEFAULT NULL,
  `athlete_id` bigint NOT NULL,
  `form_factor_id` bigint NOT NULL,
  `physical_factor_id` bigint NOT NULL,
  `psychophysiology_factor_id` bigint NOT NULL,
  `technical_factor_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_bsbcmr6aofdx0ube64ppb7byo` (`form_factor_id`),
  UNIQUE KEY `UK_qtg852mo2ak7b07tmuhq768rk` (`physical_factor_id`),
  UNIQUE KEY `UK_r5n6mncduf0h9i2jogrrd8w9o` (`psychophysiology_factor_id`),
  UNIQUE KEY `UK_7inwhg1hnenx32h0luurux5yi` (`technical_factor_id`),
  KEY `FKjthvaek1wrnwra49e5820x14n` (`athlete_id`),
  CONSTRAINT `FKcf9alfmj7y7yyelm0bvqr975k` FOREIGN KEY (`form_factor_id`) REFERENCES `form_factor` (`id`),
  CONSTRAINT `FKcnuij6jdifsvv9mqoentmlukp` FOREIGN KEY (`psychophysiology_factor_id`) REFERENCES `psychophysiology_factor` (`id`),
  CONSTRAINT `FKgvt9bdl694uah5nkon0n4gegm` FOREIGN KEY (`physical_factor_id`) REFERENCES `physical_factor` (`id`),
  CONSTRAINT `FKjthvaek1wrnwra49e5820x14n` FOREIGN KEY (`athlete_id`) REFERENCES `athlete` (`id`),
  CONSTRAINT `FKlyj6j0h8a4l6u5h32edmmpdj7` FOREIGN KEY (`technical_factor_id`) REFERENCES `technical_factor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athlete_classification`
--

LOCK TABLES `athlete_classification` WRITE;
/*!40000 ALTER TABLE `athlete_classification` DISABLE KEYS */;
INSERT INTO `athlete_classification` VALUES (103,3,3,'2021-03-14 10:01:43','Trung bình',89.78,1,1,1,1,1),(104,3,1,'2021-03-14 10:01:43','Trung bình',90.11,2,2,2,2,2),(105,3,2,'2021-03-14 10:01:43','Trung bình',90.11,3,3,3,3,3),(106,10,2,'2021-03-14 10:08:23','Khá',110.33,21,4,4,4,4),(107,10,3,'2021-03-14 10:08:23','Khá',109.71,22,5,5,5,5),(108,10,1,'2021-03-14 10:08:23','Khá',121.99,23,6,6,6,6),(109,10,5,'2021-03-14 10:08:23','Trung bình',92.89,24,7,7,7,7),(110,10,10,'2021-03-14 10:08:23','Yếu',66.04,26,9,9,9,9),(111,10,4,'2021-03-14 10:08:23','Trung bình',98.08,25,8,8,8,8),(112,10,9,'2021-03-14 10:08:23','Yếu',66.29,27,10,10,10,10),(113,10,6,'2021-03-14 10:08:23','Trung bình',82.27,28,11,11,11,11),(114,10,7,'2021-03-14 10:08:23','Trung bình',77.31,29,12,12,12,12),(115,10,8,'2021-03-14 10:08:23','Trung bình',75.11,30,13,13,13,13),(146,10,2,'2021-04-14 10:34:07','Khá',109.6,21,14,14,14,14),(147,10,3,'2021-04-14 10:34:07','Khá',109.55,22,15,15,15,15),(148,10,1,'2021-04-14 10:34:07','Khá',120.89,23,16,16,16,16),(149,10,5,'2021-04-14 10:34:07','Trung bình',93.98,24,17,17,17,17),(150,10,4,'2021-04-14 10:34:07','Trung bình',99.77,25,18,18,18,18),(151,10,10,'2021-04-14 10:34:07','Yếu',61.17,26,19,19,19,19),(152,10,9,'2021-04-14 10:34:07','Yếu',70.53,27,20,20,20,20),(153,10,7,'2021-04-14 10:34:07','Trung bình',79.47,28,21,21,21,21),(154,10,6,'2021-04-14 10:34:07','Trung bình',83.7,29,22,22,22,22),(155,10,8,'2021-04-14 10:34:07','Yếu',71.36,30,23,23,23,23),(156,10,2,'2021-05-14 10:50:56','Khá',109.6,21,24,24,24,24),(157,10,3,'2021-05-14 10:50:56','Khá',109.55,22,25,25,25,25),(158,10,1,'2021-05-14 10:50:56','Khá',120.89,23,26,26,26,26),(159,10,5,'2021-05-14 10:50:56','Trung bình',93.98,24,27,27,27,27),(160,10,4,'2021-05-14 10:50:56','Trung bình',99.77,25,28,28,28,28),(161,10,9,'2021-05-14 10:50:56','Yếu',70.53,27,30,30,30,30),(162,10,10,'2021-05-14 10:50:56','Yếu',61.17,26,29,29,29,29),(163,10,7,'2021-05-14 10:50:56','Trung bình',79.47,28,31,31,31,31),(164,10,6,'2021-05-14 10:50:56','Trung bình',83.7,29,32,32,32,32),(165,10,8,'2021-05-14 10:50:56','Yếu',71.36,30,33,33,33,33),(206,10,3,'2021-06-16 00:00:00','Trung bình',96.87,22,35,35,35,35),(207,10,2,'2021-06-16 00:00:00','Khá',111.51,21,34,34,34,34),(208,10,1,'2021-06-16 00:00:00','Khá',135.78,23,36,36,36,36),(209,10,5,'2021-06-16 00:00:00','Trung bình',94.19,24,37,37,37,37),(210,10,4,'2021-06-16 00:00:00','Trung bình',95.64,25,38,38,38,38),(211,10,10,'2021-06-16 00:00:00','Yếu',59.47,26,39,39,39,39),(212,10,7,'2021-06-16 00:00:00','Trung bình',77.4,28,40,40,40,40),(213,10,6,'2021-06-16 00:00:00','Trung bình',86.09,29,41,41,41,41),(214,10,8,'2021-06-16 00:00:00','Trung bình',73.63,30,42,42,42,42),(215,10,9,'2021-06-16 00:00:00','Yếu',69.4,27,43,43,43,43);
/*!40000 ALTER TABLE `athlete_classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_factor`
--

DROP TABLE IF EXISTS `form_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_factor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime DEFAULT NULL,
  `form_factor_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quetelet_quotient` double DEFAULT NULL,
  `status` int DEFAULT NULL,
  `athlete_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6ukhnewkm7yn8hq4jminv1b97` (`form_factor_code`),
  KEY `FK892r3t19myjvveydb7lpwavl3` (`athlete_id`),
  CONSTRAINT `FK892r3t19myjvveydb7lpwavl3` FOREIGN KEY (`athlete_id`) REFERENCES `athlete` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_factor`
--

LOCK TABLES `form_factor` WRITE;
/*!40000 ALTER TABLE `form_factor` DISABLE KEYS */;
INSERT INTO `form_factor` VALUES (1,'2021-03-12 07:27:21','FO210300001',395,1,1),(2,'2021-03-12 07:49:51','FO210300002',376,1,2),(3,'2021-03-12 08:06:53','FO210300003',414,1,3),(4,'2021-03-13 21:18:01','FO210300004',384,1,21),(5,'2021-03-13 21:29:14','FO210300005',412,1,22),(6,'2021-03-13 21:36:28','FO210300006',394,1,23),(7,'2021-03-13 21:42:53','FO210300007',390,1,24),(8,'2021-03-13 21:49:34','FO210300008',393,1,25),(9,'2021-03-13 22:36:01','FO210300009',397,1,26),(10,'2021-03-13 22:41:59','FO210300010',412,1,27),(11,'2021-03-13 22:47:35','FO210300011',399,1,28),(12,'2021-03-13 22:50:33','FO210300012',411,1,29),(13,'2021-03-13 22:55:23','FO210300013',409,1,30),(14,'2021-04-14 01:32:10','FO210400004',385,1,21),(15,'2021-04-14 01:40:57','FO210400005',412,1,22),(16,'2021-04-14 01:47:25','FO210400006',395,1,23),(17,'2021-04-14 01:52:10','FO210400007',389,1,24),(18,'2021-04-14 01:56:08','FO210400008',393,1,25),(19,'2021-04-14 01:58:44','FO210400009',396,1,26),(20,'2021-04-14 02:00:32','FO210400010',411,1,27),(21,'2021-04-14 02:02:54','FO210400011',399,1,28),(22,'2021-04-14 02:04:40','FO210400012',411,1,29),(23,'2021-04-14 02:06:00','FO210400013',410,1,30),(24,'2021-05-15 02:28:50','FO210500004',385,1,21),(25,'2021-05-15 02:28:57','FO210500005',412,1,22),(26,'2021-05-15 02:29:06','FO210500006',395,1,23),(27,'2021-05-15 02:29:15','FO210500007',389,1,24),(28,'2021-05-15 02:29:26','FO210500008',393,1,25),(29,'2021-05-15 02:29:33','FO210500009',396,1,26),(30,'2021-05-15 02:29:46','FO210500010',411,1,27),(31,'2021-05-15 02:29:46','FO210500011',399,1,28),(32,'2021-05-15 02:29:53','FO210500012',411,1,29),(33,'2021-05-15 02:30:11','FO210500013',410,1,30),(34,'2021-06-11 12:02:45','FO210600004',386,1,21),(35,'2021-06-11 12:02:54','FO210600005',413,1,22),(36,'2021-06-11 12:03:04','FO210600006',397,1,23),(37,'2021-06-11 12:03:23','FO210600007',390,1,24),(38,'2021-06-11 12:03:35','FO210600008',395,1,25),(39,'2021-06-11 12:04:57','FO210600009',397,1,26),(40,'2021-06-11 12:07:40','FO210600011',400,1,28),(41,'2021-06-11 12:11:18','FO210600012',412,1,29),(42,'2021-06-11 12:11:26','FO210600013',411,1,30),(43,'2021-06-11 12:13:11','FO210600010',412,1,27);
/*!40000 ALTER TABLE `form_factor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `physical_factor`
--

DROP TABLE IF EXISTS `physical_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `physical_factor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `away_jump_in_place` double DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `eighty_meters_run_with_high_start` double DEFAULT NULL,
  `one_hundred_fifty_meters_run_with_high_start` double DEFAULT NULL,
  `physical_factor_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `run_time_of_last_20m_in_100m_run` double DEFAULT NULL,
  `sixty_meters_run_with_low_start` double DEFAULT NULL,
  `status` int DEFAULT NULL,
  `strength_coefficient_k` double DEFAULT NULL,
  `ten_steps_jump_in_place` double DEFAULT NULL,
  `thighs_raise_in_place_for_10s` double DEFAULT NULL,
  `thirty_meters_run_at_high_speed` double DEFAULT NULL,
  `thirty_meters_run_with_low_start` double DEFAULT NULL,
  `three_steps_jump_in_place` double DEFAULT NULL,
  `time_of_reflection_start` double DEFAULT NULL,
  `athlete_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1f9k4vowkv13dlsogaf2oei9q` (`physical_factor_code`),
  KEY `FKjedfra8jbwmyttswjufymu40h` (`athlete_id`),
  CONSTRAINT `FKjedfra8jbwmyttswjufymu40h` FOREIGN KEY (`athlete_id`) REFERENCES `athlete` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `physical_factor`
--

LOCK TABLES `physical_factor` WRITE;
/*!40000 ALTER TABLE `physical_factor` DISABLE KEYS */;
INSERT INTO `physical_factor` VALUES (1,3.01,'2021-03-12 07:21:06',8.63,16.54,'PH210300001',2.05,6.84,1,0.378,31.54,45,2.93,3.83,9.16,0.198,1),(2,2.96,'2021-03-12 07:39:22',8.42,16.17,'PH210300002',2,6.76,1,0.374,29.66,44,2.86,3.76,8.93,0.181,2),(3,3.06,'2021-03-12 07:58:35',8.84,16.91,'PH210300003',2.1,6.92,1,0.382,33.42,46,3,3.89,9.39,0.215,3),(4,3.04,'2021-03-13 17:28:56',8.56,16,'PH210300004',1.97,6.62,1,0.37,31.44,48,2.83,3.63,9.77,0.184,21),(5,3.07,'2021-03-13 17:52:23',8.34,16.51,'PH210300005',1.95,6.67,1,0.532,32.57,47,2.77,3.7,9.47,0.161,22),(6,3.06,'2021-03-13 21:33:29',8.53,15.26,'PH210300006',1.91,6.68,1,0.262,31.41,48,2.79,3.67,9.67,0.171,23),(7,3.07,'2021-03-13 21:40:08',8.3,16.55,'PH210300007',1.88,6.57,1,0.54,34.26,45,2.77,3.72,8.71,0.195,24),(8,3,'2021-03-13 21:45:41',8.26,16.09,'PH210300008',1.98,6.78,1,0.368,34.99,47,2.85,3.78,8.96,0.147,25),(9,2.96,'2021-03-13 22:36:01',8.65,16.89,'PH210300009',2.02,6.77,1,0.388,30.62,47,2.99,3.76,9.21,0.191,26),(10,2.98,'2021-03-13 22:41:59',8.55,16.45,'PH210300010',2.09,6.76,1,0.35,29.79,43,2.94,3.81,9.28,0.202,27),(11,3.07,'2021-03-13 22:47:35',8.69,16.55,'PH210300011',2.07,6.92,1,0.45,33.39,46,2.86,3.77,9.02,0.209,28),(12,2.95,'2021-03-13 22:50:33',8.54,16.55,'PH210300012',2,6.8,1,0.35,31.84,47,2.96,3.85,9.15,0.19,29),(13,3.04,'2021-03-13 22:55:23',8.81,16.92,'PH210300013',2.09,6.9,1,0.414,33.17,45,2.97,3.85,9.29,0.193,30),(14,3.04,'2021-04-14 01:32:10',8.56,16,'PH210400004',1.97,6.62,1,0.38,31.44,48,2.82,3.62,9.77,0.183,21),(15,3.07,'2021-04-14 01:40:57',8.32,16.58,'PH210400005',1.95,6.67,1,0.566,32.57,48,2.75,3.68,9.47,0.161,22),(16,3.06,'2021-04-14 01:47:25',8.53,15.36,'PH210400006',1.91,6.68,1,0.292,31.41,48,2.78,3.68,9.67,0.17,23),(17,3.06,'2021-04-14 01:52:10',8.29,16.55,'PH210400007',1.87,6.54,1,0.54,34.28,46,2.77,3.72,8.73,0.193,24),(18,3,'2021-04-14 01:56:08',8.26,16.08,'PH210400008',1.98,6.78,1,0.386,34.99,47,2.83,3.76,8.96,0.149,25),(19,2.86,'2021-04-14 01:58:44',8.65,16.89,'PH210400009',2.02,6.77,1,0.388,30.62,47,2.99,3.76,9.21,0.191,26),(20,2.98,'2021-04-14 02:00:32',8.55,16.45,'PH210400010',2.09,6.74,1,0.351,29.79,44,2.94,3.81,9.28,0.202,27),(21,3.07,'2021-04-14 02:02:54',8.69,16.55,'PH210400011',2.07,6.92,1,0.46,33.39,46,2.85,3.76,9.02,0.209,28),(22,2.85,'2021-04-14 02:04:40',8.34,16.55,'PH210400012',2,6.8,1,0.35,31.84,47,2.86,3.75,9.15,0.19,29),(23,3.04,'2021-04-14 02:06:00',8.81,16.92,'PH210400013',2.09,6.9,1,0.414,33.17,45,2.97,3.85,9.29,0.193,30),(24,3.04,'2021-05-15 02:28:50',8.56,16,'PH210500004',1.97,6.62,1,0.38,31.44,48,2.82,3.62,9.77,0.183,21),(25,3.07,'2021-05-15 02:28:57',8.32,16.58,'PH210500005',1.95,6.67,1,0.566,32.57,48,2.75,3.68,9.47,0.161,22),(26,3.06,'2021-05-15 02:29:06',8.53,15.36,'PH210500006',1.91,6.68,1,0.292,31.41,48,2.78,3.68,9.67,0.17,23),(27,3.06,'2021-05-15 02:29:15',8.29,16.55,'PH210500007',1.87,6.54,1,0.54,34.28,46,2.77,3.72,8.73,0.193,24),(28,3,'2021-05-15 02:29:26',8.26,16.08,'PH210500008',1.98,6.78,1,0.386,34.99,47,2.83,3.76,8.96,0.149,25),(29,2.86,'2021-05-15 02:29:33',8.65,16.89,'PH210500009',2.02,6.77,1,0.388,30.62,47,2.99,3.76,9.21,0.191,26),(30,2.98,'2021-05-15 02:29:46',8.55,16.45,'PH210500010',2.09,6.74,1,0.351,29.79,44,2.94,3.81,9.28,0.202,27),(31,3.07,'2021-05-15 02:29:46',8.69,16.55,'PH210500011',2.07,6.92,1,0.46,33.39,46,2.85,3.76,9.02,0.209,28),(32,2.85,'2021-05-15 02:29:53',8.34,16.55,'PH210500012',2,6.8,1,0.35,31.84,47,2.86,3.75,9.15,0.19,29),(33,3.04,'2021-05-15 02:30:11',8.81,16.92,'PH210500013',2.09,6.9,1,0.414,33.17,45,2.97,3.85,9.29,0.193,30),(34,2.94,'2021-06-11 12:02:45',8.46,15.1,'PH210600004',1.97,6.32,1,0.3,32.44,48,2.72,3.42,10.77,0.173,21),(35,3.07,'2021-06-11 12:02:54',8.32,16.58,'PH210600005',1.95,6.67,1,0.566,32.57,48,2.75,3.68,9.47,0.161,22),(36,3.76,'2021-06-11 12:03:04',8.03,14.56,'PH210600006',1.91,6.48,1,0.232,32.41,48,2.68,3.28,9.97,0.153,23),(37,3.56,'2021-06-11 12:03:23',8.29,16.35,'PH210600007',1.67,6.54,1,0.5,35.28,46,2.77,3.72,9.13,0.173,24),(38,3,'2021-06-11 12:03:35',8.26,16.08,'PH210600008',1.98,6.78,1,0.386,34.99,47,2.73,3.56,8.96,0.129,25),(39,2.86,'2021-06-11 12:04:57',8.65,16.89,'PH210600009',2.02,6.77,1,0.388,30.62,47,2.99,3.76,9.21,0.191,26),(40,3.07,'2021-06-11 12:07:40',8.69,16.55,'PH210600011',2.07,6.92,1,0.46,33.39,46,2.85,3.76,9.02,0.209,28),(41,2.85,'2021-06-11 12:11:18',8.34,16.55,'PH210600012',2,6.8,1,0.35,31.84,47,2.86,3.75,9.15,0.19,29),(42,3.04,'2021-06-11 12:11:26',8.81,16.92,'PH210600013',2.09,6.9,1,0.414,33.17,46,2.97,3.85,9.29,0.193,30),(43,2.98,'2021-06-11 12:13:11',8.55,16.45,'PH210600010',2.09,6.74,1,0.351,29.79,44,2.94,3.81,9.28,0.202,27);
/*!40000 ALTER TABLE `physical_factor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psychophysiology_factor`
--

DROP TABLE IF EXISTS `psychophysiology_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psychophysiology_factor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime DEFAULT NULL,
  `heart_rate_at_5s_after_100m_run` double DEFAULT NULL,
  `lactic_acid_content_after_100m_run` double DEFAULT NULL,
  `living_capacity_quotient` double DEFAULT NULL,
  `psychophysiology_factor_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restored_heart_rate_at_30s_after_100m_run` double DEFAULT NULL,
  `single_reflection_time` double DEFAULT NULL,
  `status` int DEFAULT NULL,
  `athlete_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_2mgf9b3gqxa3v0kqb1t4kxbt7` (`psychophysiology_factor_code`),
  KEY `FK523ke1yms3lj8jm8ugnn7jlp1` (`athlete_id`),
  CONSTRAINT `FK523ke1yms3lj8jm8ugnn7jlp1` FOREIGN KEY (`athlete_id`) REFERENCES `athlete` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psychophysiology_factor`
--

LOCK TABLES `psychophysiology_factor` WRITE;
/*!40000 ALTER TABLE `psychophysiology_factor` DISABLE KEYS */;
INSERT INTO `psychophysiology_factor` VALUES (1,'2021-03-12 07:25:49',198,6.8,68.6,'PS210300001',158,0.15,1,1),(2,'2021-03-12 07:48:20',187.43,5.94,68.5,'PS210300002',138.93,0.14,1,2),(3,'2021-03-12 08:04:37',208.57,7.67,68.7,'PS210300003',177.07,0.16,1,3),(4,'2021-03-13 21:17:06',208.02,6.9,70.37,'PS210300004',160.47,0.134,1,21),(5,'2021-03-13 21:27:29',200.25,7.04,70.39,'PS210300005',169.61,0.172,1,22),(6,'2021-03-13 21:35:05',207.74,7.2,70.38,'PS210300006',171.07,0.134,1,23),(7,'2021-03-13 21:42:32',190.44,6.4,70.45,'PS210300007',140.51,0.144,1,24),(8,'2021-03-13 21:48:52',197.08,6.67,70.42,'PS210300008',167.15,0.177,1,25),(9,'2021-03-13 22:36:01',194.5,6.25,68.59,'PS210300009',159.46,0.147,1,26),(10,'2021-03-13 22:41:59',201.47,6.8,68.61,'PS210300010',146.37,0.167,1,27),(11,'2021-03-13 22:47:35',203.49,7.23,68.66,'PS210300011',163.69,0.148,1,28),(12,'2021-03-13 22:50:33',201.22,6.97,68.69,'PS210300012',161.33,0.163,1,29),(13,'2021-03-13 22:55:23',204.88,6.88,68.68,'PS210300013',168.31,0.137,1,30),(14,'2021-04-14 01:32:10',207.02,6.8,70.39,'PS210400004',160.49,0.133,1,21),(15,'2021-04-14 01:40:57',201.25,7.03,70.39,'PS210400005',168.61,0.172,1,22),(16,'2021-04-14 01:47:25',208.74,7.2,71.38,'PS210400006',172.07,0.133,1,23),(17,'2021-04-14 01:52:10',191.44,6.4,70.45,'PS210400007',140.51,0.143,1,24),(18,'2021-04-14 01:56:08',195.08,6.63,70.52,'PS210400008',177.15,0.174,1,25),(19,'2021-04-14 01:58:44',184.5,6.25,68.59,'PS210400009',153.46,0.147,1,26),(20,'2021-04-14 02:00:32',203.47,6.8,69.61,'PS210400010',148.37,0.167,1,27),(21,'2021-04-14 02:02:54',204.49,7.21,67.66,'PS210400011',163.79,0.148,1,28),(22,'2021-04-14 02:04:40',203.22,6.93,67.69,'PS210400012',171.33,0.163,1,29),(23,'2021-04-14 02:06:00',204.58,6.48,68.68,'PS210400013',166.31,0.137,1,30),(24,'2021-05-15 02:28:50',207.02,6.8,70.39,'PS210500004',160.49,0.133,1,21),(25,'2021-05-15 02:28:57',201.25,7.03,70.39,'PS210500005',168.61,0.172,1,22),(26,'2021-05-15 02:29:06',208.74,7.2,71.38,'PS210500006',172.07,0.133,1,23),(27,'2021-05-15 02:29:15',191.44,6.4,70.45,'PS210500007',140.51,0.143,1,24),(28,'2021-05-15 02:29:26',195.08,6.63,70.52,'PS210500008',177.15,0.174,1,25),(29,'2021-05-15 02:29:33',184.5,6.25,68.59,'PS210500009',153.46,0.147,1,26),(30,'2021-05-15 02:29:46',203.47,6.8,69.61,'PS210500010',148.37,0.167,1,27),(31,'2021-05-15 02:29:46',204.49,7.21,67.66,'PS210500011',163.79,0.148,1,28),(32,'2021-05-15 02:29:53',203.22,6.93,67.69,'PS210500012',171.33,0.163,1,29),(33,'2021-05-15 02:30:11',204.58,6.48,68.68,'PS210500013',166.31,0.137,1,30),(34,'2021-06-11 12:02:45',210.02,6.9,74.39,'PS210600004',166.49,0.123,1,21),(35,'2021-06-11 12:02:54',205.25,7.05,70.39,'PS210600005',178.61,0.172,1,22),(36,'2021-06-11 12:03:04',212.74,7.9,77.38,'PS210600006',178.07,0.123,1,23),(37,'2021-06-11 12:03:23',195.44,6.7,73.45,'PS210600007',145.51,0.143,1,24),(38,'2021-06-11 12:03:35',199.08,6.73,73.52,'PS210600008',179.15,0.174,1,25),(39,'2021-06-11 12:04:57',194.5,6.55,70.59,'PS210600009',159.46,0.147,1,26),(40,'2021-06-11 12:07:40',207.49,7.41,69.66,'PS210600011',165.79,0.148,1,28),(41,'2021-06-11 12:11:18',206.22,6.98,71.69,'PS210600012',175.33,0.153,1,29),(42,'2021-06-11 12:11:26',206.58,6.49,69.68,'PS210600013',167.31,0.127,1,30),(43,'2021-06-11 12:13:11',207.47,6.9,72.61,'PS210600010',152.37,0.167,1,27);
/*!40000 ALTER TABLE `psychophysiology_factor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ATHLETE'),(2,'ROLE_COACH'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technical_factor`
--

DROP TABLE IF EXISTS `technical_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technical_factor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime DEFAULT NULL,
  `grounding_time_when_reaching_high_speed` double DEFAULT NULL,
  `performance_difference` double DEFAULT NULL,
  `status` int DEFAULT NULL,
  `technical_factor_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `athlete_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_rlap6flodtyjn32x28wcrak73` (`technical_factor_code`),
  KEY `FKf1uwuec0immlf8enc5w77i3pl` (`athlete_id`),
  CONSTRAINT `FKf1uwuec0immlf8enc5w77i3pl` FOREIGN KEY (`athlete_id`) REFERENCES `athlete` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technical_factor`
--

LOCK TABLES `technical_factor` WRITE;
/*!40000 ALTER TABLE `technical_factor` DISABLE KEYS */;
INSERT INTO `technical_factor` VALUES (1,'2021-03-12 07:24:06',0.1,0.9,1,'TE210300001',1),(2,'2021-03-12 07:42:10',0.089,0.9,1,'TE210300002',2),(3,'2021-03-12 08:02:14',0.11,0.89,1,'TE210300003',3),(4,'2021-03-13 17:41:22',0.08,0.8,1,'TE210300004',21),(5,'2021-03-13 21:23:26',0.096,0.93,1,'TE210300005',22),(6,'2021-03-13 21:34:08',0.081,0.88,1,'TE210300006',23),(7,'2021-03-13 21:41:10',0.077,0.95,1,'TE210300007',24),(8,'2021-03-13 21:46:56',0.079,0.93,1,'TE210300008',25),(9,'2021-03-13 22:36:01',0.104,0.77,1,'TE210300009',26),(10,'2021-03-13 22:41:59',0.096,0.87,1,'TE210300010',27),(11,'2021-03-13 22:47:35',0.096,0.91,1,'TE210300011',28),(12,'2021-03-13 22:50:33',0.1,0.89,1,'TE210300012',29),(13,'2021-03-13 22:55:23',0.108,0.88,1,'TE210300013',30),(14,'2021-04-14 01:32:10',0.07,0.8,1,'TE210400004',21),(15,'2021-04-14 01:40:57',0.096,0.93,1,'TE210400005',22),(16,'2021-04-14 01:47:25',0.081,0.9,1,'TE210400006',23),(17,'2021-04-14 01:52:10',0.074,0.95,1,'TE210400007',24),(18,'2021-04-14 01:56:08',0.074,0.93,1,'TE210400008',25),(19,'2021-04-14 01:58:44',0.104,0.77,1,'TE210400009',26),(20,'2021-04-14 02:00:32',0.094,0.87,1,'TE210400010',27),(21,'2021-04-14 02:02:54',0.096,0.91,1,'TE210400011',28),(22,'2021-04-14 02:04:40',0.1,0.89,1,'TE210400012',29),(23,'2021-04-14 02:06:00',0.104,0.88,1,'TE210400013',30),(24,'2021-05-15 02:28:50',0.07,0.8,1,'TE210500004',21),(25,'2021-05-15 02:28:57',0.096,0.93,1,'TE210500005',22),(26,'2021-05-15 02:29:06',0.081,0.9,1,'TE210500006',23),(27,'2021-05-15 02:29:15',0.074,0.95,1,'TE210500007',24),(28,'2021-05-15 02:29:26',0.074,0.93,1,'TE210500008',25),(29,'2021-05-15 02:29:33',0.104,0.77,1,'TE210500009',26),(30,'2021-05-15 02:29:46',0.094,0.87,1,'TE210500010',27),(31,'2021-05-15 02:29:46',0.096,0.91,1,'TE210500011',28),(32,'2021-05-15 02:29:53',0.1,0.89,1,'TE210500012',29),(33,'2021-05-15 02:30:11',0.104,0.88,1,'TE210500013',30),(34,'2021-06-11 12:02:45',0.07,0.7,1,'TE210600004',21),(35,'2021-06-11 12:02:54',0.086,0.93,1,'TE210600005',22),(36,'2021-06-11 12:03:04',0.061,0.6,1,'TE210600006',23),(37,'2021-06-11 12:03:23',0.064,0.95,1,'TE210600007',24),(38,'2021-06-11 12:03:35',0.064,0.83,1,'TE210600008',25),(39,'2021-06-11 12:04:57',0.904,0.77,1,'TE210600009',26),(40,'2021-06-11 12:07:40',0.076,0.91,1,'TE210600011',28),(41,'2021-06-11 12:11:18',0.09,0.89,1,'TE210600012',29),(42,'2021-06-11 12:11:26',0.101,0.88,1,'TE210600013',30),(43,'2021-06-11 12:13:11',0.084,0.87,1,'TE210600010',27),(44,'2021-06-19 10:16:26',NULL,NULL,0,'TE210600001',1);
/*!40000 ALTER TABLE `technical_factor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `athlete_code_used` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `hometown` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `workplace` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'2021-05-04 06:09:24','1999-06-28','admin@gmail.com','Phạm Văn Thuấn',0,'Thái Bình','Lập trình viên','2021-06-24 00:20:03','$2a$10$M/ovhjFSlTBeoBlOXzmlgucYUfWotVoXZUyLhD0EXgEFc.0LnD6OG',1,'admin','Hà Nội'),(2,'','2021-05-04 06:15:52','1973-02-26','ole@gmail.com','Ole Gunnar Solskjær',0,'Hải Phòng','HLV chạy 100m nam','2021-06-24 00:22:08','$2a$10$kRSi2IKPTTpach9l7Uh3x.vQsjkUUPgd.IYLxXC94Be.1hT2AZCKq',1,'ole','Hải Phòng'),(3,'','2021-05-04 06:17:09','1960-12-31','alex@gmail.com','Alex Ferguson',0,'Nam Định','HLV chạy 100m nam','2021-06-24 00:31:34','$2a$10$OaM3oQrroTUvvKao761kJu4eECFuS4dJtYkdHIlldvMq4bkmEbTKO',0,'Alex','Bắc Ninh'),(4,'AT00007','2021-06-04 10:29:32','1999-05-15','pogba@gmail.com','Nguyễn Quang Hải',0,'Hà Nội','VĐV chạy 100m cấp cao','2021-06-24 00:30:49','$2a$10$kQflm6QwUyZ6PV6eYgBz9ejxuMqTmFxu1JC7CckdPTL25Jbjrwxz6',1,'pogba','Hà Nội'),(5,'','2021-06-14 16:52:16','1969-07-28','duc@gmail.com','Đoàn Nguyên Đức',0,'Thái Bình','HLV chạy 100m nam','2021-06-19 01:04:22','$2a$10$U3oWvOwW8cEQLXS1JNbLSudKBD51W7I0SxHikcXBIheSvXe.8NvZe',1,'Đức','Hà Nội');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`),
  CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (4,1),(2,2),(3,2),(5,2),(1,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-29 12:28:11
