# API

The API will be here.

Refer to the [Getting Started Guide](https://api-platform.com/docs/distribution) for more information.


composer require doctrine/doctrine-migrations-bundle "^3.0" -W

Docker compose exec php bin/console make:crud

docker compose exec php composer require orm-fixtures --dev   

Docker compose exec php bin/console make:fixtures

docker compose exec php  composer require fakerphp/faker --dev

docker compose exec php bin/console d:f:l -n

