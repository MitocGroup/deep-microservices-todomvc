#!/usr/bin/env bash

# Install global packages
NPM_BIN=`which npm`
GLOBAL_DEPS=(
    deepify
    recink
    recink-snyk
    recink-pagespeed
    recink-codeclimate
);

for DEP in ${GLOBAL_DEPS[@]}; do
    if [ ! -d "$(${NPM_BIN} root -g)/${DEP}" ]; then
        echo "Installing missing ${DEP}"
        ${NPM_BIN} install -g ${DEP} || (echo "Failed to install ${DEP}" && exit 1)
    fi
done
