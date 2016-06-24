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

if [ "${IS_SKIP_TESTS}" == "false" ] && \
  ([ "$__IS_CONCURRENT_SCRIPT" == "$__NONE" ] || [ "$__IS_CONCURRENT_SCRIPT" == "$__BACKEND" ]); then

  ################################################################
  ### Update paths to have src/* file in coverage report       ###
  ### https://github.com/codacy/node-codacy-coverage/issues/26 ###
  ################################################################
  SEARCH_VALUE=$(pwd -P)"/"
  REPLACE_VALUE=""

  sed -e "s@${SEARCH_VALUE}@${REPLACE_VALUE}@g" ${__COVERAGE_PATH}"/lcov.info" > ${__COVERAGE_PATH}"/coverage.info"

  #######################################
  ### Upload Coverage info to Codacy  ###
  #######################################
  cat ${__COVERAGE_PATH}"/coverage.info" | codacy-coverage --debug

  #####################################################################
  ### Log top 20 file paths to be able see paths format from travis ###
  #####################################################################
  head -n 20 ${__COVERAGE_PATH}"/coverage.info"
fi
