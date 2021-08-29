-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2021 at 08:12 PM
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
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `created_at`, `updated_at`, `model`, `registration`, `user_id`, `image_path`, `document_path`) VALUES
(4, '2021-08-25 15:52:37', '2021-08-25 15:52:37', 'Audi a6', 'Bg-256-CN', '10', 'profileImg/a6-347598503_1629913957.jpg', 'documents/A6-1570114058_1629913957.pdf'),
(9, '2021-08-25 16:36:24', '2021-08-25 17:37:01', 'Škoda Rapid', 'BG-1503-MK', '8', 'carImg/skodaRapid-1324687546_1629917531.jpg', 'carDocuments/RAPID-1667429746_1629917565.pdf'),
(10, '2021-08-25 17:33:01', '2021-08-25 17:36:26', 'Volkswagen Caddy', 'BG-1985-MK', '17', 'carImg/kedi-1795491467_1629919981.jpg', 'carDocuments/KEDI-792131501_1629919981.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `active`, `created_at`, `updated_at`) VALUES
(2, 'Elektro privreda Srbije', '1', '2021-08-26 16:15:29', '2021-08-26 16:15:29'),
(3, 'Beogradski vodovod i kanalizacija', '1', '2021-08-27 16:49:37', '2021-08-28 14:37:15'),
(5, 'RTB Bor', '1', '2021-08-28 15:11:12', '2021-08-28 15:11:12'),
(8, 'US Steel', '1', '2021-08-29 10:35:10', '2021-08-29 10:36:08');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `document_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `document_path`, `category`, `created_at`, `updated_at`, `user_id`) VALUES
(5, 'documents/Očitana_Lična_karta-206214901_1629738289.pdf', 'Očitana lična karta', '2021-08-23 15:04:50', '2021-08-23 15:04:50', '8'),
(6, 'documents/Vladimir_Pesic_zdravstvena-1721414064_1629738693.pdf', 'Očitana zdravstvena knjižica', '2021-08-23 15:11:33', '2021-08-23 15:11:33', '8'),
(7, 'documents/Vladimir_Pesic_zdravstvena-945809943_1629742143.pdf', 'Pasoš', '2021-08-23 16:09:03', '2021-08-23 16:09:03', '8');

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
(4, '2021_05_16_140547_add_user_role_to_users_table', 2),
(5, '2021_07_10_103213_add_user_data_to_users', 3),
(6, '2021_07_13_181704_add_status_to_users_table', 4),
(7, '2021_08_13_202157_add_phones_and_birthday_to_users', 5),
(8, '2021_08_13_204651_create_roles_table', 6),
(12, '2021_08_19_172834_create_documents_table', 7),
(13, '2021_08_19_180041_add_image_to_users_table', 8),
(14, '2021_08_21_174709_add_document_name_to_documents_table', 9),
(15, '2021_08_21_180213_add_user_id_to_documents_table', 10),
(16, '2021_08_21_180542_rename_documents_column', 11),
(17, '2021_08_21_185528_rename_documents_column', 12),
(18, '2021_08_21_191724_remove_documents_column', 13),
(19, '2021_08_24_185648_add_position_to_users_table', 14),
(20, '2021_08_24_194700_create_cars_table', 15),
(22, '2021_08_25_190934_create_companies_table', 16),
(26, '2021_08_26_171926_create_projects_table', 17),
(27, '2021_08_26_185024_create_tasks_table', 18);

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
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `projectManagerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `active` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `projectManagerId`, `projectName`, `company_id`, `desc`, `budget`, `spent`, `start`, `end`, `active`, `created_at`, `updated_at`) VALUES
(11, '10', 'Automatizacija livne mašine', '5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum enim quam, ut mattis mi finibus ut. Nam ornare, libero vel malesuada ornare, ipsum nisi porttitor dolor, eu pretium nibh felis in velit. Nunc maximus viverra augue ut tincidunt. Integer egestas iaculis interdum. In vestibulum mattis efficitur. Sed quis erat eu metus interdum mollis sagittis quis lectus. Vivamus eu auctor urna. In quis nunc quis urna ultrices lobortis. In congue lorem vitae lacus lobortis, quis pretium tellus scelerisque. Duis malesuada ligula at ligula tincidunt, at accumsan turpis auctor. Curabitur sed sapien sed erat eleifend imperdiet id fermentum massa. Quisque cursus nulla id ligula pretium, sed consequat velit rhoncus.', '20.000,00 $', NULL, '2021-08-31', '2021-10-27', '1', '2021-08-29 11:01:47', '2021-08-29 11:01:47'),
(12, '10', 'Kontrolni i nadzorni sistem konvertora', '8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum enim quam, ut mattis mi finibus ut. Nam ornare, libero vel malesuada ornare, ipsum nisi porttitor dolor, eu pretium nibh felis in velit. Nunc maximus viverra augue ut tincidunt. Integer egestas iaculis interdum. In vestibulum mattis efficitur. Sed quis erat eu metus interdum mollis sagittis quis lectus. Vivamus eu auctor urna. In quis nunc quis urna ultrices lobortis. In congue lorem vitae lacus lobortis, quis pretium tellus scelerisque. Duis malesuada ligula at ligula tincidunt, at accumsan turpis auctor. Curabitur sed sapien sed erat eleifend imperdiet id fermentum massa. Quisque cursus nulla id ligula pretium, sed consequat velit rhoncus.', '20.000,00 $', NULL, '2021-08-30', '2021-09-30', '1', '2021-08-29 11:05:30', '2021-08-29 11:05:30'),
(14, '8', 'test2 izmenjen', '3', 'sada lepo pi[em asfdsgdfgdhdgfhgffghfh', '30.000,00 $', NULL, '2021-08-30', '2021-09-11', '1', '2021-08-29 11:06:52', '2021-08-29 15:28:53'),
(15, '20', 'test3', '3', 'ewfdsfdasfdsf', '20.000,00 $', NULL, '2021-08-31', '2021-09-11', '0', '2021-08-29 11:08:27', '2021-08-29 11:08:46');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `roleName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `roleName`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', NULL, NULL),
(2, 'Moderator', NULL, NULL),
(3, 'Korisnik', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `taskName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `taskName`, `description`, `user_id`, `project_id`, `created_at`, `updated_at`) VALUES
(13, 'Splajsovanje optike u elektro ormarima', 'Splajsovanje optike u elektro ormarima po dokumentacii', '8', '11', '2021-08-29 11:02:20', '2021-08-29 11:02:20'),
(14, 'Splajsovanje optike u elektro ormarima', 'Splajsovanje optike u elektro ormarima po dokumentacii', '8', '12', '2021-08-29 11:05:49', '2021-08-29 11:05:49'),
(17, 'Splajsovanje optike u elektro ormarima', 'Splajsovanje optike u elektro ormarima po dokumentacii', '22', '14', '2021-08-29 11:07:24', '2021-08-29 11:07:24'),
(18, 'Splajsovanje optike u elektro ormarima', 'Splajsovanje optike u elektro ormarima po dokumentacii', '20', '14', '2021-08-29 11:07:29', '2021-08-29 11:07:29'),
(19, 'Splajsovanje optike u elektro ormarima', 'Splajsovanje optike u elektro ormarima po dokumentacii', '8', '15', '2021-08-29 11:09:13', '2021-08-29 11:09:13'),
(20, 'Splajsovanje optike u elektro ormarima', 'Splajsovanje optike u elektro ormarima po dokumentacii', '21', '15', '2021-08-29 11:09:16', '2021-08-29 11:09:16');

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `businessPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `roleId`, `remember_token`, `created_at`, `updated_at`, `first_name`, `last_name`, `address`, `city`, `status`, `telephone`, `businessPhone`, `birthday`, `image`, `position`) VALUES
(8, 'pvladimir2', 'vladimir.pesic@mikrokontrol.rs', NULL, '$2y$10$uYaa0aLEZ/4ba4NmJL16xOL71N30855v4Hn7XkPlMu/gHpN2JX1J.', 1, NULL, '2021-05-09 12:08:33', '2021-08-24 16:46:53', 'Vladimir', 'Pešić', 'Radovana Simića Cige 22/49', '11050 Beograd', '1', '063/464-229', '064/8-339-334', '1985-03-15', 'profileImg/CROPPED-DSCF9248-1159519391_1629405290.jpg', 'IT Engineer'),
(10, 'vdragan', 'dragan.vranic@mikrokontrol.rs', NULL, '$2y$10$l.BXO7.YrtnyBVJu2U290u64ynccHRa5b4lkUBUlHW5.Y4v7Xn6qS', 2, NULL, '2021-05-16 15:13:48', '2021-08-20 18:40:41', 'Dragan', 'Vranić', 'Sremčica bb', 'Beograd', '1', '064123456', '0648339101', '1967-05-24', 'profileImg/dragi-1839974451_1629491256.jpg', 'CEO'),
(19, 'divan', 'ivan.deletic@mikrokontrol.rs', NULL, '$2y$10$taXWpKc6ioRP3.6qzsVzP.MduiPDTJn7yhD7PawuMh.WEyti/vhBa', 3, NULL, '2021-08-13 18:31:04', '2021-08-21 15:23:23', 'Ivan', 'Deletić', 'Svetog Save 2', 'Beograd', '1', '063123456', '0648336987', '1972-06-08', 'profileImg/download-406966698_1629566603.jpg', NULL),
(20, 'obojan', 'bojan.obradovic@mikrokontrol.rs', NULL, '$2y$10$BqIItz9LoE4x.UgQlC4Hrex9vP9MX2RbvI4yJ1PMAV/XaUPZVG5ym', 3, NULL, '2021-08-16 16:48:11', '2021-08-21 15:29:53', 'Bojan', 'Obradović', 'Banovo brdska bb', 'Beograd', '1', '063123456', '064833911', '1993-02-05', 'profileImg/1528300561420-1228398526_1629566992.jpg', NULL),
(21, 'zbojan', 'bojan.zebeljan@mikrokontrol.rs', NULL, '$2y$10$NKmrWzn/N4fxpoJYwUaHNu/jjQYG7KTqY60G14ffZwf5NiojFSllS', 3, NULL, '2021-08-20 18:42:53', '2021-08-24 17:24:37', 'Bojan', 'Žebeljan', 'Bulevar nbg 123', 'Beograd', '1', '063123456', '064123456', '1982-08-20', 'profileImg/1517368884128-12539013_1629833077.jpg', 'Senior Integration Developer'),
(22, 'bdeletic', 'boris.deletic@mikrokontrol.rs', NULL, '$2y$10$pL1ezW7XmggqHoujrbifG.9kKwbB.7Z8Z1t5FxMh7c4spW1mVXMdW', 3, NULL, '2021-08-20 18:47:58', '2021-08-29 09:53:41', 'Boris', 'Deletić', 'Železnik 12', 'Beograd', '1', '063123456', '064123456', '1992-09-14', 'profileImg/bd-1980545487_1630237857.jpg', 'Sales engineer'),
(25, 'gdusan', 'dusan.gajic@mikrokontrol.rs', NULL, '$2y$10$4.ZzIUwqSnSvAjGbk9ehL.Hx1Aj.wnU93odP/9YqTGQcIix4KFqdK', 3, NULL, '2021-08-24 17:15:32', '2021-08-24 17:15:32', 'Dušan', 'Gajić', 'Pančevo bb', 'Pančevo', '1', '063/885-998', '064/8-963-852', '1993-09-16', 'profileImg/default.png', 'Integration Developer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
