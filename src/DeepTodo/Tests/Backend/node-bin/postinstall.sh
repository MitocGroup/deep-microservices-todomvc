#!/bin/bash

COMPILE_DIR='./compile';

LINK_RES=(node_modules package.json)

COMPILE() {
  local resource=$1;
  deepify compile-es6 ${resource} -x .js --out-dir ${COMPILE_DIR}/${resource}
}

PREPARE() {

  [ -d ${COMPILE_DIR} ] && rm -rf ${COMPILE_DIR};

    COMPILE test;

    for RES in ${LINK_RES[@]}; do
        [ -e ${COMPILE_DIR}/${RES} ] && rm -f ${COMPILE_DIR}/${RES};
        ln -s ../${RES} ${COMPILE_DIR}/${RES};
    done;
}

PREPARE;
