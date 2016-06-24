#!/usr/bin/env bash
#
# Created by vcernomschi on 23/06/2015
#

source $(dirname $0)/_head.sh

if [ -z "${1}" ]; then
  __IS_CONCURRENT_SCRIPT=${__NONE};
else
  __IS_CONCURRENT_SCRIPT=${1}
fi

if [ "${IS_SKIP_TESTS}" == "false" ] && \
  ([ "$__IS_CONCURRENT_SCRIPT" == "$__NONE" ] || [ "$__IS_CONCURRENT_SCRIPT" == "$__BACKEND" ]); then

  ##########################################################################################################
  ### Merge coverage results, compare with s3 report, add comments and update report in s3 if applicable ###
  ##########################################################################################################
  node $(dirname $0)/node-scripts/CoverageManager.js
fi
