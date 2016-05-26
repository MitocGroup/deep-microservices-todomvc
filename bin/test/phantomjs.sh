#!/usr/bin/env bash
#
# Created by vcernomschi on 10/06/2015
#

source $(dirname $0)/_head.sh

############################################################################################
### Fix for issue: https://github.com/Medium/phantomjs/issues/430#issuecomment-174038299 ###
############################################################################################
echo "TRAVIS_NODE_VERSION: ${TRAVIS_NODE_VERSION}"

##############################
### Initial PhantomJS CDNs ###
##############################
Phantomjs_bitbucket_CDN="https://bitbucket.org/ariya/phantomjs/downloads"
Phantomjs_cnpmjs_CDN="https://cnpmjs.org/downloads"

############################
### Returned code of CDN ###
############################
HTTP_CODE=`curl -o /dev/null --silent --head --write-out '%{http_code}\n' ${Phantomjs_cnpmjs_CDN}`

if [ "${HTTP_CODE}"="200" ]; then
  echo "Using cnmpjs source to download PhantomJS"
  npm list -g phantomjs --depth=0 || npm install -g phantomjs@1.9.18 --phantomjs_cdnurl=${Phantomjs_cnpmjs_CDN}
else
  echo "Using bitbucket source to download PhantomJS"
  npm list -g phantomjs --depth=0 || npm install -g phantomjs@1.9.18 --phantomjs_cdnurl=${Phantomjs_bitbucket_CDN}
fi
