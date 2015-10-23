#!/usr/bin/env bash

source $(dirname $0)/_head.sh

### Run unit tests ###

__BACKEND_CMD="npm run test"

subpath_run_cmd "${__SRC_PATH}" "${__BACKEND_CMD}"

