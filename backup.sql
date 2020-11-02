-- MySQL dump 10.13  Distrib 5.7.30, for Win64 (x86_64)
--
-- Host: localhost    Database: persons
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents` (
  `ID` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Title` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `Content` varchar(10000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UpdatedTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `Whether` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES ('sunil','테스트','테스트작성','2020-07-06 00:15:42',1),('sunil','테스트','테스트작성','2020-07-06 00:27:18',0),('sunil','테스트','테스트작성','2020-07-06 00:27:29',0),('sunil','테스트','테스트작성','2020-07-06 00:27:41',1),('sunil','테스트','테스트작성','2020-07-06 00:27:47',1),('sunil','ㅋㅌㅊㅍㅁㄴㅇㄻㄴㅇㄹ','ㅁㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹㅋㅌㅊㅍ','2020-07-14 01:46:53',1),('sunil','ㅁㅇㄴㄻㄴㅇㄹ','ㅁㄴㅇㄻㄴㅇㄹ','2020-07-14 01:47:44',1),('sunil','ㅁㅁㄴㅇㄻㄴㅇㄹ','ㄻㄴㅇㄻㄴㅇㅁㄹ','2020-07-14 01:48:01',1),('sunil','ㅁㄴㅇㄻ','ㅁㄴㅇㄻㅍㅋㅌㅊㅍㅈ3ㄷㄱㅎㅂㅁㅋㄴㅇ륩ㅁ곱ㅈㄷㄱ','2020-07-14 01:48:23',1),('sunil','ㅁㅇㄹ','ㅁㄴㅇㄻㄴㅇㄻㄴ','2020-07-14 01:49:00',1),('sunil','asdf','asdfzxcvqrqewrhqaefgnxzcvnqaerth','2020-07-18 21:38:07',1),('sunil','qaehnq3ETNVXNCVN','zxcv','2020-07-18 21:38:56',1);
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `people` (
  `ID` varchar(150) COLLATE utf8mb4_bin NOT NULL,
  `Password` varchar(150) COLLATE utf8mb4_bin NOT NULL,
  `Email` varchar(150) COLLATE utf8mb4_bin DEFAULT NULL,
  `Phone` varchar(150) COLLATE utf8mb4_bin DEFAULT NULL,
  `Update_Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Rank` varchar(100) COLLATE utf8mb4_bin DEFAULT 'Nomal',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES ('asdf','4093b785077902dd789e5f40c0c4c47e:67a36be34ceb3df45238fc5d13376588','asdf@gmail.com','010-9031-2746','2020-07-18 21:27:31','Nomal'),('sunil','ad3d2f7fd8ab7d88555a31edf681aac0:560ab8ffcab827b5400d0d0ace76aa1d','seonil6352@gmail.com','010-9031-2746','2020-07-18 21:28:49','Nomal'),('taeseok1020','*CC98C5773D4FFF8988DBB8F8CB5C43197862F454','tand2003@naver.com','010-5910-8423','2020-06-22 13:11:17','Nomal');
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-19  6:39:33
