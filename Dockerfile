FROM node:7.9

ADD . /code

WORKDIR /code

RUN npm install -g grunt-cli

RUN npm install

RUN touch /var/log/feedcrawler.log

CMD grunt&&node dist/crawler.js
