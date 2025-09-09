
DROP DATABASE IF EXISTS encuesta_anonima;
CREATE DATABASE encuesta_anonima;

USE encuesta_anonima;

-- Tabla de Evaluaciones
CREATE TABLE evaluaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_de_encuesta VARCHAR(100) DEFAULT '',
    fecha_creacion DATETIME,
    activo TINYINT(1)
);

-- Tabla de Alternativos
CREATE TABLE alternativas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion_de_alternativa VARCHAR(100),
    id_de_evaluacion INT(9),
    activo TINYINT(1),
    FOREIGN KEY (id_de_evaluacion) REFERENCES evaluaciones(id)
);

-- Tabla de Opciones de Alternativa
CREATE TABLE opciones_alternativa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_de_opcion VARCHAR(100),
    id_de_alternativa INT(9),
    FOREIGN KEY (id_de_alternativa) REFERENCES alternativas(id)
);

-- Tabla de Respuestas
CREATE TABLE respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_de_evaluacion INT(9),
    fecha_de_respuesta DATETIME,
    departamento VARCHAR(100),
    distrito VARCHAR(100),
    comentarios TEXT,
    FOREIGN KEY (id_de_evaluacion) REFERENCES evaluaciones(id)
);

-- Tabla de Detalle de Respuesta
CREATE TABLE detalle_de_respuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_de_respuesta INT,
    id_de_alternativa INT,
    id_de_opcion INT,
    FOREIGN KEY (id_de_respuesta) REFERENCES respuestas(id),
    FOREIGN KEY (id_de_alternativa) REFERENCES alternativas(id),
    FOREIGN KEY (id_de_opcion) REFERENCES opciones_alternativa(id)
);