-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июн 26 2017 г., 12:44
-- Версия сервера: 10.1.19-MariaDB
-- Версия PHP: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `yii2_test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `password`, `type`) VALUES
(1, 'Алексей', 'Ожиганов', 'crazyursus', '12345', 1),
(2, 'Иван', 'Иванов', 'ivan', '12345', 2),
(4, 'Neva', 'Mcknight', 'neva.mcknight@knowlysis.net', '13738', 1),
(6, 'Bridges', 'Craig', 'bridges.craig@dognosis.biz', '22805', 2),
(7, 'Lilly', 'Stephens', 'lilly.stephens@buzzopia.co.uk', '78358', 1),
(8, 'Desiree', 'Albert', 'desiree.albert@terrasys.us', '57868', 2),
(11, 'Cash', 'Ferguson', 'cash.ferguson@injoy.name', '55102', 1),
(12, 'Collier', 'Duke', 'collier.duke@pivitol.ca', '82846', 2),
(14, 'Audrey', 'Harris', 'audrey.harris@colaire.me', '61290', 1),
(15, 'Ruth', 'Deleon', 'ruth.deleon@zosis.org', '10081', 1),
(16, 'Britt', 'Bishop', 'britt.bishop@petigems.net', '15421', 1),
(17, 'Cleo', 'Fleming', 'cleo.fleming@hawkster.info', '70540', 1),
(18, 'Hallie', 'Larsen', 'hallie.larsen@magnemo.biz', '96867', 1),
(20, 'Tamera', 'Baxter', 'tamera.baxter@plexia.us', '96492', 2),
(21, 'Lindsey', 'Lowe', 'lindsey.lowe@billmed.biz', '62280', 1),
(22, 'Suzette', 'Thornton', 'suzette.thornton@gleamink.com', '27105', 2),
(23, 'Barr', 'Bonner', 'barr.bonner@enormo.name', '70992', 1),
(24, 'Adriana', 'Case', 'adriana.case@recrisys.ca', '42241', 2),
(25, 'Luna', 'Bowen', 'luna.bowen@netagy.tv', '38802', 2),
(26, 'Wise', 'Carroll', 'wise.carroll@bullzone.me', '47539', 2),
(27, 'Belinda', 'Rose', 'belinda.rose@stralum.org', '79612', 1),
(28, 'Brenda', 'Hernandez', 'brenda.hernandez@amtas.net', '17333', 2),
(29, 'Marietta', 'Cooley', 'marietta.cooley@zboo.info', '72070', 1),
(30, 'Price', 'Walls', 'price.walls@mazuda.biz', '77838', 2),
(31, 'Crystal', 'Hardy', 'crystal.hardy@digirang.co.uk', '57698', 1),
(32, 'Clay', 'Beck', 'clay.beck@slax.us', '19198', 2),
(33, 'Luann', 'Payne', 'luann.payne@aquazure.biz', '57141', 2),
(34, 'Rosalie', 'Wiggins', 'rosalie.wiggins@combogene.com', '37938', 1),
(35, 'Mcbride', 'Noble', 'mcbride.noble@zogak.name', '61905', 2),
(36, 'Manning', 'Mckenzie', 'manning.mckenzie@nitracyr.ca', '25300', 1),
(37, 'Hewitt', 'Klein', 'hewitt.klein@kongle.tv', '82763', 2),
(38, 'Lindsey', 'Kidd', 'lindsey.kidd@avenetro.me', '28958', 2),
(39, 'Baird', 'Sloan', 'baird.sloan@furnafix.org', '49274', 2),
(40, 'Dina', 'Santos', 'dina.santos@talkola.net', '84964', 1),
(41, 'Latoya', 'Sutton', 'latoya.sutton@baluba.info', '43215', 1),
(42, 'Velma', 'Sampson', 'velma.sampson@assurity.biz', '55995', 2),
(43, 'Ellen', 'Mcclure', 'ellen.mcclure@zedalis.co.uk', '72379', 2),
(44, 'Lucia', 'Ellis', 'lucia.ellis@comvey.us', '81223', 1),
(45, 'Concepcion', 'Curtis', 'concepcion.curtis@overfork.biz', '29795', 1),
(46, 'Greer', 'Osborne', 'greer.osborne@ontagene.com', '71583', 2),
(47, 'Marcy', 'Levy', 'marcy.levy@marqet.name', '68432', 2),
(48, 'Ochoa', 'Mcconnell', 'ochoa.mcconnell@zomboid.ca', '67294', 1),
(64, 'Admin', 'Main', 'admin', '12345', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_uindex` (`username`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
