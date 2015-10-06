#!/usr/bin/env bash

source $(dirname $0)/_head.sh

#### Run Coverage ###
__CMD='npm run coverage'
subpath_run_cmd ${__SRC_PATH} "$__CMD"

### Merge Coverage results ###
istanbul-combine -d ${__COVERAGE_PATH} -r lcovonly -p both \
  ${__SRC_PATH}*/Tests/Frontend/coverage/*/*.json \
  ${__SRC_PATH}*/Tests/Backend/coverage/*.json

echo "Before changing"
cd ${__COVERAGE_PATH}
ls -l

OLD_PATH="Tests\/Backend\/Frontend"
NEW_PATH="Frontend"
sed -i "s/$OLD_PATH/$NEW_PATH/g" ${__COVERAGE_PATH}"/lcov.info"

echo "After changing"
cd ${__COVERAGE_PATH}
ls -l

echo "Check simple coverage"
cd ${__SRC_PATH}"DeepNgToDo/Tests/Frontend/coverage/*/"
ls -l

cat ${__SRC_PATH}"DeepNgToDo/Tests/Frontend/coverage/**/lcov.info" | codacy-coverage
cat ${__SRC_PATH}"DeepNgToDo/Tests/Frontend/coverage/**/lcov.info" | coveralls

## Upload Coverage info to Codacy ###
#cat ${__COVERAGE_PATH}"/lcov.info" | codacy-coverage
#cat ${__COVERAGE_PATH}"/lcov.info" | coveralls

### Cleanup! ###
#remove all generated reports
__CMD='rm -rf ./coverage'
subpath_run_cmd ${__SRC_PATH} "$__CMD"

#remove final report
cd ${__COVERAGE_PATH}
rm -rf ${__COVERAGE_PATH}

