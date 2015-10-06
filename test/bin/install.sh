#!/usr/bin/env bash

source $(dirname $0)/_head.sh

### Install NPM deps ###

__CMD='npm install'

subpath_run_cmd ${__DEEPNGROOT_PATH} "$__CMD"
subpath_run_cmd ${__DEEPNGTODO_PATH} "$__CMD"
