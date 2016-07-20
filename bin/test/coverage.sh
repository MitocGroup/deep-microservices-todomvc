#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

if [ -z "${1}" ]; then
  __IS_CONCURRENT_SCRIPT=${__NONE};
else
  __IS_CONCURRENT_SCRIPT=${1}
fi

if [ $(IS_ENV_VARS_AVAILABLE) == "1" ] && [ "${IS_SKIP_TESTS}" == "false" ] && \
  ([ "$__IS_CONCURRENT_SCRIPT" == "$__NONE" ] || [ "$__IS_CONCURRENT_SCRIPT" == "$__BACKEND" ]); then

  ################################################################
  ### Update paths to have src/* file in coverage report       ###
  ### https://github.com/codacy/node-codacy-coverage/issues/26 ###
  ################################################################
  SEARCH_VALUE=$(pwd -P)"/"
  REPLACE_VALUE=""

  sed -e "s@${SEARCH_VALUE}@${REPLACE_VALUE}@g" ${__COVERAGE_PATH}"/lcov.info" > ${__COVERAGE_PATH}"/coverage.info"



  if [ $(IS_CODECLIMATE_TOKEN_AVAILABLE) == "1" ]; then

    ############################################################
    ### Upload Coverage info to Codeclimate in token exists  ###
    ############################################################
    CODECLIMATE_REPO_TOKEN=`printenv $__CODECLIMATE_TOKEN_NAME` codeclimate-test-reporter < ${__COVERAGE_PATH}"/coverage.info"
  else
    echo "Doesn't exists env variable ${__CODECLIMATE_TOKEN_NAME}"
  fi

  #####################################################################
  ### Log top 20 file paths to be able see paths format from travis ###
  #####################################################################
  head -n 20 ${__COVERAGE_PATH}"/coverage.info"
fi
