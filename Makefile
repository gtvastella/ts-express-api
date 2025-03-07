DOCKERFILE ?= Dockerfile

up:
	DOCKERFILE=$(DOCKERFILE) docker compose up --build

down:
	docker compose down

logs:
	docker   compose logs -f

restart:
	$(MAKE) down
	$(MAKE) up

dev:
	$(MAKE) up DOCKERFILE=Dockerfile.dev 
prod:
	$(MAKE) up DOCKERFILE=Dockerfile

test:
	npm run test
clean:
	docker compose down -v
	docker system prune -f
	docker volume prune -f

.PHONY: up down logs restart dev prod clean test
