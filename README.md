# testProject

a [Sails](http://sailsjs.org) application


StartDB

    docker run --restart=always -p 3308:3306 \
    --name taovang-crm \
    -e MYSQL_ROOT_PASSWORD='x!x' \
    -e MYSQL_DATABASE=taovang_crm \
    -d mysql:latest

Start Redis
    docker run -d -p 6379:6379 -e REDIS_PASS='x!x' --name taovang-redis tutum/redis
