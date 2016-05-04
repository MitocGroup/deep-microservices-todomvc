#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#
source $(dirname $0)/_head.sh

echo "Initializing backend"
cp src/deeploy.example.json src/deeploy.json &&\
deepify init-backend ./src
