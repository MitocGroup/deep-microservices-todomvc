#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

######################
### Run unit tests ###
######################
__CMD="npm run test"

if [ -z "${1}" ]; then
  __IS_CONCURRENT_SCRIPT=${__NONE};
else
  __IS_CONCURRENT_SCRIPT=${1}
fi

subpath_run_cmd "${__SRC_PATH}" "${__CMD}" "${__CMD}" "$__IS_CONCURRENT_SCRIPT"
