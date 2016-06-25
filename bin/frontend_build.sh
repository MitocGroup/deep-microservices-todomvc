#!/usr/bin/env bash

BUILD_PATH=$(mktemp -d)
SCRIPT_PATH=$(cd $(dirname $0); pwd -P);
PROJECT_SRC=${SCRIPT_PATH}/../src
CORE_MS="deep-todomvc"

if [ ! -z "$1" ]; then
    BUILD_PATH="$1"
    mkdir -p ${BUILD_PATH}
fi

BUILD_FILES_PATH="${SCRIPT_PATH}/build_files"
FT_ROOT_MS_PATH="${PROJECT_SRC}/deep-root-angular/frontend"

if [ ! -d ${FT_ROOT_MS_PATH} ]; then
    cd ${PROJECT_SRC}
    deepify install github://MitocGroup/deep-microservices-root-angular
    mv deep-microservices-root-angular deep-root-angular
    cd ..
fi

find ${PROJECT_SRC} -type d -name '_build' \
    -not -path '*/src/deep-root-angular/frontend/_build' \
    -exec rm -rf {} \;

export DEEP_SKIP_ASSETS_OPTIMIZATION=1
export DEEP_SKIP_DEPLOY_ID_INJECT=1

deepify compile frontend ${PROJECT_SRC} -o=${BUILD_PATH}
rm -rf /tmp/src_*
cd ${BUILD_PATH}

echo BUILD FILES PATH "${BUILD_FILES_PATH}"
pwd

#Copy build files
cp -r ${FT_ROOT_MS_PATH}/js/app js/app
cp ${BUILD_FILES_PATH}/index.js .
cp ${BUILD_FILES_PATH}/bootstrap.js .

#Copy and edit config file
cp ${CORE_MS}/js/package.json js
cp ${CORE_MS}/js/config.core.js js

sed -i'' -e "s/baseURL: \"deep-todomvc\",/baseURL: \".\",/" js/config.core.js

#If _build folder doesn't exist in root microservice, made it and copy necessary files and folders
if [ ! -d ${FT_ROOT_MS_PATH}/_build ]; then
  mkdir ${FT_ROOT_MS_PATH}/_build
  mkdir ${FT_ROOT_MS_PATH}/_build/js
  cp ${FT_ROOT_MS_PATH}/index.html ${FT_ROOT_MS_PATH}/_build
  cp bootstrap.js ${FT_ROOT_MS_PATH}/_build
  cp -r img ${FT_ROOT_MS_PATH}/_build
  cp -r js/lib ${FT_ROOT_MS_PATH}/_build/js
fi

cd js
jspm install

npm run build:modules

cp bundle.min.js ${FT_ROOT_MS_PATH}/_build/js
cp config.core.js ${FT_ROOT_MS_PATH}/_build/js

rm -rf ${BUILD_PATH}

export DEEP_SKIP_ASSETS_OPTIMIZATION=0
export DEEP_SKIP_DEPLOY_ID_INJECT=0
