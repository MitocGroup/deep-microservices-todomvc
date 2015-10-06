#!/usr/bin/env bash

__SCRIPT_PATH=$(cd $(dirname $0); pwd -P)

__ROOT_PATH="${__SCRIPT_PATH}/../../"
__SRC_PATH="${__ROOT_PATH}src/"
__COVERAGE_PATH=${__SCRIPT_PATH}"/../coverage"

subpath_run_cmd () {
    local DIR
    local EXPR_BACKEND
    local EXPR_FRONTEND
    local BACKEND_CMD
    local FRONTEND_CMD

    DIR=$(cd $1 && pwd -P)

    EXPR_FRONTEND="*/Tests/Frontend/"
    EXPR_BACKEND="*/Tests/Backend/"

    BACKEND_CMD=$2

    if [ -z "${3}" ]; then
        FRONTEND_CMD="${BACKEND_CMD}"
    else
        FRONTEND_CMD="${3}"
    fi

    #run tests for frontend
    for subpath in $DIR/$EXPR_FRONTEND
    do
        echo "[Running command for Frontend] $subpath"
        if [ -d ${subpath} ]; then
            cd ${subpath} && eval_or_exit "${FRONTEND_CMD}"
        fi
    done

    #run tests for backend
    for subpath in $DIR/$EXPR_BACKEND
    do
        echo "[Running command for Backend] $subpath"
        if [ -d ${subpath} ]; then
            cd ${subpath} && eval_or_exit "${BACKEND_CMD}"
        fi
    done
}

eval_or_exit() {
    local RET_CODE

    echo $1
    eval "$1"
    RET_CODE=$?

    if [ ${RET_CODE} == 0 ]; then
        echo "[SUCCEED] $1"
    else
        echo "[FAILED] $1"
        exit 1
    fi
}