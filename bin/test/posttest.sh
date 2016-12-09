#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

######################################
### Start protractor tests for e2e ###
######################################
if [ "${TEST_SUITE}" == "$__BACKEND" ] && \
   ([ "${BACKEND_MICROAPP_PATHS}" != "$__NONE" ] || [ "${FRONTEND_MICROAPP_PATHS}" != "$__NONE" ]) && \
   ([ "${__E2E_WITH_PUBLIC_REPO}" = "${E2E_TESTING}" ] || ([ "${__E2E_WITH_PRIVATE_REPO}" = "${E2E_TESTING}" ] && \
   [ "${CI_FULL}" == "true" ] )) && \
   [ "${__TRAVIS_NODE_MAJOR_VERSION}" -ge "7" ]; then


  __PROTRACTOR_CONFIG_PATH=$(find ${__SRC_PATH} -name protractor.config.js -type f -maxdepth 4)
  __DIRNAME_TO_CONFIG="$(dirname "$__PROTRACTOR_CONFIG_PATH")";
  __ABS_PATH="$( cd "$__DIRNAME_TO_CONFIG" && pwd )"

  ###########################################################################
  ### Check if protractor.config.js exists, otherwise exit with error msg ###
  ###########################################################################
  if [ ! -f "${__ABS_PATH}/protractor.config.js" ]; then
    echo "Protractor config [protractor.config.js] doesn't exist. Please create it and repeat"
    exit 1
  fi

  echo "Running E2E tests with protractor config: ${__PROTRACTOR_CONFIG_PATH}"

  protractor-flake --node-bin node --max-attempts=3 -- ${__PROTRACTOR_CONFIG_PATH}
else
  echo "Skipping E2E tests..."
fi
