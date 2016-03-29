#!/usr/bin/env bash

echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

if [ ${TRAVIS_NODE_VERSION} != '5.9' ]; then
  cp src/deeploy.example.json src/deeploy.json
  deepify init-backend ./src
fi
