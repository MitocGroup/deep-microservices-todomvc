/*jshint bitwise: false*/

/**
 * Created by vcernomschi on 6/20/16.
 */

'use strict';
import combine from 'istanbul-combine';
import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import nodeDir from 'node-dir';
import S3CoverageSynchronizer from './S3CoverageSynchronizer';
import GitHubMsgPublisher from './GitHubMsgPublisher';

export default class CoverageComparator {

  /**
   * @param {String} pathToAccess
   * @returns {boolean}
   */
  static accessSync(pathToAccess) {
    try {
      fs.accessSync(pathToAccess, fs.F_OK | fs.R_OK | fs.W_OK);
      return true;
    } catch (exception) {
      return false;
    }
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get LOCAL_COVERAGE_FULL_PATH() {
    return path.join(__dirname, `../../../${CoverageComparator.LOCAL_COVERAGE_SUMMARY_DIR}/coverage-summary.json`);
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get S3_COVERAGE_FULL_PATH() {
    return path.join(__dirname, `../../../${CoverageComparator.S3_COVERAGE_SUMMARY_DIR}/coverage-summary.json`);
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get REPORT_PREFIX() {
    return `${process.env['TRAVIS_REPO_SLUG']}/${process.env['TRAVIS_BRANCH']}/`;
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get LOCAL_COVERAGE_DIR() {
    return `bin/coverages/local/${CoverageComparator.REPORT_PREFIX}`;
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get S3_COVERAGE_DIR() {
    return `bin/coverages/aws/${CoverageComparator.REPORT_PREFIX}`;
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get LOCAL_COVERAGE_PATTERN() {
    return `${CoverageComparator.LOCAL_COVERAGE_DIR}**/coverage.json`;
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get S3_COVERAGE_PATTERN() {
    return `${CoverageComparator.S3_COVERAGE_DIR}**/coverage.json`;
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get LOCAL_COVERAGE_SUMMARY_DIR() {
    return `${CoverageComparator.LOCAL_COVERAGE_DIR}summary-report`;
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get S3_COVERAGE_SUMMARY_DIR() {
    return `${CoverageComparator.S3_COVERAGE_DIR}summary-report`;
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get LOCAL_COVERAGES_PATH() {
    return path.join(__dirname, '../../coverages/local');
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get S3_COVERAGES_PATH() {
    return path.join(__dirname, '../../coverages/aws');
  }

  /**
   * @returns {String}
   * @constructor
   */
  static get GIT_REPO_NAME() {
    return process.env['TRAVIS_REPO_SLUG'].replace(/.*\/(.*)/i, '$1');
  }

  /**
   * @param {String} coverageDir - output directory for combined report(s)
   * @param {String} pattern - pattern to find json reports to be combined
   * @returns {Object}
   */
  static getOptions(coverageDir, pattern) {

    return {
      dir: coverageDir,
      pattern: pattern,
      reporters: {
        lcovonly: {},
        'json-summary': {},
      },
      base: '../../../',
    };
  }

  /**
   * Synchronous method to combine coverage reports
   * @param {String} coverageDir - output directory for combined report(s)
   * @param {String} pattern - pattern to find json reports to be combined
   * @returns {Number}
   */
  static combineSync(coverageDir, pattern) {

    combine.sync(CoverageComparator.getOptions(coverageDir, pattern));

    let result = (CoverageComparator.accessSync(CoverageComparator.LOCAL_COVERAGE_FULL_PATH)) ?
      JSON.parse(fs.readFileSync(CoverageComparator.LOCAL_COVERAGE_FULL_PATH, 'utf8')).total.lines.pct :
      0;

    return result;
  }

  /**
   * Return frontend coverage report folder if exists or current directory
   * @param {String} srcPath
   * @returns {String}
   */
  static getCoverageDirectory(srcPath) {

    if (CoverageComparator.accessSync(srcPath)) {
      return fs.readdirSync(srcPath).filter((file) => {
        return CoverageComparator.accessSync(path.join(srcPath, file, 'coverage-final.json'));
      })[0];
    }

    return './';
  }

  /**
   * @param {Function} callback
   */
  static gatherReports(callback) {

    CoverageComparator.getMicroAppPaths((error, microAppPathsArray) => {

      if (error) {
        console.log(error);
        throw error;
      }

      for (let microAppPath of microAppPathsArray) {

        let backendCoveragePath = path.join(microAppPath, 'tests/backend/coverage/coverage.json');
        let frontendCoverageDir = CoverageComparator.getCoverageDirectory(
          path.join(microAppPath, 'tests/frontend/coverage/')
        );
        let frontendCoveragePath = path.join(
          microAppPath,
          `tests/frontend/coverage/${frontendCoverageDir}/coverage-final.json`
        );
        let microAppName = microAppPath.replace(/.+\/src\/(.+)\//i, '$1');

        if (CoverageComparator.accessSync(backendCoveragePath)) {
          let backendDestPath = path.join(
            CoverageComparator.LOCAL_COVERAGES_PATH,
            process.env['TRAVIS_REPO_SLUG'],
            process.env['TRAVIS_BRANCH'],
            microAppName,
            'backend/coverage.json'
          );
          fsExtra.ensureFileSync(backendDestPath);
          fsExtra.copySync(backendCoveragePath, backendDestPath, {
            clobber: true,
          });
        }

        if (frontendCoverageDir !== './' && CoverageComparator.accessSync(frontendCoveragePath)) {

          let frontendDestPath = path.join(
            CoverageComparator.LOCAL_COVERAGES_PATH,
            process.env['TRAVIS_REPO_SLUG'],
            process.env['TRAVIS_BRANCH'],
            microAppName,
            'frontend/coverage.json'
          );

          fsExtra.ensureFileSync(frontendDestPath);
          fsExtra.copySync(frontendCoveragePath, frontendDestPath, {
            clobber: true,
          });
        }
      }

      callback(null, null);
    })
  }

  /**
   * @param {Function} callback
   */
  static getMicroAppPaths(callback) {

    let sourcePath = path.join(__dirname, '../../../src/');
    let microAppBackendPaths = [];

    if (CoverageComparator.accessSync(sourcePath)) {

      // match only filenames resources.json
      nodeDir.readFiles(sourcePath, {
          match: /resources\.json$/,
          exclude: /^\./,
          excludeDir: ['frontend', 'node_modules', 'docs', 'data', 'tests'],
        }, (err, content, next) => {
          if (err) {
            callback(err, null);
          }

          next();
        },
        (err, files) => {
          if (err) {
            callback(err, null);
          }

          microAppBackendPaths = files.map((file) => {
            return file.replace(/backend\/resources.json/i, '');
          });

          callback(null, microAppBackendPaths);
        }
      );
    }
  }
}
