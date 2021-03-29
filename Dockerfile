FROM node:latest

RUN apt-get update && apt-get install -y git-crypt

RUN mkdir -p /app/demoshop
WORKDIR /app/demoshop/
COPY package*.json /app/demoshop/
RUN npm install

COPY . /app/demoshop/

EXPOSE 3000

CMD npm run start-docker-compose