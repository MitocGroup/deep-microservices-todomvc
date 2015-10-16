#!/usr/bin/env bash

source $(dirname $0)/_head.sh

#### Run Coverage ###
__CMD='npm run coverage'
subpath_run_cmd ${__SRC_PATH} "$__CMD"

### Merge Coverage results ###
istanbul-combine -d ${__COVERAGE_PATH} -r lcovonly -p both \
  ${__SRC_PATH}*/Tests/Frontend/coverage/*/coverage-final.json \
  ${__SRC_PATH}*/Tests/Backend/coverage/*.json

cd ${__COVERAGE_PATH}
ls -l

### Upload Coverage info to Codacy ###
cat ${__COVERAGE_PATH}"/lcov.info" | codacy-coverage
cat ${__COVERAGE_PATH}"/lcov.info" | coveralls

### Cleanup! ###
remove all generated reports
__CMD='rm -rf ./coverage'
subpath_run_cmd ${__SRC_PATH} "$__CMD"

#remove final report
cd ${__COVERAGE_PATH}
rm -rf ${__COVERAGE_PATH}

