--Criação do banco
CREATE DATABASE mundoHP;

--Entrar
\c mundoHP;


--Criar tabela de bruxo e varinha
CREATE TABLE bruxos (id SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, idade INTEGER NOT NULL, casa VARCHAR(50), habilidade VARCHAR(100) NOT NULL, status_sangue VARCHAR(50) NOT NULL, patrono VARCHAR(100));
CREATE TABLE varinhas (id SERIAL PRIMARY KEY, material VARCHAR(100) NOT NULL, comprimento DECIMAL NOT NULL, nucleo VARCHAR(100) NOT NULL, data_fabricacao DATE NOT NULL);

--Inserir teste
INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ('Julia', 'joaosantos@gmail.com');

INSERT INTO varinhas (nome, material, comprimento, nucleo, data_fabricacao) VALUES ('Maria', 'mariagomes@gmail.com');

