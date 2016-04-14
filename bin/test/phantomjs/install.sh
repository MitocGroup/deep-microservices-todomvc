#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/../_head.sh

echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

# Fix for issue: https://github.com/Medium/phantomjs/issues/430#issuecomment-174038299
npm config set unsafe-perm false

if [ "${__TRAVIS_NODE_MAJOR_VERSION}" = "5" ]; then
  echo "My version: ${TRAVIS_NODE_VERSION}"
  npm install -g phantomjs@2.1.3
else
  echo "My version: ${TRAVIS_NODE_VERSION}"
  npm install -g phantomjs@1.9.18
fi
npm config set unsafe-perm true