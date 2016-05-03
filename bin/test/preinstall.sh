#!/usr/bin/env bash

source $(dirname $0)/_head.sh

npm update -g babel-cli@6.x.x &&\
npm update -g babel-preset-es2015 &&\
npm update -g babel-plugin-add-module-exports &&\
npm update -g deepify &&\
npm update -g jspm@0.16.15 &&\
npm update -g browserify@11.2.x &&\
npm update -g jscs@2.1.x &&\
npm update -g mocha@2.3.x &&\
npm update -g codacy-coverage@1.1.x &&\
npm update -g chai@3.3.x &&\
npm update -g jasmine-core@2.3.x &&\
npm update -g istanbul@0.3.x &&\
npm update -g istanbul-combine@0.3.x &&\
npm update -g karma@0.13.x &&\
npm update -g karma-jspm@2.0.x &&\
npm update -g karma-jasmine@0.3.x &&\
npm update -g karma-babel-preprocessor@5.2.x &&\
npm update -g karma-coverage@douglasduteil/karma-coverage#next &&\
npm update -g karma-verbose-reporter@0.0.x &&\
npm update -g karma-phantomjs-launcher@0.2.x &&\
npm update -g karma-ng-html2js-preprocessor@0.2.x &&\
npm update -g node-dir &&\
npm update isparta@3.1.x

if [ -z $TRAVIS_BUILD_NUMBER ]; then
    echo "Running locally - no need to jspm config"
else
    echo "Running in CI - configuring jspm registries"
    jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN
fi

if [ "${__E2E_WITH_PUBLIC_REPO}" = "${E2E_TESTING}" ] || [ "${__E2E_WITH_PRIVATE_REPO}" = "${E2E_TESTING}" ]; then
  bash `dirname $0`/protractor/install.sh

  #install locally, protractor doesn't find babel globally
  npm update babel-cli@6.x.x &&\
  npm update babel-preset-es2015 &&\
  npm update babel-plugin-add-module-exports &&\
  npm update jasmine2-custom-message@0.8.x &&\
  npm update jasmine-utils@0.2.x
fi

if [ "${__E2E_WITH_PUBLIC_REPO}" = "${E2E_TESTING}" ]; then
  bash `dirname $0`/protractor/prepare.sh
fi

getGitUrl() {
  git config --get remote.origin.url
}

GIT_URL=$(getGitUrl)
SCELETON_URL="https://github.com/MitocGroup/deep-microservices-skeleton"

echo "Status: ${GIT_URL}"

if [ "${GIT_URL}" = "${SCELETON_URL}" ]; then
  npm update inquirer@0.12.x &&\
  npm update minimist@1.2.x &&\
  npm update fs-extra@0.x.x &&\
  npm link node-dir
fi

bash `dirname $0`/phantomjs/install.sh