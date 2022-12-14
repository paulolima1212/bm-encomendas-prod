FROM node:18-alpine

WORKDIR /app

COPY ./package*.json ./

COPY ./entrypoint.sh ./

RUN npm install

RUN chmod +x entrypoint.sh

COPY . .

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "dev"]