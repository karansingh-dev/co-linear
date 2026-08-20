#!/bin/bash
set -euo pipefail

NODE_ENV="${1:-dev}"
API_DIR="$(cd "$(dirname "$0")/api" && pwd)"


cd "$API_DIR"

npm install

echo "Starting with NODE_ENV: $NODE_ENV"

if [ ! -f "./envs/.env.${NODE_ENV}" ]; then
  echo "Missing env file: ./envs/.env.${NODE_ENV}"
  exit 1
fi

cp "./envs/.env.${NODE_ENV}" ./.env

if [ "$NODE_ENV" = "dev" ]; then
  npm run start:dev
elif [ "$NODE_ENV" = "qa" ]; then
  npm run start
elif [ "$NODE_ENV" = "prod" ] || [ "$NODE_ENV" = "production" ]; then
  npm run start:prod
else
  echo "Usage: $0 [dev|qa|prod]"
  exit 1
fi
