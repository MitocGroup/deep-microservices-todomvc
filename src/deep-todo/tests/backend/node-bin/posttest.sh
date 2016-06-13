#!/bin/bash

################################################
### Update paths to have backend in coverage ###
################################################
SEARCH_VALUE=".js"
REPLACE_VALUE=".es6"

sed -e "s@${SEARCH_VALUE}@${REPLACE_VALUE}@g" ./coverage/coverage.raw.json > ./coverage/coverage.json

rm ./coverage/coverage.raw.json
