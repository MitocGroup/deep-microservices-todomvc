'use strict';

require('colors');
var fs            = require('fs');
var shell         = require('shelljs');
var path          = require('path');
var getFolderList = require('./utils').getFolderList;
var Lambda        = require('./lambda');
var Log           = require('./logger');

module.exports = Microservice;

function Microservice(name, currentDirectory, logger) {
  this.name                         = name;
  this.currentPath                  = currentDirectory;
  this.microServicePath             = path.join(this.currentPath, name);
  this.microServiceBackendPath      = path.join(this.microServicePath, 'Backend');
  this.microServiceFrontendPath     = path.join(this.microServicePath, 'Frontend');
  this.microServiceFrontendAppPath  = path.join(this.microServiceFrontendPath, 'js');
  this.microServiceRoutingPath      = path.join(this.microServiceBackendPath, 'resources.json');
  this.microServiceLambdaGroupPath  = path.join(this.microServiceBackendPath, 'src');
  this.logger                       = logger || new Log();
  this.lambdasContainer             = this.lambdasInit_();
  this.verbose                      = false;
}

/**
 * Verbose flag
 * @param verboseFlag
 */
Microservice.prototype.setVerbose = function(verboseFlag) {
  this.verbose = !!verboseFlag;
};

/**
 * Fetch lambda paths and initialize lambdas container for the current microservice by routing.json
 * @returns {Array}
 * @private
 */
Microservice.prototype.lambdasInit_ = function() {
  var _this = this;
  var lambdasContainer = [];

  var routingJSON = JSON.parse(fs.readFileSync(_this.microServiceRoutingPath, {encoding: 'utf8'}));

  for (var routeName in routingJSON) {
    if (routingJSON.hasOwnProperty(routeName)) {
      var route = routingJSON[routeName];
      for (var actionName in route) {
        if (route.hasOwnProperty(actionName)) {
          var action = route[actionName];
          var lambdaPath = path.join(_this.microServiceBackendPath, action.source);

          if (!fs.existsSync(path.join(lambdaPath, 'package.json'))) {
            _this.logger.warn('Lambda at ' + lambdaPath + ' registered in resources.json but does not exists');
          } else {
            lambdasContainer.push(new Lambda(lambdaPath, _this.logger));
          }
        }
      }
    }
  }

  return lambdasContainer;
};


/**
 * Fetch lambda paths for the current microservice by folder
 * @returns {Array}
 * @deprecated
 * @private
 */
Microservice.prototype.getLambdaPathsByFolder_ = function() {
  var lambdasPaths = [];
  var lambdaGroupPaths = getFolderList(this.microServiceLambdaGroupPath);

  for (var i = 0; i < lambdaGroupPaths.length; i++) {
    lambdasPaths = this.lambdasPaths.concat(getFolderList(lambdaGroupPaths[i]));
  }

  return lambdasPaths;
};

/**
 * Installs backend lambda dependencies
 * @param forceUpdate
 * @param cb
 * @returns {*}
 */
