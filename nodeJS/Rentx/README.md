## Cadastro de carros
**Requisitos Funcionais**
[x] Deve ser possível cadastrar um novo carro;

**Regras de Negócio**
[x] Não deve ser possível cadastar um carro com uma placa já existente;
[x] O carro cadastrado, por padrão, deve estar disponível para locação;
[x] O cadastro deve ser efetuado somente por usuários administrado;

## Listagem de carros
**Requisitos Funcionais**
[x] Deve ser possível listar todos os carros disponíveis;
[x] Deve ser possível filtrar por categoria;
[x] Deve ter possível filtrar por marca;
[x] Deve ser possível filtrar por nome;

**Regras de Negócio**
[x] O usuário não precisa estar logado no sistema;

## Registrar Especificação no carro
**Requisitos Funcionais**
[x] Deve ser possível cadastrar uma especificação para um carro;

**Regras de Negócio**
[x] Não deve ser possível cadastro em carros não cadastrados;
[x] O cadastro deve ser efetuado somente por usuários administrado;

## Cadastro de imagens do carro
**Requisitos Funcionais**
[x] Deve ser possível cadastrar imagens do carro;

**Regras de Negócio**
[x] O cadastro deve ser efetuado somente por usuários administrado;

## Aluguel de carro
**Requisitos Funcionais**
[x] Deve ser possível cadastrar um aluguel;

**Regras de Negócio**
[x] O usuário deve estar logado ao sistema;
[x] O aluguel deve mínimo deve ser de uma diária;
[x] Não deve ser possível realizar mais de um aluguel por carro;
[x] Não deve ser possível realizar mais de um aluguel por usuário;

## Devolução de carro / Finalizar Aluguel
**Requisitos Funcionais**
[x] Deve ser possível realizar a devolução de um carro / finalização do aluguel;

**Requisitos de Negócio**
[x] Após a devolução, deverá ser calculado o total do aluguel;
[x] A diária deve ser cobrada integralmente mesmo com fraçoes de dia;
[x] Deverá ser cobrado multa para devoluções com prazo superior ao previsto;
[x] A multa deve ser somada ao total do aluguel;
[x] Após a devolução, o carro deverá ser liberado para um próximo aluguel;
[x] Após a devolução, o usuário deverá ser liberado para um próximo aluguel;

## Recuperação de senha
**Requisitos Funcionais**
[x] Deve ser possível o usuário solicitar a recuperação de senha;
[x] Deve ser enviado um e-mail ao usuário com o passo a passo para recuperação de senha;
[x] Deve ser possível o usuário inserir uma nova senha;

**Requisitos de Negócio**
[x] O link de recuperação deve expirar em 15 minutos;
[x] A nova senha deve ser diferente da anterior;
[ ] A senha deve conter mais de 6 caracteres;
[ ] A senha deve conter ao menos uma letra;
[ ] A senha deve conter ao menos um número;
[ ] A senha deve conter ao menos um caractere especial;