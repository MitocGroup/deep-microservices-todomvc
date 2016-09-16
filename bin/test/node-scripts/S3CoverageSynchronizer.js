/**
 * Created by vcernomschi on 6/20/16.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _s = require('s3');

var _s2 = _interopRequireDefault(_s);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let S3CoverageSynchronizer = function () {
  _createClass(S3CoverageSynchronizer, null, [{
    key: 'GIT_REPO_NAME',


    /**
     * @returns {String}
     * @constructor
     */
    get: function get() {
      return process.env['TRAVIS_REPO_SLUG'];
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'GIT_BRANCH',
    get: function get() {
      return process.env['TRAVIS_BRANCH'];
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'BUCKET_NAME',
    get: function get() {
      return process.env.S3_BUCKET_NAME;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'REPORT_PREFIX',
    get: function get() {
      return `${ S3CoverageSynchronizer.GIT_REPO_NAME }/${ S3CoverageSynchronizer.GIT_BRANCH }/`;
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'LOCAL_REPORTS_PATH',
    get: function get() {
      return _path2.default.join(__dirname, `../../coverages/local/${ S3CoverageSynchronizer.REPORT_PREFIX }`);
    }

    /**
     * @returns {String}
     * @constructor
     */

  }, {
    key: 'S3_REPORTS_PATH',
    get: function get() {
      return _path2.default.join(__dirname, `../../coverages/aws/${ S3CoverageSynchronizer.REPORT_PREFIX }`);
    }
  }]);

  function S3CoverageSynchronizer() {
    _classCallCheck(this, S3CoverageSynchronizer);

    this._awsS3 = new _awsSdk2.default.S3({
      region: process.env.AWS_DEFAULT_REGION
    });

    this._client = _s2.default.createClient({
      s3Client: this._awsS3
    });
  }

  /**
   * @returns {Object}
   */


  _createClass(S3CoverageSynchronizer, [{
    key: 'init',


    /**
     * Create bucket if it doesn't exists
     * @param {Function} callback
     */
    value: function init(callback) {

      let params = {
        Bucket: S3CoverageSynchronizer.BUCKET_NAME
      };

      this.awsS3.headBucket(params, (err, metadata) => {

        if (err && err.code === 'NotFound') {

          this.awsS3.createBucket(params, (err, response) => {

            if (err) {
              console.log(err);
              callback(err, null);
            }

            callback(null, response);
          });
        }
        callback(null, metadata);
      });
    }

    /**
     * Download reports from s3 to destination directory on local file system
     * @param {String} fromBucket - s3 bucket name
     * @param {String} fromPrefix - s3 prefix
     * @param {String} destPath - destination directory on local file system to sync to
     * @param {Function} callback
     */

  }, {
    key: 'downloadReportsFromS3',
    value: function downloadReportsFromS3(fromBucket, fromPrefix, destPath, callback) {

      let params = {
        localDir: destPath,
        deleteRemoved: true,
        s3Params: {
          Bucket: fromBucket,
          Prefix: fromPrefix
        }
      };

      let downloader = this.client.downloadDir(params);
      downloader.on('error', function (err) {
        console.error('unable to download:', err);
        callback(err, null);
      });
      downloader.on('progress', () => {});
      downloader.on('end', () => {
        console.log('done downloading to');
        callback(null);
      });
    }

    /**
     * Syncs reports from directory on local file system to s3
     * @param {String} sourcePath - source directory on local file system to sync from
     * @param {String} destBucket - destination s3 bucket name
     * @param {String} destPrefix - destination prefix
     * @param {Function} callback
     */

  }, {
    key: 'syncReportsToS3',
    value: function syncReportsToS3(sourcePath, destBucket, destPrefix, callback) {

      let params = {
        localDir: sourcePath,
        deleteRemoved: true,
        s3Params: {
          Bucket: destBucket,
          Prefix: destPrefix
        }
      };

      let uploader = this.client.uploadDir(params);
      uploader.on('error', function (err) {
        console.error('unable to sync:', err);
        callback(err, null);
      });
      uploader.on('progress', () => {});
      uploader.on('end', () => {
        console.log('done sync');
        callback(null, null);
      });
    }

    /**
     * Removes reports from s3
     * @param {String} bucketName - s3 bucket name
     * @param {String} prefix - s3 prefix
     * @param {Function} callback
     */

  }, {
    key: 'deleteReportsFromS3',
    value: function deleteReportsFromS3(bucketName, prefix, callback) {

      let params = {
        Bucket: bucketName,
        Prefix: prefix
      };

      let remover = this.client.deleteDir(params);
      remover.on('error', function (err) {
        console.error('unable to sync:', err);
        callback(err, null);
      });
      remover.on('progress', () => {});
      remover.on('end', () => {
        console.log('done removing');
        callback(null, null);
      });
    }
  }, {
    key: 'client',
    get: function get() {
      return this._client;
    }

    /**
     * @returns {Object}
     */

  }, {
    key: 'awsS3',
    get: function get() {
      return this._awsS3;
    }
  }]);

  return S3CoverageSynchronizer;
}();

exports.default = S3CoverageSynchronizer;
module.exports = exports['default'];

