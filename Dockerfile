FROM node:latest

WORKDIR /app/demoshop/
COPY package*.json /app/demoshop/
RUN npm install

COPY . /app/demoshop/

EXPOSE 3002

CMD NODE_ENV=local PORT=3002 node ./bin/www