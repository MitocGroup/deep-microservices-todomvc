#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#
source $(dirname $0)/../_head.sh
echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

if [ "${__TRAVIS_NODE_MAJOR_VERSION}" = "0" ]; then
  npm install -g protractor@2.0.x
else
  npm install -g protractor@3.0.x
fi