#!/usr/bin/env bash

__SCRIPT_PATH=$(cd $(dirname $0); pwd -P)

__ROOT_PATH="${__SCRIPT_PATH}/../../"

__COVERAGE_PATH=${__SCRIPT_PATH}"/../coverage/"

__DEEPNGROOT_PATH="${__ROOT_PATH}src/DeepNgRoot/Tests/Frontend/"
__DEEPNGTODO_PATH="${__ROOT_PATH}src/DeepNgToDo/Tests/Frontend/"

subpath_run_cmd () {
    local DIR
    local CMD
    local EXPR

    DIR=$(cd $1 && pwd -P)
    CMD=$2

    cd $DIR/${subpath} && eval_or_exit "$CMD"
}

eval_or_exit() {
    local RET_CODE

    eval "$1"
    RET_CODE=$?

    if [ ${RET_CODE} == 0 ]; then
        echo "[SUCCEED] $1"
    else
        echo "[FAILED] $1"
        exit 1
    fi
}