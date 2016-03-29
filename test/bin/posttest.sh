#!/usr/bin/env bash

source $(dirname $0)/_head.sh

### Start protractor test ###
if [ ${TRAVIS_NODE_VERSION} != '5.9' ]; then
  protractor ${__PROTRACTOR_CONFIG_PATH} --troubleshoot
fi
