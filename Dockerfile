FROM node:latest
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install -g nodemon
RUN npm install


CMD ["nodemon", "index.js"]

COPY . .
