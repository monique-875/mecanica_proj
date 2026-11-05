ALTER TABLE cliente MODIFY cpf_criptografado VARCHAR(255) NOT NULL;
UPDATE cliente SET cpf_criptografado = '' WHERE cpf_criptografado IS NOT NULL;
