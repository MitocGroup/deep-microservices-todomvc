#!/usr/bin/env bash

PROFILE=$1

if [ -z ${PROFILE} ]; then
  echo "No AWS profile name provided!"
  exit 1
fi

aws --profile ${PROFILE} dynamodb list-tables | \
 php -r '$d=json_decode(stream_get_contents(STDIN), true); foreach($d["TableNames"] as $t) echo $t, PHP_EOL;' | \
  xargs -n 1 -P 7 aws --profile deep-dev dynamodb delete-table --table-name