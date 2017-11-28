-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2017 at 09:32 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rmm1`
--

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_agencies`
--

CREATE TABLE `maintenance_agencies` (
  `id` int(11) NOT NULL,
  `agency_name` varchar(100) NOT NULL,
  `person_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `address` text NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `maintenance_agencies`
--

INSERT INTO `maintenance_agencies` (`id`, `agency_name`, `person_name`, `email`, `phone`, `address`, `status`) VALUES
(1, 'Gruha Enterprises', 'Ram Govind', 'ram_govind@email.com', 3698521470, 'St-2, Amirpet, Telangana', 'Active'),
(2, 'Sai Kiran Enterprises', 'Sai Kiran', 'sai_kiran@email.com', 7896541330, '12a, Sai nagar, Chennai', 'Active'),
(3, 'Dharma Furniture', 'Dharma Rao', 'dharma_rao@gmail.com', 7869123456, '104, Hybrid heights, Hyderabad', 'Active'),
(4, 'Ganga Steels', 'Ganga M', 'ganga_m@email.com', 4561239870, '45-2/a, Sri nagar, Hyderabad', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_visits`
--

CREATE TABLE `maintenance_visits` (
  `id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `visit_date` datetime NOT NULL,
  `feedback` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `maintenance_visits`
--

INSERT INTO `maintenance_visits` (`id`, `agency_id`, `resource_id`, `visit_date`, `feedback`) VALUES
(1, 3, 0, '2017-10-05 00:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `equipment_name` varchar(100) NOT NULL,
  `manufacturer` varchar(100) NOT NULL,
  `category` varchar(30) NOT NULL,
  `purchased_date` datetime NOT NULL,
  `purchased_price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `equipment_name`, `manufacturer`, `category`, `purchased_date`, `purchased_price`, `quantity`, `agency_id`, `status`) VALUES
(1, 'Sofa', 'Godrej', 'Furniture', '2017-11-01 00:00:00', 15000, 1, 3, 'Active'),
(2, 'Computers', 'Dell Technologies', 'ICT equipment', '2017-10-20 00:00:00', 125000, 5, 2, 'Active'),
(3, 'Accounting books', 'Nirmala', 'Stationery', '2017-10-15 00:00:00', 3000, 40, 1, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `amount` float NOT NULL,
  `order_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `phone` bigint(50) NOT NULL,
  `address` text NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `phone`, `address`, `last_login`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Rajesh Chukka', 'admin@rmm.com', '$2a$10$lxih1wsVARV1WpR5ARDt7OOs5cOpdTR6GCbtu6ARDn9rYuVZiyMra', 'Administrator', 34544343, 'St-1, Hyderabad', '2017-10-28 00:00:00', 'Active', '2017-10-01 00:00:00', '2017-10-28 00:00:00'),
(2, 'Sagar Sri', 'sagar_staff@rmm.com', '$2a$10$BvKs6P9nE6PLWy/zA.mxE.rarfmpuyJ2KkcCj.sn7t7KJjbf6i5V.', 'Staff', 4646464646, 'Main road 4, Hyderabad', '2017-10-28 00:00:00', 'Inactive', '2017-10-10 00:00:00', '2017-11-02 18:11:18'),
(3, 'Mohan K', 'staff2@rmm.com', '$2a$08$BmpnY16nWJHN4p3lSoN/8eDfb6FawER64lHgFcWEhLmHWRfwbgnr6', 'Staff', 2147483647, 'fdgdfsgfdg', NULL, 'Active', '2017-11-02 05:00:08', '2017-11-02 05:00:08'),
(4, 'Syam prasad', 'staff3@rmm.com', '$2a$08$0o7avlQ7B2crcujTgfxwaOOJ3mC2/hXqBu55Py6wT9dsvB8lY59RK', 'Staff', 4555523, 'sdfdssdddf', NULL, 'Active', '2017-11-02 05:03:48', '2017-11-02 05:03:48'),
(5, 'Sanjay Lal', 'staff4@rmm.com', '$2a$08$I1OSjO18OnfRpJAq67xyiOHtHefYlgZPpAGQS7RONwOd2kNt6O3c2', 'Staff', 5523234, 'fdsfdsfsd', NULL, 'Active', '2017-11-02 05:10:37', '2017-11-02 05:10:37'),
(6, 'Eswar gupta', 'gupta@rmm.com', '$2a$08$nky9u4oN/ARwne54VsZjA.Zm7g9zdpngYMKc6Y9ZR8.yp7fwo2kaS', 'Staff', 42343324, 'Vijayawada', NULL, 'Active', '2017-11-02 18:20:45', '2017-11-02 18:20:45'),
(7, 'Sankar Rao', 'sankar@rmm.com', '$2a$08$RmSmF9G2CWS0Fz.BGFtUG.sOmIU93u/Tr0jsbnFMYkrUuMbZo.Wmq', 'Staff', 434343434, 'Visakapatnam', NULL, 'Active', '2017-11-02 18:30:17', '2017-11-02 18:30:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `maintenance_agencies`
--
ALTER TABLE `maintenance_agencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maintenance_visits`
--
ALTER TABLE `maintenance_visits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `maintenance_agencies`
--
ALTER TABLE `maintenance_agencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `maintenance_visits`
--
ALTER TABLE `maintenance_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
