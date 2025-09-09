DROP DATABASE IF EXISTS db_crud;
CREATE DATABASE db_crud;
USE db_crud;

-- Tabla de clientes
CREATE TABLE clientes (
    nro_documento VARCHAR(20) PRIMARY KEY,
    tipo_documento VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(20) NOT NULL,
);

-- Tabla de vehículos
CREATE TABLE vehiculos (
    placa VARCHAR(20) PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio_fabricacion YEAR NOT NULL,
    nro_documento_cliente VARCHAR(20),
    FOREIGN KEY (nro_documento_cliente) REFERENCES clientes(nro_documento)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Insertar clientes
INSERT INTO `clientes` (`nro_documento`, `tipo_documento`, `nombre`, `apellidos`, `correo`, `telefono`) VALUES
('12345678', 'DNI', 'Carlos', 'Ramirez Lopez', 'carlos.ramirez@example.com', '987654321'),
('55667788', 'DNI', 'María', 'Gomez Ruiz', 'maria.gomez@example.com', '933221144'),
('87654321', 'DNI', 'Ana', 'Fernandez Torres', 'ana.fernandez@example.com', '912345678'),
('99887766', 'DNI', 'Jorge', 'Castro Vega', 'jorge.castro@example.com', '955667788'),
('999999999999', 'DNI', 'Hector Enrrique', 'Garcia Ramos', 'ppppppp@gmail.com', '998999999');

-- Insertar vehículos (cada uno asociado a un cliente)
INSERT INTO `vehiculos` (`placa`, `marca`, `modelo`, `anio_fabricacion`, `nro_documento_cliente`) VALUES
('ABC-123', 'Toyota', 'Corolla', '2015', '12345678'),
('Ajp196', 'Citroen', 'C3', '2015', '55667788'),
('JKL-654', 'Chevrolet', 'Cruze', '2019', '99887766'),
('QWE-321', 'Ford', 'Focus', '2017', '55667788'),
('XYZ-789', 'Honda', 'Civic', '2018', '87654321');