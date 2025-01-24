-include .env

build:
	docker compose build

run: network
	docker compose up -d

network:
	docker network create -d bridge sit-network || true

createsuperuser:
	docker compose exec back python manage.py createsuperuser

test:
	docker compose exec back python manage.py test

shell:
	docker compose exec back python manage.py shell

logs:
	docker compose logs -f --tail 5

db:
	docker compose exec db psql -d ${POSTGRES_DB} -U ${POSTGRES_USER}

db_update:
	sh scripts/create_migration_folders.sh
	docker compose exec back python manage.py makemigrations
	docker compose exec back python manage.py migrate

clean:
	docker compose down

fclean:
	docker compose down --remove-orphans --rmi "local" -v
	docker network rm sit-network || true

format:
	docker compose exec back ruff check --select I --fix
	docker compose exec back ruff format
	docker compose exec back ruff check --fix

.PHONY: build run test shell logs db clean fclean network format
.SILENT: build run test shell logs db clean fclean network format
.DEFAULT_GOAL := run