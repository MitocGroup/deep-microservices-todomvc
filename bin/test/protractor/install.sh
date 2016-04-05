#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

if [ ${TRAVIS_NODE_VERSION} = '0.10' ] || [ ${TRAVIS_NODE_VERSION} = '0.11' ] || [ ${TRAVIS_NODE_VERSION} = '0.12' ]; then
  npm install -g protractor@2.0.x
else
  npm install -g protractor@3.0.x
fi