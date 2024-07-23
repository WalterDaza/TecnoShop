-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2024 a las 19:05:12
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tecnoshop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_compra`
--

CREATE TABLE `carrito_compra` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_producto` decimal(10,0) DEFAULT NULL,
  `precio_total` decimal(10,0) DEFAULT NULL,
  `id_comprador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `URL_imagen` varchar(255) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`, `URL_imagen`, `id_producto`) VALUES
(1, 'samsung', 'productos samsung', 'https://1000marcas.net/wp-content/uploads/2019/12/logo-Samsung.png', NULL),
(2, 'xiaomi', 'productos xiaomi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprador`
--

CREATE TABLE `comprador` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `tipo_documento` enum('cedulaCiudadania','cedulaExtranjeria') DEFAULT NULL,
  `numero_documento` int(11) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comprador`
--

INSERT INTO `comprador` (`id`, `nombre`, `contrasena`, `tipo_documento`, `numero_documento`, `correo`, `telefono`, `ciudad`) VALUES
(305, 'Walter', '123', 'cedulaCiudadania', 1023960384, 'walred44@hotmail.com', '3102806291', 'Bogota');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_envio`
--

CREATE TABLE `info_envio` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fecha_envio` date DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `costo` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fecha_compra` date DEFAULT NULL,
  `id_carrito_compras` int(11) DEFAULT NULL,
  `id_info_envio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasarela`
--

CREATE TABLE `pasarela` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_orden` int(11) DEFAULT NULL,
  `estado_pago` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `marca` varchar(30) NOT NULL,
  `descuento` int(99) NOT NULL,
  `precio_descuento` int(99) NOT NULL,
  `categoria` varchar(99) NOT NULL,
  `precio` int(40) DEFAULT NULL,
  `URL_imagen` varchar(9999) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `id_vendedor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `marca`, `descuento`, `precio_descuento`, `categoria`, `precio`, `URL_imagen`, `stock`, `id_vendedor`) VALUES
