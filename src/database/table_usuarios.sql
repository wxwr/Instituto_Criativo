-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('pessoa_fisica', 'colaborador', 'voluntario', 'desenvolvedor') NOT NULL,
    ativo TINYINT(1) DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (email),
    INDEX idx_tipo (tipo),
    INDEX idx_data_criacao (data_criacao)
) ENGINE=InnoDB;

-- View para usuários ativos
CREATE VIEW usuarios_ativos AS
SELECT id, nome, email, tipo, data_criacao
FROM usuarios
WHERE ativo = 1;

-- Consulta na View
SELECT * FROM usuarios_ativos;