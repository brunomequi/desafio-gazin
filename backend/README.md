### 🚀 Executando a aplicação BackEnd (API)

```bash
# Incialize o container
$ docker-compose up -d --build

# Acesse o container
$ docker exec -it desafio_gazin_app bash

#Dentro do container utilize os comandos abaixo:

# Instale as dependências
$ composer install

# Execute as migrações
$ php artisan migrate
```
