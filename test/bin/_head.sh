#!/usr/bin/env bash

__SCRIPT_PATH=$(cd $(dirname $0); pwd -P)

__ROOT_PATH="${__SCRIPT_PATH}/../../"
__SRC_PATH="${__ROOT_PATH}src/"
__COVERAGE_PATH=${__SCRIPT_PATH}"/../coverage"

subpath_run_cmd () {
    local DIR
    local CMD
    local EXPR_BACKEND
    local EXPR_FRONTEND

    DIR=$(cd $1 && pwd -P)
    CMD=$2

    if [ -z $3 ]; then
        EXPR_FRONTEND="*/Tests/Frontend/"
        EXPR_BACKEND="*/Tests/Backend/"
    else
        EXPR_FRONTEND=$3"/Frontend"
        EXPR_BACKEND=$3"/Backend"
    fi

    #run tests for frontend
    for subpath in $DIR/$EXPR_FRONTEND
    do
        echo "[Running command for Frontend] $subpath"
        if [ -d ${subpath} ]; then
            cd ${subpath} && eval_or_exit "$CMD"
        fi
    done

    #run tests for backend
    for subpath in $DIR/$EXPR_BACKEND
    do
        echo "[Running command for Backend] $subpath"
        if [ -d ${subpath} ]; then
            cd ${subpath} && eval_or_exit "$CMD"
        fi
    done
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