#!/usr/bin/env bash

path=$(cd $(dirname $0); pwd -P)
npm=$(which npm)
brew=$(which brew)
jscs=`which jscs`

if [ -z ${jscs} ]; then
    if [ -z ${npm} ]; then
        if [ -z ${brew} ]; then
            echo "You may install Homebrew first!"
            exit 1
        fi

        echo "Installing nodejs..."
        ${brew} install nodejs

        npm=$(which npm)
    fi
    ${npm} install jscs -g
fi

if [ -f ${path}/../.git/hooks/pre-commit ]; then
    cp ${path}/../.git/hooks/pre-commit ${path}/../.git/hooks/pre-commit_$(date +%F-%H%M%S).bak
fi

cp ${path}/pre-commit ${path}/../.git/hooks/.
