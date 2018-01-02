#!/bin/bash

# allows for variable interpolation in docker-compose file
set -o allexport; source ./.env; set +o allexport;

exec docker-compose $@
