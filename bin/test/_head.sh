#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

__SCRIPT_PATH=$(cd $(dirname $0); pwd -P)

__ROOT_PATH="${__SCRIPT_PATH}/../../"
__SRC_PATH="${__ROOT_PATH}src/"
__COVERAGE_PATH=${__SCRIPT_PATH}"/../coverage"
__VARS_FILE_PATH=${__SCRIPT_PATH}/"_vars.sh"


if [ "$TRAVIS" == "true" ] && [ -e "$__VARS_FILE_PATH" ]; then
  source "$__VARS_FILE_PATH"
fi

__BACKEND="backend"
__FRONTEND="frontend"
__NONE="none"
__IS_CONCURRENT_SCRIPT=${__NONE}
__E2E_WITH_PUBLIC_REPO="public"
__E2E_WITH_PRIVATE_REPO="private"
__TRAVIS_NODE_MAJOR_VERSION="${TRAVIS_NODE_VERSION:0:1}"

subpath_run_cmd () {
  local DIR
  local EXPR_BACKEND
  local EXPR_FRONTEND
  local BACKEND_CMD
  local FRONTEND_CMD
  local SEARCH_VALUE
  local REPLACE_VALUE
  local PATH_TO_COVERAGE_FILE

  DIR=$(cd $1 && pwd -P)

  TEST_FRONTEND_PATH="Tests/Frontend/"
  TEST_BACKEND_PATH="Tests/Backend/"
  EXPR_FRONTEND="*/Tests/Frontend/"
  EXPR_BACKEND="*/Tests/Backend/"

  BACKEND_CMD=$2

  #set __BACKEND_MODULES[] which need to install/test
  if [ -z "$BACKEND_MICROAPP_PATHS" ]; then
    i=0;
    for subpath in $DIR/$EXPR_BACKEND
    do
      __BACKEND_MODULES[i]=$subpath
      i=$((i+1))
    done

  else
    EXPR=(${BACKEND_MICROAPP_PATHS//,/ })

    for i in "${!EXPR[@]}"
    do
      __BACKEND_MODULES[i]=$DIR/${EXPR[i]}/$TEST_BACKEND_PATH
    done
  fi


  #set __FRONTEND_MODULES[] which need to install/test
  if [ -z "$FRONTEND_MICROAPP_PATHS" ]; then
    i=0;
    for subpath in $DIR/$EXPR_FRONTEND
    do
      __FRONTEND_MODULES[i]=$subpath
      i=$((i+1))
    done

  else
    EXPR=(${FRONTEND_MICROAPP_PATHS//,/ })

    for i in "${!EXPR[@]}"
    do
      __FRONTEND_MODULES[i]=$DIR/${EXPR[i]}/$TEST_FRONTEND_PATH
    done
  fi

  if [ -z "${4}" ]; then
    echo "PARALLELIZING DISABLED"
    __IS_CONCURRENT_SCRIPT=${__NONE}
  else
    __IS_CONCURRENT_SCRIPT=$4
    echo "PARALLELIZING ENABLED FOR: ${__IS_CONCURRENT_SCRIPT}"
  fi

  if [ -z "${3}" ]; then
    FRONTEND_CMD="${BACKEND_CMD}"
  else
    FRONTEND_CMD="${3}"
  fi

  if [ "$__IS_CONCURRENT_SCRIPT" == "$__NONE" ] || [ "$__IS_CONCURRENT_SCRIPT" == "$__FRONTEND" ]; then

    #run tests for frontend
    for subpath in "${__FRONTEND_MODULES[@]}"
    do
      echo "[Running command for Frontend] $subpath"
      if [ -d ${subpath} ]; then
        cd ${subpath} && eval_or_exit "${FRONTEND_CMD}"

        #replace ./Frontend to real path to file
        # to fix karma issue after combine
        if [ "${FRONTEND_CMD}" == "npm run test" ]; then
          SEARCH_VALUE='.\/Frontend\/'
          subpath=${subpath/Tests\/Frontend/Frontend}

          ## Escape path for sed using bash find and replace
          REPLACE_VALUE="${subpath//\//\\/}"

          export PATH_TO_TEST_TDF_FILE="$(find ./coverage -name 'coverage-final.json')"
          sed "s/${SEARCH_VALUE}/${REPLACE_VALUE}/g" "${PATH_TO_TEST_TDF_FILE}" > ./coverage/report.json
        fi
      fi
    done
  fi

  if [ "$__IS_CONCURRENT_SCRIPT" == "$__NONE" ] || [ "$__IS_CONCURRENT_SCRIPT" == "$__BACKEND" ]; then

    #run tests for backend
    for subpath in "${__BACKEND_MODULES[@]}"
    do
      echo "[Running command for Backend] $subpath"
      if [ -d ${subpath} ]; then
        cd ${subpath} && eval_or_exit "${BACKEND_CMD}"
      fi
    done
  fi
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
