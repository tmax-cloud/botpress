#!/bin/bash

yarn start &

sleep 10

curl --location --request POST 'https://chatbot.tmaxcloud.org/api/v2/admin/auth/register/basic/default' --header 'Content-Type: application/json' --data-raw '{"email": "admin", "password": "admin"}'

sleep 10

TOKEN="Authorization: Bearer "$(curl --location --request POST 'https://chatbot.tmaxcloud.org/api/v1/auth/login/basic/default' --header 'Content-Type: application/json' --data-raw '{"email": "admin", "password": "admin"}' |jq -r '.payload.jwt')

echo ${TOKEN}

curl -H "${TOKEN}" -H 'Content-Type: application/tar+gzip' \
	--upload-file /botpress/bot_console-bot_v0.0.1.tgz \
	-X POST https://chatbot.tmaxcloud.org/api/v2/admin/workspace/bots/console-bot/import?overwrite=false
