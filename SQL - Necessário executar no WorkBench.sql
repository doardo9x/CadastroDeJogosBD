CREATE DATABASE liduca2;
USE liduca2;

CREATE TABLE generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_genero VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    lancamento DATE,
    desenvolvedor VARCHAR(255),
    genero_id INT,
    FOREIGN KEY (genero_id) REFERENCES generos(id)
);
