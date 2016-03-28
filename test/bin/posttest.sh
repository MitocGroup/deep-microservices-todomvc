#!/usr/bin/env bash

source $(dirname $0)/_head.sh

### Start protractor test ###
echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

if [ ${TRAVIS_NODE_VERSION} != '0.10' ]; then
  protractor ${__PROTRACTOR_CONFIG_PATH} --troubleshoot true
fi
