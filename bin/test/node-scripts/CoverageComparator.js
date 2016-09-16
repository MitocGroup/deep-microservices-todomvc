/**
 * Created by vcernomschi on 6/20/16.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _istanbulCombine = require('istanbul-combine');

var _istanbulCombine2 = _interopRequireDefault(_istanbulCombine);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodeDir = require('node-dir');

var _nodeDir2 = _interopRequireDefault(_nodeDir);

var _S3CoverageSynchronizer = require('./S3CoverageSynchronizer');

var _S3CoverageSynchronizer2 = _interopRequireDefault(_S3CoverageSynchronizer);

var _GitHubMsgPublisher = require('./GitHubMsgPublisher');

var _GitHubMsgPublisher2 = _interopRequireDefault(_GitHubMsgPublisher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let CoverageComparator = function () {
  function CoverageComparator() {
    _classCallCheck(this, CoverageComparator);
  }

  _createClass(CoverageComparator, null, [{
    key: 'accessSync',


    /**
     * @param {String} pathToAccess
     * @returns {boolean}
     */
    value: function accessSync(pathToAccess) {
      try {
        _fs2.default.accessSync(pathToAccess, _fs2.default.F_OK | _fs2.default.R_OK | _fs2.default.W_OK);
        return true;
      } catch (exception) {
        return false;
      }
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'getOptions',


    /**
     * @param {String} coverageDir - output directory for combined report(s)
     * @param {String} pattern - pattern to find json reports to be combined
     * @returns {Object}
     */
    value: function getOptions(coverageDir, pattern) {

      return {
        dir: coverageDir,
        pattern: pattern,
        reporters: {
          lcovonly: {},
          'json-summary': {}
        },
        base: '../../../'
      };
    }

    /**
     * Synchronous method to combine coverage reports
     * @param {String} coverageDir - output directory for combined report(s)
     * @param {String} pattern - pattern to find json reports to be combined
     * @returns {Number}
     */

  }, {
    key: 'combineSync',
    value: function combineSync(coverageDir, pattern) {

      _istanbulCombine2.default.sync(CoverageComparator.getOptions(coverageDir, pattern));

      let result = CoverageComparator.accessSync(CoverageComparator.LOCAL_COVERAGE_FULL_PATH) ? JSON.parse(_fs2.default.readFileSync(CoverageComparator.LOCAL_COVERAGE_FULL_PATH, 'utf8')).total.lines.pct : 0;

      return result;
    }

    /**
     * Return frontend coverage report folder if exists or current directory
     * @param {String} srcPath
     * @returns {String}
     */

  }, {
    key: 'getCoverageDirectory',
    value: function getCoverageDirectory(srcPath) {

      if (CoverageComparator.accessSync(srcPath)) {
        return _fs2.default.readdirSync(srcPath).filter(file => {
          return CoverageComparator.accessSync(_path2.default.join(srcPath, file, 'coverage-final.json'));
        })[0];
      }

      return './';
    }

    /**
     * @param {Function} callback
     */

  }, {
    key: 'gatherReports',
    value: function gatherReports(callback) {

      CoverageComparator.getMicroAppPaths((error, microAppPathsArray) => {

        if (error) {
          console.log(error);
          throw error;
        }

        for (let microAppPath of microAppPathsArray) {

          let backendCoveragePath = _path2.default.join(microAppPath, 'tests/backend/coverage/coverage.json');
          let frontendCoverageDir = CoverageComparator.getCoverageDirectory(_path2.default.join(microAppPath, 'tests/frontend/coverage/'));
          let frontendCoveragePath = _path2.default.join(microAppPath, `tests/frontend/coverage/${ frontendCoverageDir }/coverage-final.json`);
          let microAppName = microAppPath.replace(/.+\/src\/(.+)\//i, '$1');

          if (CoverageComparator.accessSync(backendCoveragePath)) {
            let backendDestPath = _path2.default.join(CoverageComparator.LOCAL_COVERAGES_PATH, process.env['TRAVIS_REPO_SLUG'], process.env['TRAVIS_BRANCH'], microAppName, 'backend/coverage.json');
            _fsExtra2.default.ensureFileSync(backendDestPath);
            _fsExtra2.default.copySync(backendCoveragePath, backendDestPath, {
              clobber: true
            });
          }

          if (frontendCoverageDir !== './' && CoverageComparator.accessSync(frontendCoveragePath)) {

            let frontendDestPath = _path2.default.join(CoverageComparator.LOCAL_COVERAGES_PATH, process.env['TRAVIS_REPO_SLUG'], process.env['TRAVIS_BRANCH'], microAppName, 'frontend/coverage.json');

            _fsExtra2.default.ensureFileSync(frontendDestPath);
            _fsExtra2.default.copySync(frontendCoveragePath, frontendDestPath, {
              clobber: true
            });
          }
        }

        callback(null, null);
      });
    }

    /**
     * @param {Function} callback
     */

  }, {
    key: 'getMicroAppPaths',
    value: function getMicroAppPaths(callback) {

      let sourcePath = _path2.default.join(__dirname, '../../../src/');
      let microAppBackendPaths = [];

      if (CoverageComparator.accessSync(sourcePath)) {

        // match only filenames resources.json
        _nodeDir2.default.readFiles(sourcePath, {
          match: /resources\.json$/,
          exclude: /^\./,
          excludeDir: ['frontend', 'node_modules', 'docs', 'data', 'tests']
        }, (err, content, next) => {
          if (err) {
            callback(err, null);
          }

          next();
        }, (err, files) => {
          if (err) {
            callback(err, null);
          }

          microAppBackendPaths = files.map(file => {
            return file.replace(/backend\/resources.json/i, '');
          });

          callback(null, microAppBackendPaths);
        });
      }
    }
  }, {
    key: 'LOCAL_COVERAGE_FULL_PATH',
    get: function get() {
      return _path2.default.join(__dirname, `../../../${ CoverageComparator.LOCAL_COVERAGE_SUMMARY_DIR }/coverage-summary.json`);
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'S3_COVERAGE_FULL_PATH',
    get: function get() {
      return _path2.default.join(__dirname, `../../../${ CoverageComparator.S3_COVERAGE_SUMMARY_DIR }/coverage-summary.json`);
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'REPORT_PREFIX',
    get: function get() {
      return `${ process.env['TRAVIS_REPO_SLUG'] }/${ process.env['TRAVIS_BRANCH'] }/`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'LOCAL_COVERAGE_DIR',
    get: function get() {
      return `bin/coverages/local/${ CoverageComparator.REPORT_PREFIX }`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'S3_COVERAGE_DIR',
    get: function get() {
      return `bin/coverages/aws/${ CoverageComparator.REPORT_PREFIX }`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'LOCAL_COVERAGE_PATTERN',
    get: function get() {
      return `${ CoverageComparator.LOCAL_COVERAGE_DIR }**/coverage.json`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'S3_COVERAGE_PATTERN',
    get: function get() {
      return `${ CoverageComparator.S3_COVERAGE_DIR }**/coverage.json`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'LOCAL_COVERAGE_SUMMARY_DIR',
    get: function get() {
      return `${ CoverageComparator.LOCAL_COVERAGE_DIR }summary-report`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'S3_COVERAGE_SUMMARY_DIR',
    get: function get() {
      return `${ CoverageComparator.S3_COVERAGE_DIR }summary-report`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'LOCAL_COVERAGES_PATH',
    get: function get() {
      return _path2.default.join(__dirname, '../../coverages/local');
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'S3_COVERAGES_PATH',
    get: function get() {
      return _path2.default.join(__dirname, '../../coverages/aws');
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'GIT_REPO_NAME',
    get: function get() {
      return process.env['TRAVIS_REPO_SLUG'].replace(/.*\/(.*)/i, '$1');
    }
  }]);

  return CoverageComparator;
}();

exports.default = CoverageComparator;
module.exports = exports['default'];

