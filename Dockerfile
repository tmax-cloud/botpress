FROM node:12.22.12

EXPOSE 3000 

RUN apt-get update && apt-get install -y \
    unzip

RUN wget -q https://github.com/tmax-cloud/botpress/archive/refs/heads/master.zip \
    && unzip master.zip \
    && mv botpress-master /botpress

WORKDIR /botpress

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

