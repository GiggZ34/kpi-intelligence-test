# SCHOOL INVEST TRACKER

## Deployed version
    Website: https://front-kpi-intelligence-test-production.up.railway.app/ 
    Swagger: https://back-kpi-intelligence-test-production.up.railway.app/api/v1/schema/swagger-ui
    Redoc: https://back-kpi-intelligence-test-production.up.railway.app/api/v1/schema/redoc
___

## Installation
**Requirement: Docker** - _if you don't have docker, download it [here](https://www.docker.com/products/docker-desktop/)_

    - clone the project with `git clone --recurse-submodules https://github.com/GiggZ34/kpi-intelligence-test.git` to retrieve the associated submodules
    - Create `.env` file in the project's root directory. For this purpose, you have a predefined `.env.example` file.
    - With makefile:
        - run `make` for a dev mode or `make run_pprod` for a production-like mode.
    - Without makefile:
        - run `docker network create -d bridge sit-network`
        - run `docker compose up -d` for a dev mode or `docker compose -f docker-compose.pprd.yaml up -d` for a production-like mode.
___

## Useful link
    Swagger: http://localhost:your_back_port/schema/swagger-ui/
    Redoc: http://localhost:your_back_port/schema/redoc/
