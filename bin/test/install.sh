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

#####################################
### Add logging for imported vars ###
#####################################
if [ "$TRAVIS" == "true" ] && [ -e "${__VARS_FILE_PATH}" ]; then
  head -n 20 "${__VARS_FILE_PATH}"
fi

if [ "$__IS_CONCURRENT_SCRIPT" == "$__NONE" ] || [ "$__IS_CONCURRENT_SCRIPT" == "$__BACKEND" ]; then

  ##################################################
  ### install frontend deps where e2e is enabled ###
  ##################################################
  if [ "$__IS_CONCURRENT_SCRIPT" != "$__NONE" ] && \
   ([ "${__E2E_WITH_PUBLIC_REPO}" == "${E2E_TESTING}" ] || \
   ([ "${__E2E_WITH_PRIVATE_REPO}" == "${E2E_TESTING}" ] && [ "${CI_FULL}" == "true" ])); then
    subpath_run_cmd "${__SRC_PATH}" "$__CMD" "$__CMD" "$__FRONTEND"
  fi

  echo "Start initializing backend"

  ###########################################################################
  ### Check if deeploy.example.json exists, otherwise exit with error msg ###
  ###########################################################################
  if [ ! -f ${__SRC_PATH}deeploy.example.json ]; then
    echo "File deeploy.example.json doesn't exist. Please create it and repeat"
    exit 1
  fi

  cp ${__SRC_PATH}deeploy.example.json ${__SRC_PATH}deeploy.json

  if [ "${TRAVIS}" == "true" ] && [ "$BACKEND_MICROAPP_IDENTIFIERS" == "none" ]; then

    ###########################################################################
    ### Skip initializing backend if no changes in backend or running in CI ###
    ###########################################################################
    echo "Skipping initializing backend, becuase no changes in backend"
  elif ( ([ "${BACKEND_MICROAPP_PATHS}" != "$__NONE" ] || [ "${FRONTEND_MICROAPP_PATHS}" != "$__NONE" ]) && \
    ([ "${__E2E_WITH_PUBLIC_REPO}" == "${E2E_TESTING}" ] || ([ "${__E2E_WITH_PRIVATE_REPO}" == "${E2E_TESTING}" ] && \
    [ "${CI_FULL}" == "true" ]))); then

    #################################################################
    ### Fully initializing backend for e2e test or forced locally ###
    ##########################################################
    echo "Fully initializing backend"

    cd ${__SRC_PATH} && deepify compile dev "${__SRC_PATH}"
  else

    ################################################################
    ### Partially initializing backend for specified identifiers ###
    ################################################################
    echo "Partially initializing backend: ${BACKEND_MICROAPP_PATHS}"
    cd ${__SRC_PATH} && deepify compile dev -m "${BACKEND_MICROAPP_PATHS}"
  fi

fi
