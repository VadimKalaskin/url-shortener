dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

up:
	docker compose up -d

down:
	docker compose down

toappfront:
	docker exec -it shortener-frontend sh

toappback:
	docker exec -it shortener-backend sh

frontlogs:
	docker logs shortener-frontend -f

backlogs:
	docker logs shortener-backend -f

restart:
	docker compose restart