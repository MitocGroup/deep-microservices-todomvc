'use strict';

//@todo: OPTIMISATION: store selected options in cache and set them as default

require('runtimer');
require('colors');

var fs              = require('fs');
var inquirer        = require('inquirer');
var asyncWaterfall  = require('async-waterfall');
var path            = require('path');
var Microservice    = require('./mp.build/microservice');
var Log             = require('./mp.build/logger');
var DeepifyDeploy   = require('./mp.build/deepify-deploy');
var Response        = require('./mp.build/utils').Response;
var getFolderList   = require('./mp.build/utils').getFolderList;
var shelljs         = require('shelljs');

shelljs.cd('src/');
var repositoryRoot    = process.cwd();
var microservicesList = getMicroservicesList();

var defaultsFilePath = path.join(__dirname, 'mp.build', '.cached_defaults');
var cachedDefaults  = getCachedDefaults();

var DEFAULT_MICRO_SERVICES_LIST = cachedDefaults.microservice || microservicesList;
var DEFAULT_LOG_LEVEL           = cachedDefaults['log-level'] || Log.DEFAULT_LOG_LEVEL;
var DEFAULT_INSTALL_BACKEND     = (typeof cachedDefaults['install-backend'] !== 'undefined') ? cachedDefaults['install-backend'] : false;
var DEFAULT_INSTALL_FRONTEND    = (typeof cachedDefaults['install-frontend'] !== 'undefined') ? cachedDefaults['install-frontend'] : false;
var DEFAULT_PRODUCTION_FLAG     = (typeof cachedDefaults['production-flag'] !== 'undefined') ? cachedDefaults['production-flag'] : false;
var DEFAULT_FORCE_BACKEND_UPDATE = (typeof cachedDefaults['force-backend-update'] !== 'undefined') ? cachedDefaults['force-backend-update'] : false;
var DEFAULT_FORCE_BACKEND_PACK  = (typeof cachedDefaults['force-backend-pack'] !== 'undefined') ? cachedDefaults['force-backend-pack'] : false;
var DEFAULT_DEEPIFY             = cachedDefaults.deepify || false;
var DEFAULT_DEEPIFY_LOCAL       = cachedDefaults['deepify-dump-local'] || false; //path.join(repositoryRoot, '_test'); - allows skip local dump
var DEFAULT_DEEPIFY_DRY_RUN     = cachedDefaults['deepify-dry-run'] || false;

var OPT_LOG_LEVEL_MSG           = 'Debug level';
var OPT_MICROSERVICE_MSG        = 'Microservices list to build';
var OPT_INSTALL_BACKEND_MSG     = 'Build backend';
var OPT_INSTALL_FRONTEND_MSG    = 'Build frontend';
var OPT_PRODUCTION_FLAG_MSG     = 'Build backend with production flag (choose No to be able to run local server)';
var OPT_FORCE_BACKEND_UPDATE_MSG = 'Force backend dependencies update (update npm dependencies that do not have fixed version)';
var OPT_FORCE_BACKEND_PACK_MSG  = 'Force backend packing (ignores the checksum and pack all lambdas)';
var OPT_DEEPIFY_MSG             = 'Deepify selected microservices';
var OPT_DEEPIFY_LOCAL_MSG       = 'DEEPIFY: --dump-local|-l Dump built property locally into the specified directory';
var OPT_DEEPIFY_DRY_RUN_MSG     = 'DEEPIFY: --dry-run|-d Work locally, without provisioning or publishing the code and data';

var getopt = require('node-getopt').create([
  ['m', 'microservice=ARG+', OPT_MICROSERVICE_MSG + '. Eg -m MS1 -m MS2 -m MS3. Default: ' + DEFAULT_MICRO_SERVICES_LIST.join(', ')],
  ['', 'install-backend', OPT_INSTALL_BACKEND_MSG + '. Default: ' + DEFAULT_INSTALL_BACKEND],
  ['', 'install-frontend', OPT_INSTALL_FRONTEND_MSG + '. Default: ' + DEFAULT_INSTALL_FRONTEND],
  ['', 'production-flag', OPT_PRODUCTION_FLAG_MSG + '. Default: ' + DEFAULT_PRODUCTION_FLAG],
  ['', 'force-backend-update', OPT_FORCE_BACKEND_UPDATE_MSG + '. Default: ' + DEFAULT_FORCE_BACKEND_UPDATE],
  ['', 'force-backend-pack', OPT_FORCE_BACKEND_PACK_MSG + '. Default: ' + DEFAULT_FORCE_BACKEND_PACK],
  ['', 'deepify', OPT_DEEPIFY_MSG + '. Default: ' + DEFAULT_DEEPIFY],
  ['', 'deepify-dump-local', OPT_DEEPIFY_LOCAL_MSG + '. Default: ' + DEFAULT_DEEPIFY_LOCAL],
  ['', 'deepify-dry-run', OPT_DEEPIFY_DRY_RUN_MSG + '. Default: ' + DEFAULT_DEEPIFY_DRY_RUN],
  ['', 'log-level=ARG', OPT_LOG_LEVEL_MSG + '. Valid values: ' + Log.logLevels.join(', ') + '. Default: ' + Log.DEFAULT_LOG_LEVEL],
  ['h', 'help', 'Display this help']
]).bindHelp();

