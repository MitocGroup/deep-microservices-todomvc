#!/usr/bin/env bash

source $(dirname $0)/_head.sh

### Start protractor test ###
echo "TRAVIS_BRANCH: ${TRAVIS_BRANCH}"

if [ ${TRAVIS_NODE_VERSION} != '5.9' ]; then
  protractor ${__PROTRACTOR_CONFIG_PATH} --troubleshoot true
fi
