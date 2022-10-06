FROM node:12.22.12

EXPOSE 3000 

RUN apt-get update && apt-get install -y \
    unzip && apt-get install -y jq

RUN wget -q https://github.com/tmax-cloud/botpress/archive/refs/heads/master.zip \
    && unzip master.zip \
    && mv botpress-master /botpress

COPY import_bot.sh /botpress/import_bot.sh

WORKDIR /botpress

RUN yarn install
RUN yarn build




