#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#
source $(dirname $0)/../_head.sh
echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

if [ "${__TRAVIS_NODE_MAJOR_VERSION}" = "0" ]; then
  npm list protractor@2.0.x --depth=0 || npm install -g protractor@2.0.x
else
  npm list protractor@3.0.x --depth=0 || npm install -g protractor@3.0.x
fi