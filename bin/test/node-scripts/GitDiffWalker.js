/**
 * Created by vcernomschi on 5/16/16.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GitDiffWalker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _syncExec = require('sync-exec');

var _syncExec2 = _interopRequireDefault(_syncExec);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _S3CoverageSynchronizer = require('./S3CoverageSynchronizer');

var _S3CoverageSynchronizer2 = _interopRequireDefault(_S3CoverageSynchronizer);

var _GitHubMsgPublisher = require('./GitHubMsgPublisher');

var _GitHubMsgPublisher2 = _interopRequireDefault(_GitHubMsgPublisher);

var _CoverageComparator = require('./CoverageComparator');

var _CoverageComparator2 = _interopRequireDefault(_CoverageComparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
let GitDiffWalker = exports.GitDiffWalker = function () {
  _createClass(GitDiffWalker, [{
    key: 'getAllMicroAppPath',
    value: function getAllMicroAppPath(srcPath) {

      if (!_CoverageComparator2.default.accessSync(srcPath)) {
        return [];
      }

      return _fs2.default.readdirSync(srcPath).filter(function (file) {
        return GitDiffWalker.getFullPath(_fs2.default.statSync(_path2.default.join(srcPath, file)).isDirectory());
      });
    }

    /**
     *
     */

  }], [{
    key: 'removeDuplicates',
    value: function removeDuplicates() {
      let result = [];

      for (let i = 0; i < arguments.length; i++) {

        let _argument = arguments[i].toString().split(',');

        for (let j = 0; j < _argument.length; j++) {
          if (result.indexOf(_argument[j]) === -1) {
            result.push(_argument[j]);
          }
        }
      }

      return result.join(',');
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'getAllChangedFiles',


    /**
     * @returns {String}
     */
    value: function getAllChangedFiles() {

      console.log(`Run command: ${ GitDiffWalker.CMD } for cwd: ${ GitDiffWalker.CWD }`);

      let result = (0, _syncExec2.default)(GitDiffWalker.CMD, {
        cwd: GitDiffWalker.CWD
      });

      console.log('Changed files: ', result.stdout.toString().trim());

      return parseInt(result.status) !== 0 ? `Command '${ GitDiffWalker.CMD }' failed in '${ GitDiffWalker.CWD }' with exit code ${ result.status }` : result.stdout.toString().trim();
    }
  }, {
    key: 'TARGET_BRANCH',


    /**
     * @returns {String}
     * @constructor
     */
    get: function get() {
      console.log('TRAVIS_BRANCH: ', process.env['TRAVIS_BRANCH']);
      return process.env['TRAVIS_BRANCH'];
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'CMD',
    get: function get() {
      return process.env['PR_MERGE'] === 'true' ? 'git diff --name-only @~..@' : `git diff --name-only ${ GitDiffWalker.TARGET_BRANCH }`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'NONE',
    get: function get() {
      return 'none';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'FULL_CI_RUN',
    get: function get() {
      return '[ci full]';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'SRC',
    get: function get() {
      return 'src';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'FRONTEND_MICROAPP_PATHS',
    get: function get() {
      return 'FRONTEND_MICROAPP_PATHS';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'BACKEND_MICROAPP_PATHS',
    get: function get() {
      return 'BACKEND_MICROAPP_PATHS';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'BACKEND_MICROAPP_IDENTIFIERS',
    get: function get() {
      return 'BACKEND_MICROAPP_IDENTIFIERS';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'CI_FULL',
    get: function get() {
      return 'CI_FULL';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'IS_SKIP_TESTS',
    get: function get() {
      return 'IS_SKIP_TESTS';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'DEEPKG_JSON',
    get: function get() {
      return 'deepkg.json';
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'CWD',
    get: function get() {
      return _path2.default.join(__dirname, '../../..');
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'VARS_SHELL_PATH',
    get: function get() {
      return _path2.default.join(__dirname, '../_vars.sh');
    }
  }, {
    key: 'TEST_PATHS_TPL',
    get: function get() {
      let content = [];

      content.push('#!\/bin\/bash');
      content.push('');
      content.push(`${ GitDiffWalker.FRONTEND_MICROAPP_PATHS }="{frontendMicroAppPaths}"`);
      content.push(`${ GitDiffWalker.BACKEND_MICROAPP_PATHS }="{backendMicroAppPaths}"`);
      content.push(`${ GitDiffWalker.BACKEND_MICROAPP_IDENTIFIERS }="{backendMicroAppIdentifiers}"`);
      content.push(`${ GitDiffWalker.CI_FULL }="{ciFull}"`);
      content.push(`${ GitDiffWalker.IS_SKIP_TESTS }="{isSkipTests}"`);
      content.push('');

      return content.join(_os2.default.EOL);
    }

    /**
     * @returns {String}
     */

  }, {
    key: 'commitMessage',
    get: function get() {
      return process.env['TRAVIS_COMMIT_MESSAGE'];
    }
  }]);

  function GitDiffWalker() {
    _classCallCheck(this, GitDiffWalker);

    this._files = GitDiffWalker.getAllChangedFiles().split('\n');

    this._allMicroAppPaths = this.getAllMicroAppPaths(_path2.default.join(__dirname, '../../..', GitDiffWalker.SRC));
    this._allMicroAppIdentifiers = this.getAllMicroAppIdentifiers();

    this.getBackendMicroAppPaths();
    this.getBackendTestMicroAppPaths();
    this.getBackendCodeMicroAppPaths();
    this.getFrontendMicroAppPaths();
  }

  /**
   * @returns {String[]}
   */


  _createClass(GitDiffWalker, [{
    key: 'getFullPath',


    /**
     * @returns {String[]}
     */
    value: function getFullPath(name) {
      return _path2.default.join(__dirname, '../../..', GitDiffWalker.SRC, name);
    }

    /**
     * @param srcpath
     * @returns {String[]}
     */

  }, {
    key: 'getAllMicroAppPaths',
    value: function getAllMicroAppPaths(srcPath) {

      if (!_CoverageComparator2.default.accessSync(srcPath)) {
        return [];
      }

      return _fs2.default.readdirSync(srcPath).filter(file => {
        return _fs2.default.statSync(_path2.default.join(srcPath, file)).isDirectory();
      });
    }

    /**
     * Get changed microapplication identifiers from deepkg.json where were changed code or backend tests
     * @returns {String[]}
     */

  }, {
    key: 'getAllMicroAppIdentifiers',
    value: function getAllMicroAppIdentifiers() {
      let indentifiers = [];

      for (let microAppPath of this._allMicroAppPaths) {

        let microAppFullPath = this.getFullPath(microAppPath);

        if (!_CoverageComparator2.default.accessSync(microAppFullPath)) {
          continue;
        }

        let content = _fsExtra2.default.readJsonSync(_path2.default.join(microAppFullPath, GitDiffWalker.DEEPKG_JSON), { throws: false });

        indentifiers.push(content.identifier);
      }

      return indentifiers;
    }

    /**
     * @returns {boolean}
     */

  }, {
    key: 'isFullCIRun',


    /**
     * Returns as first argument in callback boolean result if is full ci
     * @param {Function} callback
     */
    value: function isFullCIRun(callback) {
      if (_GitHubMsgPublisher2.default.isPullRequest) {
        callback(GitDiffWalker.isFullCIRunSync);
      } else {
        let params = {
          Bucket: _S3CoverageSynchronizer2.default.BUCKET_NAME,
          Key: `${ _S3CoverageSynchronizer2.default.REPORT_PREFIX }summary-report/coverage-summary.json`
        };

        let s3 = new _awsSdk2.default.S3({});

        s3.headObject(params, function (err) {
          if (err) {
            callback(true);
          } else {
            callback(GitDiffWalker.isFullCIRunSync);
          }
        });
      }
    }

    /**
     * @returns {boolean}
     */

  }, {
    key: 'getFrontendMicroAppPaths',


    /**
     * Get changed microapplication paths where were changed frontend
     * @returns {String[]}
     */
    value: function getFrontendMicroAppPaths() {
      let re = /^src\/(.+)\/frontend\/.+$/i;
      let paths = [];

      for (let file of this.files) {

        if (re.test(file)) {

          let fullPath = this.getFullPath(file.replace(re, '$1').replace(/(\/|\\).+/, ''));

          if (paths.indexOf(fullPath) === -1) {
            paths.push(fullPath);
          }
        }
      }

      this._frontendMicroAppPaths = paths;

      return paths;
    }

    /**
     * Get changed microapplication paths where were changed frontend
     * @returns {String[]}
     */

  }, {
    key: 'getFrontendMicroAppNames',
    value: function getFrontendMicroAppNames() {
      let names = [];

      for (let file of this._frontendMicroAppPaths) {

        names.push(file.substring(file.lastIndexOf(_path2.default.sep) + 1));
      }

      this._frontendMicroAppNames = names;

      return names;
    }

    /**
     * Get changed microapplication paths where were changed backend code or backend tests
     * @returns {String[]}
     */

  }, {
    key: 'getBackendMicroAppPaths',
    value: function getBackendMicroAppPaths() {
      let re = /^src\/(.+)\/(backend|data)\/.+$/i;
      let paths = [];

      for (let file of this.files) {

        if (re.test(file)) {

          let fullPath = this.getFullPath(file.replace(re, '$1').replace(/(\/|\\).+/, ''));

          if (paths.indexOf(fullPath) === -1) {
            paths.push(fullPath);
          }
        }
      }

      this._backendMicroAppPaths = paths;

      return paths;
    }

    /**
     * Get changed microapplication paths where were changed only backend tests
     * @returns {String[]}
     */

  }, {
    key: 'getBackendTestMicroAppPaths',
    value: function getBackendTestMicroAppPaths() {
      let re = /^src\/(.+)\/tests\/backend\/.+$/i;
      let paths = [];

      for (let file of this.files) {

        if (re.test(file)) {

          let fullPath = this.getFullPath(file.replace(re, '$1').replace(/(\/|\\).+/, ''));

          if (paths.indexOf(fullPath) === -1) {
            paths.push(fullPath);
          }
        }
      }

      this._backendTestMicroAppPaths = paths;

      return paths;
    }

    /**
     * Get changed microapplication paths where were changed only backend code
     * @returns {String[]}
     */

  }, {
    key: 'getBackendCodeMicroAppPaths',
    value: function getBackendCodeMicroAppPaths() {
      let testsRe = /^src\/(.+)\/tests\/backend\/.+$/i;
      let re = /^src\/(.+)\/(backend|data)\/.+$/i;

      let paths = [];

      for (let file of this.files) {

        if (!testsRe.test(file) && re.test(file)) {
          let fullPath = this.getFullPath(file.replace(re, '$1').replace(/(\/|\\).+/, ''));

          if (paths.indexOf(fullPath) === -1) {
            paths.push(fullPath);
          }
        }
      }

      this._backendCodeMicroAppPaths = paths;

      return paths;
    }

    /**
     * Get changed microapplication identifiers from deepkg.json where were changed code or backend tests
     * @returns {String[]}
     */

  }, {
    key: 'getBackendMicroAppIdentifiers',
    value: function getBackendMicroAppIdentifiers() {
      let indentifiers = [];
      let microAppPaths = this._backendMicroAppPaths;

      for (let microAppPath of microAppPaths) {

        let microAppFullPath = this.getFullPath(microAppPath);

        if (!_CoverageComparator2.default.accessSync(microAppFullPath)) {
          continue;
        }

        let content = _fsExtra2.default.readJsonSync(_path2.default.join(microAppFullPath, GitDiffWalker.DEEPKG_JSON), { throws: false });

        indentifiers.push(content.identifier);
      }

      this._backendMicroAppIdentifiers = indentifiers;

      return indentifiers;
    }

    /**
     * Get changed microapplication names where were changed backend code or backend tests
     * @returns {String[]}
     */

  }, {
    key: 'getBackendMicroAppNames',
    value: function getBackendMicroAppNames() {
      let names = [];

      for (let file of this._backendMicroAppPaths) {

        names.push(file.substring(file.lastIndexOf(_path2.default.sep) + 1));
      }

      this._backendMicroAppNames = names;

      return names;
    }

    /**
     * Get changed microapplication names where were changed backend code
     * @returns {String[]}
     */

  }, {
    key: 'getBackendCodeMicroAppNames',
    value: function getBackendCodeMicroAppNames() {
      let names = [];

      for (let file of this._backendCodeMicroAppPaths) {

        names.push(file.substring(file.lastIndexOf(_path2.default.sep) + 1));
      }

      this._backendCodeMicroAppNames = names;

      return names;
    }

    /**
     * Get changed microapplication names where were changed backend tests
     * @returns {String[]}
     */

  }, {
    key: 'getBackendTestMicroAppNames',
    value: function getBackendTestMicroAppNames() {
      let names = [];

      for (let file of this._backendTestMicroAppPaths) {

        names.push(file.substring(file.lastIndexOf(_path2.default.sep) + 1));
      }

      this._backendTestMicroAppNames = names;

      return names;
    }
  }, {
    key: 'setTestPaths',
    value: function setTestPaths() {

      let backendMicroAppPaths = GitDiffWalker.NONE;
      let frontendMicroAppPaths = GitDiffWalker.NONE;
      let backendMicroAppIdentifiers = GitDiffWalker.NONE;

      if (this.isFrontedCodeChanged || this.isFrontendTestsChanged) {
        frontendMicroAppPaths = this.getFrontendMicroAppNames();
      }

      if (this.isBackendTestsChanged || this.isBackendCodeChanged) {
        backendMicroAppPaths = this.getBackendMicroAppNames();

        //changes backend code and frontend, need to remove duplicates
        if (this.isBackendCodeChanged && typeof this._frontendMicroAppNames !== 'undefined' && this._frontendMicroAppNames.length > 0) {
          frontendMicroAppPaths = GitDiffWalker.removeDuplicates(this.getFrontendMicroAppNames(), this.getBackendCodeMicroAppNames());
        } else if (this.isBackendCodeChanged) {
          frontendMicroAppPaths = this.getBackendCodeMicroAppNames();
        }

        backendMicroAppIdentifiers = this.getBackendMicroAppIdentifiers();
      }

      this.isFullCIRun(isFullCIRun => {

        if (isFullCIRun) {
          frontendMicroAppPaths = backendMicroAppPaths = this._allMicroAppPaths;
          backendMicroAppIdentifiers = this._allMicroAppIdentifiers;
        }

        let varsContent = GitDiffWalker.TEST_PATHS_TPL.replace(/\{frontendMicroAppPaths\}/g, frontendMicroAppPaths).replace(/\{backendMicroAppPaths\}/g, backendMicroAppPaths).replace(/\{backendMicroAppIdentifiers\}/g, backendMicroAppIdentifiers).replace(/\{ciFull\}/g, isFullCIRun).replace(/\{isSkipTests\}/g, `${ this.isSkipTests && !isFullCIRun }`);

        _fsExtra2.default.writeFileSync(GitDiffWalker.VARS_SHELL_PATH, varsContent, 'utf8');

        console.log("TRAVIS_COMMIT_MESSAGE: ", GitDiffWalker.commitMessage);
        console.log(`isFullCIRun: ${ isFullCIRun }`);
        console.log(`isSkipTests: ${ this.isSkipTests && !isFullCIRun }`);
        console.log(`isFrontedCodeChanged: ${ this.isFrontedCodeChanged }`);
        console.log(`isFrontendTestsChanged: ${ this.isFrontendTestsChanged }`);
        console.log(`isBackendCodeChanged: ${ this.isBackendCodeChanged }`);
        console.log(`isBackendTestsChanged: ${ this.isBackendTestsChanged }`);

        console.log(`frontend paths: ${ this.getFrontendMicroAppPaths() }`);
        console.log(`frontend names: ${ this.getFrontendMicroAppNames() }`);

        console.log(`backend all paths: ${ this.getBackendMicroAppPaths() }`);
        console.log(`backend tests paths: ${ this.getBackendTestMicroAppPaths() }`);
        console.log(`backend code paths: ${ this.getBackendCodeMicroAppPaths() }`);
        console.log(`backend identifiers: ${ this.getBackendMicroAppIdentifiers() }`);
        console.log(`backend all names: ${ this.getBackendMicroAppNames() }`);
        console.log(`backend tests names: ${ this.getBackendTestMicroAppNames() }`);
        console.log(`backend code names: ${ this.getBackendCodeMicroAppNames() }`);
      });
    }
  }, {
    key: 'files',
    get: function get() {
      return this._files;
    }
  }, {
    key: 'isSkipTests',
    get: function get() {
      let re = /^(?!src\/).+|(.+\/docs\/.+)/i;

      for (let file of this.files) {

        if (!re.test(file)) {
          return false;
        }
      }

      return true;
    }

    /**
     * Check is full CI without for PR and !PR when coverage exists in S3
     * @returns {boolean}
     */

  }, {
    key: 'isFrontedCodeChanged',
    get: function get() {
      let testsRe = /^src\/(.+)\/tests\/frontend\/.+$/i;
      let re = /^src\/(.+)\/frontend\/.+$/i;

      for (let file of this.files) {

        if (!testsRe.test(file) && re.test(file)) {
          return true;
        }
      }

      return false;
    }

    /**
     * @returns {boolean}
     */

  }, {
    key: 'isFrontendTestsChanged',
    get: function get() {
      let re = /^src\/(.+)\/tests\/frontend\/.+$/i;

      for (let file of this.files) {

        if (re.test(file)) {
          return true;
        }
      }

      return false;
    }

    /**
     * @returns {boolean}
     */

  }, {
    key: 'isBackendTestsChanged',
    get: function get() {
      let re = /^src\/(.+)\/tests\/backend\/.+$/i;

      for (let file of this.files) {

        if (re.test(file)) {
          return true;
        }
      }

      return false;
    }

    /**
     * @returns {boolean}
     */

  }, {
    key: 'isBackendCodeChanged',
    get: function get() {
      let testsRe = /^src\/(.+)\/tests\/backend\/.+$/i;
      let re = /^src\/(.+)\/(backend|data)\/.+$/i;

      for (let file of this.files) {

        if (!testsRe.test(file) && re.test(file)) {
          return true;
        }
      }

      return false;
    }
  }], [{
    key: 'isFullCIRunSync',
    get: function get() {
      return typeof process.env['MAJOR_VERSIONS'] !== 'undefined' && process.env['MAJOR_VERSIONS'].indexOf(GitDiffWalker.TARGET_BRANCH) > -1 || typeof GitDiffWalker.commitMessage !== 'undefined' && GitDiffWalker.commitMessage.indexOf(GitDiffWalker.FULL_CI_RUN) > -1;
    }
  }]);

  return GitDiffWalker;
}();

let walker = new GitDiffWalker();
walker.setTestPaths();

