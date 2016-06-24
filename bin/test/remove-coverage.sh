#!/usr/bin/env bash
#
# Created by vcernomschi on 23/06/2015
#

source $(dirname $0)/_head.sh

#############################################
### Cleanup! Remove all generated reports ###
#############################################
__CMD='rm -rf ./coverage'
subpath_run_cmd ${__SRC_PATH} "$__CMD"

#####################################
### Remove final report if exists ###
#####################################
(if [ -d ${__COVERAGE_PATH} ]; then rm -rf ${__COVERAGE_PATH}; fi)
