FROM     node:latest


RUN      mkdir -p /app/demoshop
WORKDIR  /app/demoshop/
COPY     package*.json /app/demoshop/
RUN      cd /app/demoshop/ 
      && npm install
COPY     . /app/demoshop/


EXPOSE   3000


CMD      npm run start-docker-compose
