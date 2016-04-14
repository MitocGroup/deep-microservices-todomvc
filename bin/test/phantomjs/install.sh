#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

#source $(dirname $0)/../_head.sh

echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

# Fix for issue: https://github.com/Medium/phantomjs/issues/430#issuecomment-174038299
npm config set unsafe-perm false

npm install -g phantomjs@1.9.18

npm config set unsafe-perm true