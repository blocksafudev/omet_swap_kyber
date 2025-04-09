#/bin/bash
docker rmi -f $(docker images -f "dangling=true" -q) || true
docker build -t omet-swap-kyber .
docker stop omet-swap-kyber || true
docker container rm omet-swap-kyber || true
docker rmi -f $(docker images -f "dangling=true" -q) || true
docker run -d --name=omet-swap-kyber --network=default-net --restart unless-stopped -p 8080:80 omet-backend-laravel
