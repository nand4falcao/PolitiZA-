CREATE DATABASE PolitiZA;
USE PolitiZA;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_perfil ENUM('CIDADAO', 'ADMINISTRADOR')
        NOT NULL DEFAULT 'CIDADAO'
)ENGINE=InnoDB;

CREATE TABLE localizacao (
    id_localizacao INT AUTO_INCREMENT PRIMARY KEY,
    endereco VARCHAR(200) NOT NULL,
    numero VARCHAR(20),
    bairro VARCHAR(100),
    municipio VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7)
) ENGINE=InnoDB;

CREATE TABLE tipo_ato (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
) ENGINE=InnoDB;

CREATE TABLE fonte (
    id_fonte INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    tipo VARCHAR(50),
    url VARCHAR(500)
) ENGINE=InnoDB;

CREATE TABLE tema (
    id_tema INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
) ENGINE=InnoDB;

CREATE TABLE ato_politico (
    id_ato INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME,
    status ENUM(
        'AGENDADO',
        'EM_ANDAMENTO',
        'REALIZADO',
        'CANCELADO'
    ) NOT NULL DEFAULT 'AGENDADO',

    id_tipo INT NOT NULL,
    id_localizacao INT NOT NULL,
    id_fonte INT NOT NULL,

    CONSTRAINT fk_ato_tipo
        FOREIGN KEY (id_tipo)
        REFERENCES tipo_ato(id_tipo),

    CONSTRAINT fk_ato_localizacao
        FOREIGN KEY (id_localizacao)
        REFERENCES localizacao(id_localizacao),

    CONSTRAINT fk_ato_fonte
        FOREIGN KEY (id_fonte)
        REFERENCES fonte(id_fonte)
) ENGINE=InnoDB;

CREATE TABLE noticia (
    id_noticia INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    resumo TEXT,
    url VARCHAR(500) NOT NULL,
    data_publicacao DATETIME,
    id_fonte INT NOT NULL,

    CONSTRAINT fk_noticia_fonte
        FOREIGN KEY (id_fonte)
        REFERENCES fonte(id_fonte)
) ENGINE=InnoDB;

CREATE TABLE usuario_tema (
    id_usuario INT NOT NULL,
    id_tema INT NOT NULL,

    PRIMARY KEY (id_usuario, id_tema),

    FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,

    FOREIGN KEY (id_tema)
        REFERENCES tema(id_tema)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE ato_tema (
    id_ato INT NOT NULL,
    id_tema INT NOT NULL,

    PRIMARY KEY (id_ato, id_tema),

    FOREIGN KEY (id_ato)
        REFERENCES ato_politico(id_ato)
        ON DELETE CASCADE,

    FOREIGN KEY (id_tema)
        REFERENCES tema(id_tema)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE ato_noticia (
    id_ato INT NOT NULL,
    id_noticia INT NOT NULL,

    PRIMARY KEY (id_ato, id_noticia),

    FOREIGN KEY (id_ato)
        REFERENCES ato_politico(id_ato)
        ON DELETE CASCADE,

    FOREIGN KEY (id_noticia)
        REFERENCES noticia(id_noticia)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE favorito (
    id_usuario INT NOT NULL,
    id_ato INT NOT NULL,
    data_favorito DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_usuario, id_ato),

    FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,

    FOREIGN KEY (id_ato)
        REFERENCES ato_politico(id_ato)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE USER 'app_java'@'localhost'
IDENTIFIED BY 'Politiza123!';

GRANT SELECT, INSERT, UPDATE
ON politiza.usuario
TO 'app_java'@'localhost';


SHOW GRANTS FOR 'app_java'@'localhost';

SELECT * FROM usuario;

DROP TABLE usuario;
