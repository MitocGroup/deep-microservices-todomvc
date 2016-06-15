#!/bin/bash

################################################
### Update paths to have backend in coverage ###
################################################
SEARCH_VALUE=".js"
REPLACE_VALUE=".es6"

sed -e "s@${SEARCH_VALUE}@${REPLACE_VALUE}@g" ./coverage/coverage.raw.json > ./coverage/coverage.json

(if [ -f "./coverage/coverage.raw.json" ]; then rm ./coverage/coverage.raw.json; fi)
