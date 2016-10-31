/**
 * Created by vcernomschi on 6/20/16.
 */

'use strict';

var _istanbulCombine = require('istanbul-combine');

var _istanbulCombine2 = _interopRequireDefault(_istanbulCombine);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _S3CoverageSynchronizer = require('./S3CoverageSynchronizer');

var _S3CoverageSynchronizer2 = _interopRequireDefault(_S3CoverageSynchronizer);

var _GitHubMsgPublisher = require('./GitHubMsgPublisher');

var _GitHubMsgPublisher2 = _interopRequireDefault(_GitHubMsgPublisher);

var _CoverageComparator = require('./CoverageComparator');

var _CoverageComparator2 = _interopRequireDefault(_CoverageComparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let s3CoverageSync = new _S3CoverageSynchronizer2.default();

s3CoverageSync.init((err, data) => {
  s3CoverageSync.downloadReportsFromS3(_S3CoverageSynchronizer2.default.BUCKET_NAME, _S3CoverageSynchronizer2.default.REPORT_PREFIX, _S3CoverageSynchronizer2.default.S3_REPORTS_PATH, () => {

    //copy s3 reports to local
    if (_CoverageComparator2.default.accessSync(_S3CoverageSynchronizer2.default.S3_REPORTS_PATH)) {
      _fsExtra2.default.copySync(_S3CoverageSynchronizer2.default.S3_REPORTS_PATH, _S3CoverageSynchronizer2.default.LOCAL_REPORTS_PATH);
    }

    _CoverageComparator2.default.gatherReports((error, data) => {
      if (error) {
        console.log(error);
        throw error;
      }

      //combine/override local coverage
      let localSumPercent = _CoverageComparator2.default.combineSync(_CoverageComparator2.default.LOCAL_COVERAGE_SUMMARY_DIR, _CoverageComparator2.default.LOCAL_COVERAGE_PATTERN);

      let s3SumPercent = _CoverageComparator2.default.accessSync(_CoverageComparator2.default.S3_COVERAGE_FULL_PATH) ? JSON.parse(_fs2.default.readFileSync(_CoverageComparator2.default.S3_COVERAGE_FULL_PATH, 'utf8')).total.lines.pct : 0;

      let gitHubMsgPublisher = new _GitHubMsgPublisher2.default();

      //add comments when applicable
      gitHubMsgPublisher.addComment(s3SumPercent, localSumPercent, err => {
        if (err) {
          console.log(err);
          return;
        }
      });

      //uploading coverage in s3 when !PR
      if (!_GitHubMsgPublisher2.default.isPullRequest) {
        s3CoverageSync.syncReportsToS3(_S3CoverageSynchronizer2.default.LOCAL_REPORTS_PATH, _S3CoverageSynchronizer2.default.BUCKET_NAME, _S3CoverageSynchronizer2.default.REPORT_PREFIX, () => {});
      }
    });
  });
});

