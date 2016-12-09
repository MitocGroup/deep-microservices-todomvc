#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

############################################################################################
### Fix for issue: https://github.com/Medium/phantomjs/issues/430#issuecomment-174038299 ###
############################################################################################
echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

npm list -g phantomjs@2.1.7 --depth=0 || npm install -g phantomjs@2.1.7
