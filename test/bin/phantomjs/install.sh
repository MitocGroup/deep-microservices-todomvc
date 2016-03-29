#!/usr/bin/env bash

echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

if [ ${TRAVIS_NODE_VERSION} = '5.9' ]; then
  npm install -g phantomjs@2.1.17
fi
