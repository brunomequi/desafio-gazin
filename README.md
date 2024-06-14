
#Authorizer

### Descrição do Projeto:

> Este projeto consiste em uma aplicação para cadastro de desenvolvedores associados a diferentes níveis. A aplicação é composta por um backend que oferece uma API RESTful e um frontend que é uma SPA (Single Page Application) interligada à API.

### 💻 Pré-requisitos

- A aplicação utiliza o [Docker](https://www.docker.com/) a fim de manter a integridade da sua operação independentemente
  do sistema operacional. Após a instalação utilize-o conforme a exemplificação abaixo.

### 🚀 Executando a aplicação BackEnd (API)

```bash
# Incialize o container
$ docker-compose up -d --build

# Acesse o container
$ docker exec -it challengegazin-app-1 bash

#Dentro do container utilize os comandos abaixo:

# Instale as dependências
$ composer install

# Execute as migrações
$ php artisan migrate
```

### 🚀 Executando a aplicação FrontEnd

```bash
# Acesse a pasta frontend e execute o comando abaixo
$ npm install

# Após instalação das dependências, execute o comando abaixo
$ npm run dev
```

### 🛠 Ferramentas

As seguintes tecnologias foram utilizadas na aplicação:

- [Laravel 11.9](https://laravel.com/docs/11.x/installation)
- [React 18.2](https://react.dev/)
- [Vite 5.2](https://vitejs.dev/)
- [Docker](https://www.docker.com/)
