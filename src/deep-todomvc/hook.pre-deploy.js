/**
 * Created by CCristi on 5/18/16.
 */

'use strict';

// Do not move this hook in microservices
module.exports = function(callback) {
  let microservice = this.microservice;
  let property = microservice.property;
  let config = property.config;
  let PackageManager = this.deep_package_manager;
  let FileWalker = PackageManager.Helpers_FileWalker;
  let autoload = microservice.autoload;
  let frontendPath = autoload.frontend;
  let path = require('path');
  let fileWalker = new FileWalker(FileWalker.RECURSIVE);
  let BUILD_FOLDER = autoload.constructor.BUILD_FOLDER;
  let excludeVendorFilter = val => val.indexOf(`${path.sep}vendor${path.sep}`) === -1;
  let includeJsFilter = FileWalker.matchExtensionsFilter(null, 'js');
  let filter = path => excludeVendorFilter(path) && !includeJsFilter(path);

  function ensureBuildNotExists() {
    if (path.basename(frontendPath) === BUILD_FOLDER) {
      console.log(`Removing old _build from ${frontendPath}`);

      fileWalker.remove(frontendPath);
      frontendPath = path.resolve(path.join(frontendPath, '..'));
    }
  }

  function dumpFrontendAssets() {
    let buildFrontendPath = path.join(frontendPath, BUILD_FOLDER);
    console.log(`Dumping frontend assets into ${path.join(frontendPath, BUILD_FOLDER)}`);
    fileWalker.copy(frontendPath, buildFrontendPath, filter);
  }

  if (['stage', 'prod'].indexOf(config.env.toLowerCase()) === -1) {
    console.log(`Skipping dumping frontend assets for '${config.env}' environment`);
    ensureBuildNotExists();
    callback();
    return;
  }

  ensureBuildNotExists();
  dumpFrontendAssets();
  callback();

};
