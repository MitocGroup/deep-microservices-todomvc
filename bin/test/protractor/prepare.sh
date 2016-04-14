#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

if [ "${__TRAVIS_NODE_MAJOR_VERSION}" != "5" ]; then
  cp src/deeploy.example.json src/deeploy.json
  deepify init-backend ./src
fi