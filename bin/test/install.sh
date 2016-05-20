#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

########################
### Install NPM deps ###
########################
__CMD="npm install"

subpath_run_cmd "${__SRC_PATH}" "$__CMD" "$__CMD" "${1}"

if [ -z "${1}" ]; then
  __IS_CONCURRENT_SCRIPT=${__NONE};
else
  __IS_CONCURRENT_SCRIPT=${1}
fi

if [ "$__IS_CONCURRENT_SCRIPT" == "$__NONE" ] || [ "$__IS_CONCURRENT_SCRIPT" == "$__BACKEND" ]; then

  # To disable interactive user interaction like prompts in terminal (an default value is always chosen)
  export DEEP_NO_INTERACTION=1

  #install also frontend for repos with e2e enabled
  if [ "$__IS_CONCURRENT_SCRIPT" != "$__NONE" ] && \
   ([ "${__E2E_WITH_PUBLIC_REPO}" == "${E2E_TESTING}" ] || \
   ([ "${__E2E_WITH_PRIVATE_REPO}" == "${E2E_TESTING}" ] && [ "${TRAVIS_BRANCH}" == 'stage' ])); then
    subpath_run_cmd "${__SRC_PATH}" "$__CMD" "$__CMD" "${__IS_CONCURRENT_SCRIPT}"
  fi

  echo "Start initializing backend"

  cp ${__SRC_PATH}deeploy.example.json ${__SRC_PATH}deeploy.json

  if [ "${TRAVIS}" == "true" ] && [ "$BACKEND_MICROAPP_IDENTIFIERS" == "none" ]; then
    echo "Skipping initializing backend, becuase no changes in backend"
  elif [ "$BACKEND_MICROAPP_IDENTIFIERS" == "$__NONE" ] || [ -z "$BACKEND_MICROAPP_IDENTIFIERS" ] || \
    ( ([ "BACKEND_MICROAPP_PATHS" != "$__NONE" ] || [ "FRONTEND_MICROAPP_PATHS" != "$__NONE" ]) && \
    ([ "${__E2E_WITH_PUBLIC_REPO}" == "${E2E_TESTING}" ] || ([ "${__E2E_WITH_PRIVATE_REPO}" == "${E2E_TESTING}" ] && \
    [ "${TRAVIS_BRANCH}" == 'stage' ]))); then

    echo "Fully initializing backend"

    cd ${__SRC_PATH} && deepify compile dev "${__SRC_PATH}"
  else
    echo "Partially initializing backend: ${BACKEND_MICROAPP_IDENTIFIERS}"
    cd ${__SRC_PATH} && deepify compile dev -m "${BACKEND_MICROAPP_IDENTIFIERS}"
  fi

fi
