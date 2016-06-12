#!/bin/bash

RUN_TESTS() {
  babel-node $(npm root -g)/istanbul/lib/cli.js cover `which _mocha` -- 'test/**/*.spec.js' \
    --reporter spec --ui tdd --recursive --timeout 20s
}

if [ "$OSTYPE" != "msys" ] && [ "$OSTYPE" != "win32" ] && [ "$OSTYPE" != "win64" ] && [ -d 'test' ] && [ -d 'node_modules' ]; then

 #########################################################################
 ### Run with babel-node to support ES6 tests and have coverage in ES6 ###
 #########################################################################
 RUN_TESTS
elif [ "$OSTYPE" == "win32" ] || [ "$OSTYPE" == "win64" ]; then

  #################################################
  ### Skip running on Windows from command line ###
  #################################################
  echo "You should have installed and configured http://git-scm.com/ and run all bash command by using git-bash.exe"
elif [ -d 'test' ] && [ -d 'node_modules' ]; then

  #########################################
  ### Running from git-bash on Windows  ###
  #########################################
  echo "Running from git-bash with gathering coverage"
  RUN_TESTS
else

  ##################################################
  ### Skip running if `lib` folder doesn't exist ###
  ##################################################
  echo "Skipping testing..."
fi
