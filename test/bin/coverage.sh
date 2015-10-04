#!/usr/bin/env bash

source $(dirname $0)/_head.sh

### Merge Coverage results ###

istanbul-combine -d ${__COVERAGE_PATH} -r lcov -p both \
  ${__ROOT_PATH}src/DeepNgRoot/Tests/Frontend/coverage/*/coverage-final.json \
  ${__ROOT_PATH}src/DeepNgToDo/Tests/Frontend/coverage/*/coverage-final.json

### Upload Coverage info to Codacy and to Coveralls ###

cat ${__COVERAGE_PATH}"lcov.info" | codacy-coverage

cat ${__COVERAGE_PATH}"lcov.info" | coveralls


#### Cleanup coverage! ###
#__CMD='rm -rf ./test/coverage'
#subpath_run_cmd ${__ROOT_PATH} "$__CMD"
#
#__CMD='rm -rf '${__ROOT_PATH}src/Deep*/Tests/Frontend/coverage/
#subpath_run_cmd ${__ROOT_PATH} "$__CMD"
