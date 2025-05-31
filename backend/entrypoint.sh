#!/bin/sh

echo "⏳ Ждём базу данных (shortener-db:5432)..."

until nc -zv shortener-db 5432 2>/dev/null; do
  echo "⌛ Ждём PostgreSQL..."
  sleep 2
done

echo "✅ База данных доступна, продолжаем"

# Генерация Prisma клиента
npx prisma generate

# Сборка NestJS
npm run build

echo "🚀 Запуск backend"
node dist/main