var opts              = getopt.parseSystem();

var interactiveMode   = (!Object.keys(opts.options).length) ? true : false;

var displayHelp       = opts.options.help ? true : false;
var deepify           = opts.options.deepify || (interactiveMode?DEFAULT_DEEPIFY:false);
var deepifyDumpLocalPath = opts.options['deepify-dump-local'] || (interactiveMode?DEFAULT_DEEPIFY_LOCAL:false);
var deepifyDryRun     = opts.options['deepify-dry-run'] || (interactiveMode?DEFAULT_DEEPIFY_DRY_RUN:false);
var microServiceList  = opts.options.microservice || (interactiveMode?DEFAULT_MICRO_SERVICES_LIST:[]);
var installBackend    = opts.options['install-backend'] || (interactiveMode?DEFAULT_INSTALL_BACKEND:false);
var installFrontend   = false;//opts.options['install-frontend'] || (interactiveMode?DEFAULT_INSTALL_FRONTEND:false);
var productionFlag    = opts.options['production-flag']  || (interactiveMode?DEFAULT_PRODUCTION_FLAG:false);
var forceBackendUpdate = opts.options['force-backend-update'] || (interactiveMode?DEFAULT_FORCE_BACKEND_UPDATE:false);
var forceBackendPack  = opts.options['force-backend-pack'] || (interactiveMode?DEFAULT_FORCE_BACKEND_PACK:false);
var logLevel          = opts.options['log-level'] || DEFAULT_LOG_LEVEL;

