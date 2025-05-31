FROM node:22-alpine

WORKDIR /var/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200

CMD ["npx", "prisma", "db", "push"]

CMD ["npx", "prisma", "generate"]

CMD ["npm", "run", "start:dev"]
