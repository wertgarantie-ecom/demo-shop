FROM node:latest


RUN mkdir -p /app/demoshop
WORKDIR /app/demoshop/

COPY package*.json /app/demoshop/
RUN npm install
COPY . /app/demoshop/


EXPOSE 3002


CMD npm run start-docker-compose
