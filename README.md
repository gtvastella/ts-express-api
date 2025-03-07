# Aplicação Express com Docker

## Visão Geral
Este é um aplicativo Node.js em Typescript usando Express, containerizado com Docker. O projeto inclui um `Makefile` para simplificar comandos relacionados ao Docker.

## Pré-requisitos
Certifique-se de ter os seguintes requisitos instalados:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)
- [Node.js](https://nodejs.org/) (para testes locais)

## Configuração

### Executando a Aplicação

#### Modo de Desenvolvimento:
```sh
make dev
```

#### Modo de Produção:
```sh
make prod
```

### Parando a Aplicação
```sh
make down
```

### Reiniciando a Aplicação
```sh
make restart
```

### Visualizando Logs
```sh
make logs
```

### Executando Testes
(Deve ser feito com o servidor em funcionamento)
```sh
make test
```

### Limpando Recursos do Docker
```sh
make clean
```

## Rotas da API
A aplicação expõe as seguintes rotas:

### Rotas de Cliente
- **POST** `/customer/create` - Criar um novo cliente
- **POST** `/customer/update` - Atualizar um cliente existente
- **GET** `/customer/list` - Obter uma lista de clientes
- **GET** `/customer/get` - Obter um cliente específico

## Schemas da API

### Schema de Criação de Cliente
```json
{
  "nome": "string (mínimo: 3 caracteres)",
  "email": "string (formato de e-mail válido)",
  "telefone": "string (10 ou 11 dígitos)"
}
```

### Schema de Obtenção de Cliente
Este schema deve ser passado como query params e não no corpo da requisição.
```json
{
    "id": "string (hexadecimal de 24 caracteres)"
}
```

### Schema de Listagem de Clientes
Este schema deve ser passado como query params e não no corpo da requisição.
```json
{
  "limit": "inteiro (mínimo: 1, padrão: 10)",
  "page": "inteiro (mínimo: 1, padrão: 1)"
}
```

### Schema de Atualização de Cliente
```json
{
  "id": "string (hexadecimal de 24 caracteres)",
  "nome": "string (mínimo: 3 caracteres, opcional)",
  "email": "string (formato de e-mail válido, opcional)",
  "telefone": "string (10 ou 11 dígitos, opcional)",
  "ativo": "booleano (opcional)"
}
```
## Banco de Dados
O MongoDB é utilizado como banco de dados principal para o projeto. Os clientes são armazenados em 'customers', enquanto logs de aplicação em 'logs'

## Fila e mensageria
O RabbitMQ é um serviço de filas que pega informações da API e posteriormente processa, criando logs no banco de dados.

## Cache
O Redis é utilizado como cache principal. Ao buscar um usuário pelo ID, o Redis guarda dados da requisição para usar em novas consultas, deixando o processo mais rápido.

## CI/CD
Esse projeto possui um exemplar de CI/CD para Kubernetes em EKS (AWS) em .github/workflows/example-deploy.yml

## Licença
Este projeto está licenciado sob a Licença MIT.

