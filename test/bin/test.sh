#!/usr/bin/env bash

source $(dirname $0)/_head.sh

### Run unit tests ###

__FRONTEND_CMD="karma start config.karma.js"
__BACKEND_CMD="npm run test"

subpath_run_cmd "${__SRC_PATH}" "${__BACKEND_CMD}" "${__FRONTEND_CMD}"