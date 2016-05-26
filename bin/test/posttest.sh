#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

######################################
### Start protractor tests for e2e ###
######################################
if [ "${TEST_SUITE}" == "$__BACKEND" ] && \
   ([ "BACKEND_MICROAPP_PATHS" != "$__NONE" ] || [ "FRONTEND_MICROAPP_PATHS" != "$__NONE" ]) && \
   ([ "${__E2E_WITH_PUBLIC_REPO}" = "${E2E_TESTING}" ] || ([ "${__E2E_WITH_PRIVATE_REPO}" = "${E2E_TESTING}" ] && \
   [ ${TRAVIS_BRANCH} = 'stage' ])); then

  __PROTRACTOR_CONFIG_PATH=$(find ${__SRC_PATH} -name protractor.config.js -type f -maxdepth 4)

  ###########################################################################
  ### Check if protractor.config.js exists, otherwise exit with error msg ###
  ###########################################################################
  if [ ! -f "__PROTRACTOR_CONFIG_PATH" ]; then
    echo "Protractor config [protractor.config.js] doesn't exist. Please create it and repeat"
    exit 1
  fi

  echo "Running E2E tests with protractor config: ${__PROTRACTOR_CONFIG_PATH}"

  protractor ${__PROTRACTOR_CONFIG_PATH} --troubleshoot
else
  echo "Skipping E2E tests..."
fi