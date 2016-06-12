#!/bin/bash

npm link chai &&\
npm link aws-sdk &&\
npm link node-dir &&\
npm link deepify &&\
npm link babel-preset-es2015 &&\
ln -s ../../../backend/src/task ./node_modules
