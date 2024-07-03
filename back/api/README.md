# API

The API will be here.

Refer to the [Getting Started Guide](https://api-platform.com/docs/distribution) for more information.

# MES CMD 

docker compose up -d

composer require doctrine/doctrine-migrations-bundle "^3.0" -W

Docker compose exec php bin/console make:migration

Docker compose exec php bin/console make:crud

docker compose exec php composer require orm-fixtures --dev   

Docker compose exec php bin/console make:fixtures

docker compose exec php  composer require fakerphp/faker --dev

docker compose build

Docker compose exec php bin/console make:migration

Docker compose exec php bin/console doctrine:migrations:migrate

docker compose exec php bin/console d:f:l -n

docker-compose exec php bin/console doctrine:schema:update --force


les entités: brand, establishment, performance, reservation, review, slot, user, sport