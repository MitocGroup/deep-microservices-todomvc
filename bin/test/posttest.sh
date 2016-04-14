#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

#############################
### Start protractor test ###
#############################
if [ "${__TRAVIS_NODE_MAJOR_VERSION}" != "5" ] && ([ "${__E2E_WITH_PUBLIC_REPO}" = "${E2E_TESTING}" ] || [ "${__E2E_WITH_PRIVATE_REPO}" = "${E2E_TESTING}" ]); then
  protractor ${__PROTRACTOR_CONFIG_PATH} --troubleshoot
else
  echo "Skipping E2E tests..."
fi