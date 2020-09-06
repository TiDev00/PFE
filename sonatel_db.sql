-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  Dim 06 sep. 2020 à 16:43
-- Version du serveur :  10.4.6-MariaDB
-- Version de PHP :  7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sonatel_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `actions`
--

CREATE TABLE `actions` (
  `id` bigint(20) NOT NULL,
  `action_name` varchar(255) NOT NULL,
  `desc_action` varchar(255) DEFAULT NULL,
  `processes_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `actions`
--

INSERT INTO `actions` (`id`, `action_name`, `desc_action`, `processes_id`) VALUES
(1, 'Action 1', 'desc action', 1),
(2, 'action 2', 'action for process', 2),
(3, 'ping action', 'test fin', 3);

-- --------------------------------------------------------

--
-- Structure de la table `applications`
--

CREATE TABLE `applications` (
  `id` bigint(20) NOT NULL,
  `app_name` varchar(255) NOT NULL,
  `desc_app` varchar(255) DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `applications`
--

INSERT INTO `applications` (`id`, `app_name`, `desc_app`, `service_id`) VALUES
(1, 'Application 1', 'desc appli 1', 1),
(2, 'Ping appli', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `commands`
--

CREATE TABLE `commands` (
  `id` bigint(20) NOT NULL,
  `command_name` varchar(255) NOT NULL,
  `desc_command` varchar(255) DEFAULT NULL,
  `for_status` int(11) NOT NULL,
  `actions_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `commands`
--

INSERT INTO `commands` (`id`, `command_name`, `desc_command`, `for_status`, `actions_id`) VALUES
(1, 'ping', 'descrip', 0, 3),
(2, 'Command 2', 'descrip', 1, 1),
(3, 'command beta', 'descrip', 0, 2);

-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

CREATE TABLE `logs` (
  `id` bigint(20) NOT NULL,
  `action` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `user_matricule` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `processes`
--

CREATE TABLE `processes` (
  `id` bigint(20) NOT NULL,
  `desc_process` varchar(255) DEFAULT NULL,
  `process_name` varchar(255) NOT NULL,
  `application_id` bigint(20) NOT NULL,
  `server_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `processes`
--

INSERT INTO `processes` (`id`, `desc_process`, `process_name`, `application_id`, `server_id`) VALUES
(1, NULL, 'Process 1', 1, 1),
(2, 'descrip', 'process 2', 1, 1),
(3, NULL, 'Ping process', 2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `servers`
--

CREATE TABLE `servers` (
  `id` bigint(20) NOT NULL,
  `ip_server` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `os_server` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `server_name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `servers`
--

INSERT INTO `servers` (`id`, `ip_server`, `login`, `os_server`, `password`, `server_name`) VALUES
(1, '0.0.0.0', 'loginTest', 'Linux', 'testPassword', 'server A'),
(2, 'test', 'test', NULL, 'test', '192.168.1.1');

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) NOT NULL,
  `desc_service` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id`, `desc_service`, `service_name`) VALUES
(1, 'desc service', 'service 1'),
(2, 'description 2', 'service 2');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `matricule` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`matricule`, `email`, `first_name`, `last_name`, `password`, `service_id`) VALUES
('stg_cisse50339', 'thiernoibrahima.cisse@gmail.com', 'Thierno Ibrahima', 'Cissé', 'NULL', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_jpnrru2sudufx1ybbemce84i5` (`action_name`),
  ADD KEY `FKcal3litvj3y1otr4lmr0auusj` (`processes_id`);

--
-- Index pour la table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_fbm5l91dsqgiyvwok0437ymya` (`app_name`),
  ADD KEY `FKermkyam0qf3xp52roxp9v87nd` (`service_id`);

--
-- Index pour la table `commands`
--
ALTER TABLE `commands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_fm3lj9r1m295rladc9pwvfgo8` (`actions_id`),
  ADD UNIQUE KEY `UK_3tm5f04fhij6meovuinsbyhpp` (`command_name`);

--
-- Index pour la table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_4yv4r4d622pfe350kr1r33vpt` (`user_matricule`);

--
-- Index pour la table `processes`
--
ALTER TABLE `processes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_2j666bprdwclfq1p1tkgyq1gf` (`process_name`),
  ADD KEY `FK77oe2fptwqofy8lh88hlwo5on` (`application_id`),
  ADD KEY `FK8mlckappfmo4423lmsw80g90w` (`server_id`);

--
-- Index pour la table `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_e6pfymdshw4epqnv151u7rgav` (`ip_server`),
  ADD UNIQUE KEY `UK_hx7kgxagwk6r28943q7mjs390` (`server_name`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_38twoss73rtux07w58qp200r0` (`service_name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`matricule`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  ADD KEY `FKg28emhyfqgy7bu8nv5ol805wt` (`service_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `commands`
--
ALTER TABLE `commands`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `processes`
--
ALTER TABLE `processes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `servers`
--
ALTER TABLE `servers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
