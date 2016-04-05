#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

if [[ ${TRAVIS_NODE_VERSION} == 5.* ]]; then
  npm install -g phantomjs@2.1.3
else
  npm install -g phantomjs@1.9.18
fi