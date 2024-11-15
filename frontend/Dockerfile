FROM node:20.14-alpine

WORKDIR /usr/local/app

COPY . .

RUN npm ci --force

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
