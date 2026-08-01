#! /bin/bash

# docker run --name nops_db --rm -dv /home/.docker/volumes/postgres/18.4/nops:/var/lib/postgresql -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=xyz -p 5433:5432 postgres:18.4
# in psql 18+ data are in  /var/lib/postgresql   in older it was in /var/lib/postgresql/data

docker run --name nops_db --rm -dv /home/.docker/volumes/postgres/18.4/nops:/var/lib/postgresql -p 5433:5432 postgres:18.4

