FROM node:20

RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD dockerize -wait tcp://db:3306 -timeout 300s npm start
