#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

####################################################
### Install dependencies globally if don't exist ###
####################################################
(npm list -g babel-cli --depth=0 || npm install -g babel-cli) &&\
(npm list -g babel-polyfill --depth=0 || npm install -g babel-polyfill) &&\
(npm list -g babel-preset-es2015 --depth=0 || npm install -g babel-preset-es2015) &&\
(npm list -g deepify@$(npm show deepify version) --depth=0 || npm install -g deepify) &&\
(npm list -g jspm --depth=0 || npm install -g jspm@0.16.15)  &&\
(npm list -g browserify --depth=0 || npm install -g browserify@11.2.x) &&\
(npm list -g jscs --depth=0 || npm install -g jscs@2.1.x) &&\
(npm list -g mocha --depth=0 || npm install -g mocha@2.4.x) &&\
(npm list -g codacy-coverage --depth=0 || npm install -g codacy-coverage@1.1.x) &&\
(npm list -g chai --depth=0 || npm install -g chai@3.3.x) &&\
(npm list -g jasmine-core --depth=0 || npm install -g jasmine-core@2.3.x) &&\
(npm list -g istanbul@^1.0.0-alpha --depth=0 || npm install -g istanbul@^1.0.0-alpha) &&\
(npm list -g istanbul-combine --depth=0 || npm install -g istanbul-combine@0.3.x) &&\
(npm list -g karma --depth=0 || npm install -g karma@0.13.x) &&\
(npm list -g karma-jspm --depth=0 || npm install -g karma-jspm@2.0.x) &&\
(npm list -g karma-jasmine --depth=0 || npm install -g karma-jasmine@0.3.x) &&\
(npm list -g karma-babel-preprocessor --depth=0 || npm install -g karma-babel-preprocessor@5.2.x) &&\
(npm list -g karma-coverage@1.0.x --depth=0 || npm install -g karma-coverage@1.0.x) &&\
(npm list -g karma-verbose-reporter --depth=0 || npm install -g karma-verbose-reporter@0.0.x) &&\
(npm list -g karma-phantomjs-launcher --depth=0 || npm install -g karma-phantomjs-launcher@0.2.x) &&\
(npm list -g karma-ng-html2js-preprocessor --depth=0 || npm install -g karma-ng-html2js-preprocessor@0.2.x) &&\
(npm list -g node-dir --depth=0 || npm install -g node-dir) &&\

###################################################
### Install dependencies locally if don't exist ###
###################################################
(if [ ! -d "node_modules/isparta" ]; then npm install isparta@3.1.x; fi) &&\
(if [ ! -d "node_modules/sync-exec" ]; then npm install sync-exec@^0.6.x; fi) &&\
(if [ ! -d "node_modules/fs-extra" ]; then npm install fs-extra@0.x.x; fi)

#############################################################################
### Configure jspm and git if we are in CI                                ###
### for JSPM: https://gist.github.com/topheman/25241e48a1b4f91ec6d4       ###
### for NPM: https://github.com/npm/npm/issues/5257#issuecomment-60441477 ###
#############################################################################
if [ -z $TRAVIS_BUILD_NUMBER ]; then
    echo "Running locally - no need to jspm config"
else
    echo "Running in CI - configuring jspm registries"
    jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN
    git config --local url.https://github.com/.insteadOf git://github.com/
fi

##################################################################
### Installing dependencies for E2E tests stuff written in ES6 ###
##################################################################
if [ "${__E2E_WITH_PUBLIC_REPO}" = "${E2E_TESTING}" ] || [ "${__E2E_WITH_PRIVATE_REPO}" = "${E2E_TESTING}" ]; then
  bash `dirname $0`/protractor.sh

  ###############################################################
  ### Install locally, protractor doesn't find babel globally ###
  ###############################################################
  (if [ ! -d "node_modules/babel-cli" ]; then npm link babel-cli; fi) &&\
  (if [ ! -d "node_modules/babel-preset-es2015" ]; then npm link babel-preset-es2015; fi) &&\
  (if [ ! -d "node_modules/babel-plugin-add-module-exports" ]; then npm install babel-plugin-add-module-exports; fi) &&\
  (if [ ! -d "node_modules/jasmine2-custom-message" ]; then npm install jasmine2-custom-message@0.8.x; fi) &&\
  (if [ ! -d "node_modules/jasmine-utils" ]; then npm install jasmine-utils@0.2.x; fi)
fi

##########################################################
### Install skeleton dependecies if we are in skeleton ###
##########################################################
if [ $(git config --get remote.origin.url) == "https://github.com/MitocGroup/deep-microservices-skeleton" ]; then
  sh $(dirname $0)/../tools/skeleton-install.sh
fi

###################################################
### Install Phantomjs for frontend unit testing ###
###################################################
bash `dirname $0`/phantomjs.sh

if [ "$TRAVIS" == "true" ]; then
  ##########################################################################################
  ### Resolving detached HEAD error by attaching HEAD to the `TRAVIS_FROM_BRANCH` branch ###
  ##########################################################################################

  IFS=$'\n' TRAVIS_COMMIT_MESSAGES=($(git log -2 --pretty=%s))

  export TRAVIS_COMMIT_MESSAGE=${TRAVIS_COMMIT_MESSAGES[1]}

  TRAVIS_FROM_BRANCH="travis_from_branch"
  git branch $TRAVIS_FROM_BRANCH
  git checkout $TRAVIS_FROM_BRANCH
  git fetch origin $TRAVIS_BRANCH
  git checkout -qf FETCH_HEAD
  git branch $TRAVIS_BRANCH
  git checkout $TRAVIS_BRANCH
  git checkout $TRAVIS_FROM_BRANCH
else
  export TRAVIS_COMMIT_MESSAGE=$(git log -1 --pretty=%s)
fi

############################################################################################
### Transpile from ES6 to ES5 by using deepify and execute to retrieve the changed stuff ###
############################################################################################
deepify compile es6 $(dirname $0)/GitDiffWalker.es6 --source > $(dirname $0)/GitDiffWalker.js
node $(dirname $0)/GitDiffWalker.js