if (!interactiveMode) {
  var errors = validateGetOptions();

  if (errors.length) {
    var response   = new Response(new Log(logLevel));

    return response.fail('\n' + errors.join('\n'));
  } else {
    return processRequest();
  }

} else {
  return promptOptions(processRequest);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCachedDefaults() {
  if (!fs.existsSync(defaultsFilePath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(defaultsFilePath, {encoding: 'utf8'}));
  } catch (e) {return {};}
}

function setCachedDefaults(o) {
  var data = '';
  try {data = JSON.stringify(o);} catch (e) {return false;}

  fs.writeFileSync(defaultsFilePath, data);

  return true;
}

function getMicroservicesList() {
  var folderList = [];

  getFolderList(repositoryRoot).forEach(function(val) {
    var v = path.basename(val);
    if (v.indexOf('Deep') === 0) {
      folderList.push(v);
    }
  });

  return folderList;
}

function validateGetOptions() {
  var errors = [];

  if (!opts.options.microservice || !opts.options.microservice.length) {
    errors.push(new Error('Microservices list should not be empty'));
  } else {
    opts.options.microservice.forEach(function(msName) {
      if (microservicesList.indexOf(msName) === -1) {
        errors.push(new Error(msName + ' is not a valid microservice name'));
      }
    });
  }

  if (!opts.options.deepify && !opts.options['install-backend'] && !opts.options['install-backend']) {
    errors.push(new Error('Ambiguous options received please choose either to deploy or build'));
  }

  return errors;
}

function promptOptions(cb) {
  var questions = [{
    type: 'checkbox',
    name: 'microservice',
    message: OPT_MICROSERVICE_MSG,
    choices: microservicesList,
    default: DEFAULT_MICRO_SERVICES_LIST,
    validate: function(msList) {
      if (!msList.length) {
        return 'Please select at least one microservice';
      }

      return true;
    }
  }, {
    type: 'confirm',
    name: 'install-backend',
    message: OPT_INSTALL_BACKEND_MSG,
    default: DEFAULT_INSTALL_BACKEND
  }, {
    type: 'confirm',
    name: 'production-flag',
    message: OPT_PRODUCTION_FLAG_MSG,
    default: DEFAULT_PRODUCTION_FLAG,
    when: function(answers) {return (answers['install-backend']);}
  }, {
    type: 'confirm',
    name: 'force-backend-update',
    message: OPT_FORCE_BACKEND_UPDATE_MSG,
    default: DEFAULT_FORCE_BACKEND_UPDATE,
    when: function(answers) {return (answers['install-backend']);}
  }, {
    type: 'confirm',
    name: 'force-backend-pack',
    message: OPT_FORCE_BACKEND_PACK_MSG,
    default: DEFAULT_FORCE_BACKEND_PACK,
    when: function(answers) {return (answers['install-backend']);}
  },
  //  {
  //  type: 'confirm',
  //  name: 'install-frontend',
  //  message: OPT_INSTALL_FRONTEND_MSG,
  //  default: DEFAULT_INSTALL_FRONTEND
  //},
    {
    type: 'confirm',
    name: 'deepify',
    message: OPT_DEEPIFY_MSG,
    default: DEFAULT_DEEPIFY
  }, {
    type: 'input',
    name: 'deepify-dump-local',
    message: OPT_DEEPIFY_LOCAL_MSG,
    default: DEFAULT_DEEPIFY_LOCAL,
    when: function(answers) {
      return (answers.deepify);
    },
    validate: function(dumpPath) {
      if (!dumpPath) {
        return true; //Allow to skip dumping of code locally
      }

      if (!fs.existsSync(dumpPath)) {
        return dumpPath + ' does not exits. Make sure the dump path exits and is writable';
      }

      return true;
    }
  }, {
    type: 'confirm',
    name: 'deepify-dry-run',
    message: OPT_DEEPIFY_DRY_RUN_MSG,
    default: DEFAULT_DEEPIFY_DRY_RUN,
    when: function(answers) {return (answers.deepify);}
  }, {
    type: 'list',
    name: 'log-level',
    message: OPT_LOG_LEVEL_MSG,
    choices: Log.logLevels,
    default: DEFAULT_LOG_LEVEL
  }];

  return inquirer.prompt(questions, function(answers) {
    deepify           = answers.deepify;
    microServiceList  = answers.microservice;
    installBackend    = answers['install-backend'];
    installFrontend   = answers['install-frontend'];
    forceBackendUpdate = answers['force-backend-update'];
    forceBackendPack  = answers['force-backend-pack'];
    logLevel          = answers['log-level'];
    deepifyDryRun     = (deepify ? answers['deepify-dry-run'] : deepifyDryRun);
    deepifyDumpLocalPath = (deepify ? answers['deepify-dump-local'] : deepifyDumpLocalPath);
    productionFlag = answers['production-flag'];

    setCachedDefaults(answers);

    return cb(null, answers);
  });
}

function processRequest() {

  if (displayHelp) {
    getopt.emit('help');
    process.exit();
  }

  var currentMicroserviceIdx  = 0;
  var logger                  = new Log(logLevel);
  var response                = new Response(logger);
  var currentDirectory        = process.cwd();

  return processMicroservice(currentMicroserviceIdx);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function processMicroservice(idx) {
    var microServiceName = microServiceList[idx];
    var ms    = new Microservice(microServiceName, currentDirectory, logger);
    var tasks = [backendInstall, backendPack];

    return asyncWaterfall(tasks, microServiceProcessed);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function backendInstall(cb) {
      if (installBackend) {
        printBanner('Install ' + (ms.name).bold + ' backend dependencies');
        return ms.backendInstall(forceBackendUpdate, productionFlag, cb);
      } else {
        logger.info('Skip ' + (ms.name).bold + ' backend dependencies install');
        return cb(null, ms);
      }
    }

    function backendPack(ms, cb) {
      if (installBackend) {
        printBanner('Pack ' + (ms.name).bold + ' backend');
        return ms.backendPack(forceBackendPack, cb);
      } else {
        logger.info('Skip ' + (ms.name).bold + ' backend pack');
        return cb(null, ms);
      }
    }

    function frontendInstall(ms, cb) {
      if (installFrontend) {
        printBanner('Install ' + (ms.name).bold + ' frontend dependencies');
        return ms.frontendInstall(cb);
      } else {
        logger.info('Skip ' + (ms.name).bold + ' frontend dependencies install');
        return cb(null, ms);
      }
    }

    function frontendPack(ms, cb) {
      if (installFrontend) {
        printBanner('Build ' + (ms.name).bold + ' frontend');
        return ms.frontendPack(cb);
      } else {
        logger.info('Skip ' + (ms.name).bold + ' frontend build');
        return cb(null, ms);
      }
    }
  }

  function microServiceProcessed() {
    currentMicroserviceIdx += 1;

    if (microServiceList.length === currentMicroserviceIdx) {

      var message = 'Build finished';

      if (!deepify) {
        return response.succeed(message);
      } else {
        return invokeDeepify(microServiceList);
      }
    } else {
      return processMicroservice(currentMicroserviceIdx);
    }
  }

  function invokeDeepify(microServiceList) {
    printBanner('Preparing for deepify');

    logger.info('Creating temporary property path');
    var options = {};

    if (deepifyDryRun) {
      options['dry-run'] = deepifyDryRun;
    }

    if (deepifyDumpLocalPath) {
      options['dump-local'] = deepifyDumpLocalPath;
    }

    var deepifyInstance = new DeepifyDeploy(microServiceList, logger);

    deepifyInstance
      .setOptions(options)
      .registerFileFilterPattern(/node_modules/, false)
      .deepify(function(err) {
        if (err) {
          return response.fail(err);
        } else {
          return response.succeed();
        }
      });
  }

  function printBanner(str) {
    var bannerSize = 80;
    var tabSize = parseInt((bannerSize - str.length) / 2);

    if (str.length > bannerSize) {
      console.log('\n');
      return logger.info(str);
    }

    console.log('\n');
    logger.info(new Array(tabSize).join('=') +
      ' ' +
      str +
      ' ' +
      new Array(tabSize).join('='));
  }
}
