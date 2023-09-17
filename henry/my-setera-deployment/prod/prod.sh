#!/bin/bash
docker compose \
    -f docker-compose.yml \
    -f ./compose-files/infra/docker-compose.nginx.yml \
    -f ./compose-files/infra/docker-compose.redis.yml \
    -f ./compose-files/infra/docker-compose.db.yml \
    -f ./compose-files/backend/docker-compose.backend.yml \
    -f ./compose-files/infra/docker-compose.celery.yml \
    -f ./compose-files/frontend/docker-compose.frontend.yml \
    "$@";

    