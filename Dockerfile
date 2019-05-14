FROM node:8.15.0-jessie

RUN mkdir -p /usr/client
WORKDIR /usr/client
COPY contact-book-client /usr/client

RUN npm cache verify
RUN npm install
RUN npm run build

RUN mkdir -p /usr/server
WORKDIR /usr/server
COPY contact-book-server /usr/server

RUN npm cache verify
RUN npm install

EXPOSE 8080
EXPOSE 27017

CMD ["npm", "run", "serve:docker"]