Microservice.prototype.backendInstall = function(forceUpdate, productionFlag, cb) {
  var _this = this;
  var currentLambdaIdx = 0;

  if (typeof forceUpdate === 'function') {
    cb = forceUpdate;
    forceUpdate = false;
    productionFlag = false;
  } else if (typeof productionFlag === 'function') {
    cb = productionFlag;
    productionFlag = false;
  }

  _this.logger.info('Start  installing dependencies for ' + (_this.name).cyan + ' microservice lambdas');

  if (forceUpdate) {
    _this.logger.info('Using force update dependencies');
  }

  if (!_this.lambdasContainer.length) {
    _this.logger.warn('No lambdas found for ' + (_this.name).cyan + '. Skipping dependencies install ⛷   ');
    return cb(null, _this);
  }

  return installLambdaDependencies(_this.lambdasContainer[currentLambdaIdx], installLambdaDependenciesCb);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function installLambdaDependencies(lambda, cb) {

    _this.logger.info('Start installing ' + lambda.fullName + ' dependencies');

    lambda.requiresRebuild(function(err, requiresRebuild) {

      if (!err && !requiresRebuild && !forceUpdate) {
        _this.logger.info('Lambda ' + lambda.fullName + ' is already packed. ' +
          'Skipping install (use forced update to override this behaviour)');
        return cb(null, _this);
      }

      //@todo: Check the checksum zip existence and not forcing update to ignore dependencies install?
      //Run NPM install to trigger PRE|POST install hooks
      //Run NPM update only if it is forced
      //var npmCommand = 'npm install ' + lambda.lambdaPath;
      var env = productionFlag ? '--production' : '';

      var currentPath = process.cwd();
      var npmCommand = 'rm -rf node_modules/ && npm install ' + env;

      if (forceUpdate) {
        npmCommand += ' && npm update ' + env;
      }

      process.chdir(lambda.lambdaPath);

      shell.exec(npmCommand, {silent: !_this.verbose}, function(err, stdout) {
        _this.logger.trace(stdout);

        process.chdir(currentPath);

        if (err) {
          _this.logger.error(err);
        } else {
          _this.logger.info('Finished installing dependencies for ' + lambda.fullName);
        }

        return cb(err, _this);
      })
        .stderr.on('data', function(data) {
          _this.logger.error(data);
        });
    });
  }

  function installLambdaDependenciesCb() {
    currentLambdaIdx += 1;

    if (currentLambdaIdx === _this.lambdasContainer.length) {
      _this.logger.info('Finished installing lambda dependencies for microservice ' + (_this.name).cyan);
      return cb(null, _this);
    } else {
      return installLambdaDependencies(_this.lambdasContainer[currentLambdaIdx], installLambdaDependenciesCb);
    }
  }
};

/**
 * Achieve backend lambdas
 * @param forcePack
 * @param cb
 * @returns {*}
 */
Microservice.prototype.backendPack = function(forcePack, cb) {
  var _this    = this;
  var currentLambdaIdx = 0;

  if (typeof forcePack === 'function') {
    cb = forcePack;
    forcePack = false;
  }

  _this.logger.info('Start  packing lambdas for ' + (_this.name).cyan + ' microservice');

  if (forcePack) {
    _this.logger.info('Using forced packing');
  }

  if (!_this.lambdasContainer.length) {
    _this.logger.info('No lambdas found for ' + (_this.name).cyan + '. Skipping lambda packing ⛷   ');
    return cb(null, _this);
  }

  return packLambda(_this.lambdasContainer[currentLambdaIdx], packLambdaCb);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function packLambda(lambda, cb) {

    _this.logger.info('Start packing ' + lambda.fullName);

    _this.logger.trace('Retrieving lambda checksum');

    lambda.requiresRebuild(function(err, requiresRebuild) {
      if (!err && !requiresRebuild && !forcePack) {
        _this.logger.warn('No changes in ' + lambda.fullName + '. Skipping lambda packing ⛷   ');
        return cb(null, _this);
      }

      return lambda.pack(function(err) {
        if (err) {
          _this.logger.error(err);
        } else {
          _this.logger.info('Finished packing ' + lambda.fullName);
        }

        return cb(err, _this);
      });
    });
  }

  function packLambdaCb() {
    currentLambdaIdx += 1;

    if (currentLambdaIdx === _this.lambdasContainer.length) {
      _this.logger.info('Finished packing lambdas for microservice ' + (_this.name).cyan);
      return cb(null, _this);
    } else {
      return packLambda(_this.lambdasContainer[currentLambdaIdx], packLambdaCb);
    }
  }
};

Microservice.prototype.frontendInstall = function(cb) {
  var _this = this;

  _this.logger.info('Start installing frontend dependencies for ' + (_this.name).cyan);

  var currentPath = process.cwd();
  process.chdir(_this.microServiceFrontendAppPath);

  //Triggering PRE|POST install hooks. Developers should set their commands in their corresponding FE packages
  var npmCommand = 'npm install';

  shell.exec(npmCommand, {silent: !_this.verbose}, function(err, stdout) {
    _this.logger.trace(stdout);

    if (err) {
      _this.logger.error(err);
    } else {
      _this.logger.info('Finished installing dependencies for ' + (_this.name).cyan);
    }

    process.chdir(currentPath);

    return cb(err, _this);
  })
    .stderr.on('data', function(data) {
      _this.logger.error(data);
    });
};

Microservice.prototype.frontendPack = function(cb) {
  var _this = this;

  _this.logger.warn('Nothing to do here');

  //Frontend build for now will be as a hook in post-install
  return cb(null, _this);
};