(11, 'Samsung Galaxy S24', '256GB + Protector 8GB RAM cámara posterior 50 Mp cámara frontal 12MP pantalla 6.4 pulgadas + Exynos 2400', 'samsung', 19, 3887919, 'celular', 4799900, 'https://s1.eestatic.com/2023/09/29/elandroidelibre/noticias-y-novedades/798180202_236397303_1706x960.jpg', 5, 123),
(12, 'Xiaomi Poco M6 Pro', '512GB 12GB Ram Negro', 'xiaomi', 20, 1599992, 'celular', 1999990, 'data:image/jpeg;base64,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', 5, 123),
(13, 'Portatil Lenovo ', 'Pantalla Táctil de 15.6 pulgadas Intel Core i5 Serie H 8GB RAM 512GB SSD Almacenamiento Windows 11 IdeaPad Slim 3 Computador Portátil', 'lenovo', 43, 2051943, 'computador', 3599900, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyxrWGxWwdQxWfjgjeK9SooyFvaOuXpV8Fg&usqp=CAU', 5, 123),
(14, 'Portatil Dell Inspiron ', '3525AMD Ryzen 7 5700U-16GB-512GB-W11H-15,6', 'dell', 25, 1907910, 'computador', 2543880, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_126197862_4481207_1?wid=1500&hei=1500&qlt=70', 5, 123),
(15, 'Televisor Samsung 70\"', 'Crystal UHD 4K HDR Smart TV UN70CU8000', 'samsung', 42, 2999900, 'televisor', 4999900, 'https://falabella.scene7.com/is/image/FalabellaCO/68075893_1?wid=1500&hei=1500&qlt=70', 5, NULL),
(16, 'Televisor LG 55 pulgadas', '4K Ultra HD Smart TV', 'lg', 33, 4999900, 'televisor', 6999900, 'https://falabella.scene7.com/is/image/FalabellaCO/71066303_1?wid=1500&hei=1500&qlt=70', 5, 123),
(17, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 496000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(18, 'Video Proyector Full HD ', 'WIFI MALETIN', 'ps plus', 30, 419000, 'video', 599000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122527812_3367385_1?wid=1500&hei=1500&qlt=70', 5, 123),
(19, 'Xbox Series S 512GB', NULL, 'xbox', 22, 1459900, 'consola', 1859880, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_119630027_2051722_1?wid=1500&hei=1500&qlt=70', 5, 123),
(20, 'Consola PS5 Slim Digital', '1TB de Almacenamiento Edición Digital Play Station 5', 'sony', 0, 0, 'consola', 2479900, 'https://falabella.scene7.com/is/image/FalabellaCO/72855985_1?wid=1500&hei=1500&qlt=70', 5, 123),
(21, 'Parlante Jbl Boombox 3 ', 'Bluetooth Waterproof Negro', 'jbl', 43, 1619900, 'audio', 2699900, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_118130203_1978575_1?wid=1500&hei=1500&qlt=70', 5, 123),
(22, 'Parlante sony', 'bluetooth portátil gran potencia - srs-xp700', 'sony', 0, 0, 'audio', 1500000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_119321688_2301609_1?wid=1500&hei=1500&qlt=70', 5, 123),
(23, 'Disco duro externo 2tb toshiba', 'canvio usb 3.0 + estuche', 'toshiba', 0, 0, 'almacenamiento', 390000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_124164428_3830867_2?wid=1500&hei=1500&qlt=70', 5, 123),
(24, 'Disco Solido Sandisk', 'Portable 1TB SSD', 'sandisk', 25, 419600, 'almacenamiento', 560000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_126675372_4648458_1?wid=1500&hei=1500&qlt=70', 5, 123),
(25, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(26, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(27, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(28, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(29, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(30, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(31, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(32, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123),
(33, 'Video Beam Profesional', 'FULL HD 9000 LUMENS.', 'new era', 0, 0, 'video', 476000, 'https://falabella.scene7.com/is/image/FalabellaCO/gsc_122526480_3366771_1?wid=1500&hei=1500&qlt=70', 5, 123);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_carrito_compras`
--

CREATE TABLE `productos_carrito_compras` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_carrito_compras` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicidad`
--

CREATE TABLE `publicidad` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `urlmax` varchar(255) DEFAULT NULL,
  `urlmin` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicidad`
--

INSERT INTO `publicidad` (`id`, `nombre`, `descripcion`, `urlmax`, `urlmin`) VALUES
(1, 'publicidad', 'computadores', 'https://live.staticflickr.com/65535/53815517825_f8ac514b42_k.jpg', '\r\nhttps://e0.pxfuel.com/wallpapers/908/624/desktop-wallpaper-21-9-super-ultra-wide.jpg'),
(2, 'publicidad', 'celulares', 'https://live.staticflickr.com/65535/53815521950_66ece4ae8e_k.jpg', 'https://e0.pxfuel.com/wallpapers/908/624/desktop-wallpaper-21-9-super-ultra-wide.jpg'),
(3, 'publicidad', 'camaras', 'https://live.staticflickr.com/65535/53814154392_abfd0559d5_k.jpg', 'https://e0.pxfuel.com/wallpapers/908/624/desktop-wallpaper-21-9-super-ultra-wide.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedor`
--

CREATE TABLE `vendedor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `tipo_documento` varchar(255) DEFAULT NULL,
  `numero_documento` int(11) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito_compra`
--
ALTER TABLE `carrito_compra`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comprador`
--
ALTER TABLE `comprador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `correo_2` (`correo`),
  ADD UNIQUE KEY `correo_3` (`correo`);

--
-- Indices de la tabla `info_envio`
--
ALTER TABLE `info_envio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pasarela`
--
ALTER TABLE `pasarela`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_carrito_compras`
--
ALTER TABLE `productos_carrito_compras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publicidad`
--
ALTER TABLE `publicidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_compra`
--
ALTER TABLE `carrito_compra`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comprador`
--
ALTER TABLE `comprador`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=317;

--
-- AUTO_INCREMENT de la tabla `info_envio`
--
ALTER TABLE `info_envio`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pasarela`
--
ALTER TABLE `pasarela`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `productos_carrito_compras`
--
ALTER TABLE `productos_carrito_compras`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicidad`
--
ALTER TABLE `publicidad`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
