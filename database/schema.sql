CREATE DATABASE IF NOT EXISTS oficina_db;
USE oficina_db;

DROP TABLE IF EXISTS Agendamentos;
DROP TABLE IF EXISTS Veiculos;
DROP TABLE IF EXISTS Funcionario;
DROP TABLE IF EXISTS Cliente;
DROP TABLE IF EXISTS Usuarios;

CREATE TABLE Usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL,
  criado_em DATE NOT NULL
);

CREATE TABLE Cliente (
  id_cliente INT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf_criptografado VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(100),
  criado_em DATE NOT NULL,
  CONSTRAINT FK_Cliente_Usuario FOREIGN KEY (id_cliente) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Funcionario (
  id_funcionario INT PRIMARY KEY,
  cargo VARCHAR(50),
  CONSTRAINT FK_Funcionario_Usuario FOREIGN KEY (id_funcionario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Veiculos (
  id_veiculo INT PRIMARY KEY AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  placa VARCHAR(10) UNIQUE NOT NULL,
  modelo VARCHAR(50) NOT NULL,
  marca VARCHAR(50) NOT NULL,
  ano INT,
  CONSTRAINT FK_Veiculos_Cliente FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE Agendamentos (
  id_agendamentos INT PRIMARY KEY AUTO_INCREMENT,
  id_veiculo INT NOT NULL,
  id_funcionario INT NOT NULL,
  data_agendamento DATE NOT NULL,
  descricao_servico VARCHAR(255),
  status VARCHAR(20) NOT NULL,
  criado_em DATE NOT NULL,
  CONSTRAINT FK_Agendamentos_Veiculos FOREIGN KEY (id_veiculo) REFERENCES Veiculos(id_veiculo),
  CONSTRAINT FK_Agendamentos_Funcionario FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario)
);

INSERT INTO Usuarios (id_usuario, nome, email, senha, criado_em) VALUES
  (1, 'Carlos Silva', 'carlos.silva@email.com', '$2b$10$5PUKcxN2s6dJesC3QyDXVOCq6yy3sq5mId2i6zUrVFHGJtM.2kYI6', '2026-01-15'),
  (2, 'Ana Souza', 'ana.souza@email.com', '$2b$10$5PUKcxN2s6dJesC3QyDXVOCq6yy3sq5mId2i6zUrVFHGJtM.2kYI6', '2026-02-10'),
  (3, 'Mariana Oliveira', 'mariana.o@email.com', '$2b$10$5PUKcxN2s6dJesC3QyDXVOCq6yy3sq5mId2i6zUrVFHGJtM.2kYI6', '2026-03-01'),
  (4, 'Mecânico Chefe', 'mecanico@email.com', '$2b$10$5PUKcxN2s6dJesC3QyDXVOCq6yy3sq5mId2i6zUrVFHGJtM.2kYI6', '2026-01-01'),
  (5, 'Atendente', 'atendente@email.com', '$2b$10$5PUKcxN2s6dJesC3QyDXVOCq6yy3sq5mId2i6zUrVFHGJtM.2kYI6', '2026-01-01'),
  (6, 'Auxiliar Técnico', 'auxiliar@email.com', '$2b$10$5PUKcxN2s6dJesC3QyDXVOCq6yy3sq5mId2i6zUrVFHGJtM.2kYI6', '2026-01-01');

INSERT INTO Cliente (id_cliente, nome, cpf_criptografado, telefone, email, criado_em) VALUES
  (1, 'Carlos Silva', '', '(11) 98765-4321', 'carlos.silva@email.com', '2026-01-15'),
  (2, 'Ana Souza', '', '(11) 91234-5678', 'ana.souza@email.com', '2026-02-10'),
  (3, 'Mariana Oliveira', '', '(11) 95555-4444', 'mariana.o@email.com', '2026-03-01');

INSERT INTO Funcionario VALUES (4, 'Mecânico Chefe'), (5, 'Atendente'), (6, 'Auxiliar Técnico');

INSERT INTO Veiculos (id_cliente, placa, modelo, marca, ano) VALUES
  (1, 'ABC-1234', 'Civic', 'Honda', 2020),
  (2, 'XYZ-5678', 'Corolla', 'Toyota', 2022),
  (3, 'KHM-9012', 'Onix', 'Chevrolet', 2021);

INSERT INTO Agendamentos (id_veiculo, id_funcionario, data_agendamento, descricao_servico, status, criado_em) VALUES
  (1, 4, '2026-11-10', 'Troca de óleo e filtros', 'Pendente', '2026-11-01'),
  (2, 5, '2026-11-12', 'Alinhamento e balanceamento', 'Confirmado', '2026-11-02'),
  (3, 6, '2026-11-15', 'Revisão dos freios', 'Pendente', '2026-11-03');
