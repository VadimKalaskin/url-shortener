FROM node:22-alpine

WORKDIR /var/app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 4200
CMD ["./entrypoint.sh"]
