FROM node:latest

WORKDIR /app/demoshop/
COPY package*.json /app/demoshop/
RUN npm install

COPY . /app/demoshop/

EXPOSE 3000

CMD npm run start-docker-compose