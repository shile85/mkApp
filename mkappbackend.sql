-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2021 at 09:10 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mkappbackend`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2021_05_16_140547_add_user_role_to_users_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` int(11) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `roleId`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Vladimir', 'me@vladimirpesic.com', NULL, '$2y$10$8UPpGfZIg43PAPPwXnlFo.oLhzONkaHd7eadlSnuCh9y0ZKOWoYba', 0, NULL, '2021-04-11 10:52:15', '2021-04-11 10:52:15'),
(4, 'Vladimir1', 'me@vladimirpesic1.com', NULL, '$2y$10$eETLYaMfEVVi1PtOmyF4sOYRVD1pL2Ktc0XcUb4ISjS/hJE3E6P.G', 0, NULL, '2021-04-11 11:01:18', '2021-04-11 11:01:18'),
(5, 'test', 'tet@ja.com', NULL, '$2y$10$N7zaCadiAqLtpdY9NE1pZu5CnwNqcTkx0Km3T2MRjYiAO9s4FQ4Dq', 0, NULL, '2021-05-09 11:45:23', '2021-05-09 11:45:23'),
(6, 'test', 'test@gmail.com', NULL, '$2y$10$6vYyzJg29FDrIffy2fznpuTeLErmIFyLXf3qCUJkHWZP740f37wnG', 0, NULL, '2021-05-09 11:57:24', '2021-05-09 11:57:24'),
(7, 'test', 'test1@gmail.com', NULL, '$2y$10$8gMyEjIwfpHCS3oMLmpdpObU/4y1libRrbjHwFmru7wgQZEk/GzUS', 0, NULL, '2021-05-09 12:02:48', '2021-05-09 12:02:48'),
(8, 'pvladimir2', 'vladimir.pesic@mikrokontrol.rs', NULL, '$2y$10$uYaa0aLEZ/4ba4NmJL16xOL71N30855v4Hn7XkPlMu/gHpN2JX1J.', 1, NULL, '2021-05-09 12:08:33', '2021-05-09 12:08:33'),
(9, 'test', 'test@ja.com', NULL, '$2y$10$9uG1N6B1ZMIWXY66htttMeX12sFszQWeTTQcnS8me5.fYYs2pMVsu', 0, NULL, '2021-05-09 12:16:48', '2021-05-09 12:16:48'),
(10, 'vdragan', 'dragan.vranic@mikrokontrol.rs', NULL, '$2y$10$l.BXO7.YrtnyBVJu2U290u64ynccHRa5b4lkUBUlHW5.Y4v7Xn6qS', 2, NULL, '2021-05-16 15:13:48', '2021-05-16 15:13:48'),
(11, 'Vladimir12', 'me@vladimirpesic12.com', NULL, '$2y$10$QwBgWHGO/oplSrKQwbM6MuCbGKeahFxxZDaAn.OUyRHQZoKuCPWA6', 1, NULL, '2021-05-21 16:51:56', '2021-05-21 16:51:56'),
(12, 'maleksandar', 'sale@mk.rs', NULL, '$2y$10$a8S.S6REjOKdkcmpd5P5dOgf2wGzSX0UxpjSjddpie.Z73evkl2ty', 2, NULL, '2021-05-25 15:42:13', '2021-05-25 15:42:13'),
(13, 'vladimir1', 'vlada1@mk.rs', NULL, '$2y$10$pV1ekM7TqpZ9fkHiT7P28ONgMdox2Otk5kJinHwKs.5M3CezwXn/O', 1, NULL, '2021-05-25 15:49:52', '2021-05-25 15:49:52'),
(14, 'vlada3', 'vlada3@mk.com', NULL, '$2y$10$l4PvOdizrloGUuYui2XLKulUMWoMGIPhtPSn7iW1M/cgxcddQLPFS', 2, NULL, '2021-05-25 15:58:06', '2021-05-25 15:58:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
