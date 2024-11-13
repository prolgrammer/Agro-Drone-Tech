FROM node:20.14

WORKDIR /usr/local/app

COPY . .

RUN npm install --force

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]