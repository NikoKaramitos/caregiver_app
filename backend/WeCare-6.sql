-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 04, 2024 at 12:31 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WeCare`
--

-- --------------------------------------------------------

--
-- Table structure for table `contracts`
--

CREATE TABLE `contracts` (
  `contractID` int(11) NOT NULL,
  `caregiverID` int(11) NOT NULL,
  `recipientID` int(11) NOT NULL,
  `recipientParentID` int(11) NOT NULL,
  `startDate` int(11) NOT NULL,
  `endDate` int(11) NOT NULL,
  `weeklyHours` int(11) NOT NULL,
  `approval` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contracts`
--

INSERT INTO `contracts` (`contractID`, `caregiverID`, `recipientID`, `recipientParentID`, `startDate`, `endDate`, `weeklyHours`, `approval`) VALUES
(8, 40, 38, 3, 20075, 20088, 12, 1),
(9, 38, 40, 4, 20090, 20124, 15, 1),
(11, 38, 40, 4, 20062, 20077, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `memberID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `timeAvailable` int(11) DEFAULT NULL,
  `careDollars` int(11) DEFAULT 2000,
  `totalStars` int(11) NOT NULL DEFAULT 0,
  `ratingCount` int(11) NOT NULL DEFAULT 0,
  `lastTenRatings` text NOT NULL,
  `rate` int(11) NOT NULL DEFAULT 30,
  `profilePictureURL` varchar(255) NOT NULL DEFAULT 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`memberID`, `username`, `password`, `name`, `email`, `phone`, `address`, `timeAvailable`, `careDollars`, `totalStars`, `ratingCount`, `lastTenRatings`, `rate`, `profilePictureURL`) VALUES
(1, 'RickL', 'COP4331', 'Rick', 'trickyrickydicky@email.com', '123456789', '69 Rick Lane, Orlando, FL', 24, 2000, 6, 2, '0000000000,2,4', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(6, 'giogio', 'giooig', 'gio', 'gio@gio.com', '1234567890', '3828 Piermont Drive NE, Albuquerque, NM 87111 USA', 3, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(7, 'niko1', 'niko1', 'niko', 'niko@email.com', '1029384756', '123 Main, Orlando, FL 32818 USA', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(8, 'user1', 'password1', 'User One', 'user1@example.com', '5550001', '1 First St, Cityville, State, 10001', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(9, 'user2', 'password2', 'User Two', 'user2@example.com', '5550002', '2 Second St, Townsville, State, 10002', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(10, 'user3', 'password3', 'User Three', 'user3@example.com', '5550003', '3 Third Ave, Villageville, State, 10003', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(11, 'user4', 'password4', 'User Four', 'user4@example.com', '5550004', '4 Fourth Blvd, Hamletville, State, 10004', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(12, 'user5', 'password5', 'User Five', 'user5@example.com', '5550005', '5 Fifth Rd, Boroughville, State, 10005', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(13, 'user6', 'password6', 'User Six', 'user6@example.com', '5550006', '6 Sixth Ln, Metropolis, State, 10006', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(14, 'user7', 'password7', 'User Seven', 'user7@example.com', '5550007', '7 Seventh Dr, Capital City, State, 10007', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(15, 'user8', 'password8', 'User Eight', 'user8@example.com', '5550008', '8 Eighth Ct, Lakeside, State, 10008', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(16, 'user9', 'password9', 'User Nine', 'user9@example.com', '5550009', '9 Ninth Pl, Riverside, State, 10009', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(17, 'user10', 'password10', 'User Ten', 'user10@example.com', '5550010', '10 Tenth St, Hillside, State, 10010', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(18, 'user11', 'password11', 'User Eleven', 'user11@example.com', '5550011', '11 Eleventh Ave, Mountainview, State, 10011', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(19, 'user12', 'password12', 'User Twelve', 'user12@example.com', '5550012', '12 Twelfth Blvd, Oceanside, State, 10012', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(20, 'user13', 'password13', 'User Thirteen', 'user13@example.com', '5550013', '13 Thirteenth Rd, Forestville, State, 10013', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(21, 'user14', 'password14', 'User Fourteen', 'user14@example.com', '5550014', '14 Fourteenth Ln, Meadowbrook, State, 10014', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(22, 'user15', 'password15', 'User Fifteen', 'user15@example.com', '5550015', '15 Fifteenth Dr, Riverbend, State, 10015', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(23, 'user16', 'password16', 'User Sixteen', 'user16@example.com', '5550016', '16 Sixteenth Ct, Brookside, State, 10016', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(24, 'user17', 'password17', 'User Seventeen', 'user17@example.com', '5550017', '17 Seventeenth Pl, Sunnyside, State, 10017', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(25, 'user18', 'password18', 'User Eighteen', 'user18@example.com', '5550018', '18 Eighteenth St, Oldtown, State, 10018', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(26, 'user19', 'password19', 'User Nineteen', 'user19@example.com', '5550019', '19 Nineteenth Ave, Newtown, State, 10019', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(27, 'user20', 'password20', 'User Twenty', 'user20@example.com', '5550020', '20 Twentieth Blvd, Uptown, State, 10020', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(28, 'user21', 'password21', 'User Twenty-One', 'user21@example.com', '5550021', '21 Twenty-First Rd, Downtown, State, 10021', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(29, 'user22', 'password22', 'User Twenty-Two', 'user22@example.com', '5550022', '22 Twenty-Second Ln, Midtown, State, 10022', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(30, 'user23', 'password23', 'User Twenty-Three', 'user23@example.com', '5550023', '23 Twenty-Third Dr, Eastside, State, 10023', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(31, 'user24', 'password24', 'User Twenty-Four', 'user24@example.com', '5550024', '24 Twenty-Fourth Ct, Westside, State, 10024', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(32, 'user25', 'password25', 'User Twenty-Five', 'user25@example.com', '5550025', '25 Twenty-Fifth Pl, Northside, State, 10025', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(33, 'user26', 'password26', 'User Twenty-Six', 'user26@example.com', '5550026', '26 Twenty-Sixth St, Southside, State, 10026', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(34, 'user27', 'password27', 'User Twenty-Seven', 'user27@example.com', '5550027', '27 Twenty-Seventh Ave, Lakeshore, State, 10027', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(35, 'user28', 'password28', 'User Twenty-Eight', 'user28@example.com', '5550028', '28 Twenty-Eighth Blvd, Greenwood, State, 10028', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(36, 'user29', 'password29', 'User Twenty-Nine', 'user29@example.com', '5550029', '29 Twenty-Ninth Rd, Fairview, State, 10029', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(37, 'user30', 'password30', 'User Thirty', 'user30@example.com', '5550030', '30 Thirtieth Ln, Pleasantville, State, 10030', 0, 2000, 0, 0, '0000000000', 30, 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='),
(38, 'ww', '$2y$10$x6XXQrzXO6/2RDX7yspB/eljSl7TL4WVYoeHY92ykWMjj.6i.WJBi', 'Walter White YO', 'letscook@email.com', '1234567890', '3828 Piermont Drive NE, Albuquerque, NM 87111 USA', 57, 3080, 0, 0, '0000000000', 30, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTyN83AAXLgNootSEL8CMel-q0a3cqrzkysbmQVqAot9ac-c0pijWmHlsr6OYa2aU_Ylo&usqp=CAU'),
(40, 'harry', '$2y$10$1vtjNR1wiFB3.IuJFQpbiO3vDg0iGfdM9TVa3vDHsAnOln6MybZd2', 'harry', 'harry@harry.com', '1234567890', '123 Main, Orlando, FL 32818 USA', 2, 920, 15, 3, '0000000000,5,5,5', 25, 'https://img.freepik.com/premium-photo/vector-simple-illustration-japanese-cat-is-holding-samurai-sword_977378-11.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `new_member`
--

CREATE TABLE `new_member` (
  `memberID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `timeAvailable` int(11) DEFAULT NULL,
  `careDollars` int(11) DEFAULT 2000,
  `rating` int(11) DEFAULT 0,
  `lastTenRatings` text NOT NULL,
  `age` int(3) DEFAULT 30,
  `state` varchar(50) DEFAULT 'Florida',
  `city` varchar(50) DEFAULT 'Orlando',
  `image` varchar(255) DEFAULT 'https://img.a.transfermarkt.technology/portrait/big/445939-1696508916.jpg?lm=1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `new_member`
--

INSERT INTO `new_member` (`memberID`, `username`, `password`, `name`, `phone`, `address`, `timeAvailable`, `careDollars`, `rating`, `lastTenRatings`, `age`, `state`, `city`, `image`) VALUES
(1, 'user1', 'password1', 'Alice Johnson', '1234567890', '123 Main St', 10, 2500, 4, '4,5,5,4,4,5,5,4,5,4', 29, 'Florida', 'Orlando', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegouWjeS9e1_fACuI4oWxW2zWaAXxYKJMOg&s'),
(2, 'user2', 'password2', 'Bob Smith', '9876543210', '456 Elm St', 8, 2000, 5, '5,5,5,5,5,5,5,5,5,5', 35, 'Florida', 'Tampa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksG4mm4xFN-Ufeaf1ZZ8ixWe2k4aZknK1MQ&s'),
(3, 'user3', 'password3', 'Catherine Brown', '1122334455', '789 Oak Ave', 15, 2200, 3, '3,3,4,4,3,3,3,4,3,3', 28, 'Florida', 'Miami', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSK8JLKG7D93BYmbzZqR9TBObvfqbIIV_sQ&s'),
(4, 'user4', 'password4', 'Daniel Wilson', '2233445566', '321 Pine Rd', 12, 2100, 4, '4,4,4,4,5,4,4,4,4,4', 40, 'Florida', 'Jacksonville', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegouWjeS9e1_fACuI4oWxW2zWaAXxYKJMOg&s'),
(5, 'user5', 'password5', 'Emily Davis', '3344556677', '654 Maple Ln', 20, 2300, 5, '5,5,5,5,5,5,5,5,5,5', 25, 'Florida', 'Tallahassee', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksG4mm4xFN-Ufeaf1ZZ8ixWe2k4aZknK1MQ&s'),
(6, 'user6', 'password6', 'Frank Harris', '4455667788', '987 Birch St', 9, 2400, 3, '3,3,3,3,3,3,3,3,3,3', 31, 'Florida', 'Orlando', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSK8JLKG7D93BYmbzZqR9TBObvfqbIIV_sQ&s'),
(7, 'user7', 'password7', 'Grace Lee', '5566778899', '123 Cedar Blvd', 14, 2600, 4, '4,4,5,4,4,4,4,5,4,4', 34, 'Florida', 'Naples', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegouWjeS9e1_fACuI4oWxW2zWaAXxYKJMOg&s'),
(8, 'user8', 'password8', 'Henry Walker', '6677889900', '456 Palm Way', 6, 2200, 2, '2,2,2,3,2,2,2,3,2,2', 42, 'Florida', 'Gainesville', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksG4mm4xFN-Ufeaf1ZZ8ixWe2k4aZknK1MQ&s'),
(9, 'user9', 'password9', 'Isabella Martinez', '7788990011', '789 Spruce Ct', 18, 2700, 5, '5,5,5,4,5,5,5,5,5,5', 27, 'Florida', 'Orlando', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSK8JLKG7D93BYmbzZqR9TBObvfqbIIV_sQ&s'),
(10, 'user10', 'password10', 'James Thomas', '8899001122', '321 Poplar Ave', 11, 2500, 4, '4,4,4,4,4,4,4,4,4,4', 38, 'Florida', 'Sarasota', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegouWjeS9e1_fACuI4oWxW2zWaAXxYKJMOg&s');

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE `parent` (
  `parentID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent`
--

INSERT INTO `parent` (`parentID`, `memberID`, `name`, `phone`, `address`) VALUES
(1, 6, 'gios mom', '0987654321', 'gios moms house, Gio, FL, 32176'),
(2, 7, 'nikos dad', '1234567890', '123 Nikos House Lane, Orlando, FL 32174 USA'),
(3, 38, 'hank', '0987654321', '123 Hill Avenue, Orlando, FL 32801 USA'),
(4, 40, 'harrySR', '0987654321', '321 Hillman Avenue, Orlando, FL 32803 USA');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `reviewID` int(11) NOT NULL,
  `caregiverID` int(11) NOT NULL,
  `recipientID` int(11) NOT NULL,
  `contractID` int(11) NOT NULL,
  `rating` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`contractID`),
  ADD KEY `caregiverID` (`caregiverID`),
  ADD KEY `recipientID` (`recipientParentID`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`memberID`);

--
-- Indexes for table `new_member`
--
ALTER TABLE `new_member`
  ADD PRIMARY KEY (`memberID`);

--
-- Indexes for table `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`parentID`),
  ADD KEY `memberID` (`memberID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewID`),
  ADD KEY `caregiverID` (`caregiverID`),
  ADD KEY `recipientID` (`recipientID`),
  ADD KEY `contractID` (`contractID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `contractID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `memberID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `new_member`
--
ALTER TABLE `new_member`
  MODIFY `memberID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `parent`
--
ALTER TABLE `parent`
  MODIFY `parentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contracts`
--
ALTER TABLE `contracts`
  ADD CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`caregiverID`) REFERENCES `members` (`memberID`),
  ADD CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`recipientParentID`) REFERENCES `parent` (`parentID`);

--
-- Constraints for table `parent`
--
ALTER TABLE `parent`
  ADD CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`memberID`) REFERENCES `members` (`memberID`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`caregiverID`) REFERENCES `members` (`memberID`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`recipientID`) REFERENCES `parent` (`parentID`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`contractID`) REFERENCES `contracts` (`contractID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
