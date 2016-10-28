/**
 * Created by vcernomschi on 6/17/16.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let GitHubMsgPublisher = function () {
  _createClass(GitHubMsgPublisher, null, [{
    key: 'isPullRequest',


    /**
     * @returns {string}
     * @constructor
     */
    get: function get() {
      let pullRequest = process.env['TRAVIS_PULL_REQUEST'];

      return pullRequest !== 'false' || !isNaN(pullRequest);
    }

    /**
     * @returns {string}
     * @constructor
     */

  }, {
    key: 'gitPRNumber',
    get: function get() {
      return process.env['TRAVIS_PULL_REQUEST'];
    }

    /**
     * @returns {string}
     * @constructor
     */

  }, {
    key: 'gitPrUrl',
    get: function get() {
      return `https://api.github.com/repos/${ GitHubMsgPublisher.gitUser }/${ GitHubMsgPublisher.gitRepoName }/pulls/${ GitHubMsgPublisher.gitPRNumber }`;
    }

    /**
     * @returns {string}
     * @constructor
     */

  }, {
    key: 'gitUser',
    get: function get() {
      return process.env['TRAVIS_REPO_SLUG'].replace(/(.*)\/.*/i, '$1');
    }

    /**
     * @returns {string}
     * @constructor
     */

  }, {
    key: 'gitRepoName',
    get: function get() {
      return process.env['TRAVIS_REPO_SLUG'].replace(/.*\/(.*)/i, '$1');
    }
  }]);

  function GitHubMsgPublisher() {
    _classCallCheck(this, GitHubMsgPublisher);

    this.github = new _github2.default({
      debug: false,
      protocol: 'https',
      host: 'api.github.com',
      timeout: 5000,
      headers: {
        'user-agent': 'Code-Coverage-GitHub-App'
      },
      followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
      includePreview: true // default: false; includes accept headers to allow use of stuff under preview period
    });

    this.github.authenticate({
      type: 'oauth',
      token: process.env['GITHUB_OAUTH_TOKEN']
    });
  }

  /**
   * Add comments for PR or fails if coverage
   * @param {Number} s3SumPercent - s3 summary coverage percent
   * @param {Number} localSumPercent - local summary coverage percent
   * @param {Function} callback
   */


  _createClass(GitHubMsgPublisher, [{
    key: 'addComment',
    value: function addComment(s3SumPercent, localSumPercent, callback) {
      let commentMsg;

      //failed if coverage decreased more that 1 %
      let isFailed = localSumPercent + 1 < s3SumPercent;
      let failMsg = 'Failed due to decreasing coverage';

      //no need to add comments for !PR
      if (!GitHubMsgPublisher.isPullRequest) {
        callback(null, null);
        return;
      }

      if (isFailed) {
        commentMsg = `:x: coverage decreased from ${ s3SumPercent }% to ${ localSumPercent }%`;
      } else if (localSumPercent === s3SumPercent) {
        commentMsg = `:white_check_mark: coverage remained the same at ${ localSumPercent }%`;
      } else if (-1 < localSumPercent - s3SumPercent && localSumPercent - s3SumPercent < 0) {
        commentMsg = `:warning: coverage decreased less than 1% from ${ s3SumPercent }% to ${ localSumPercent }%`;
      } else {
        commentMsg = `:white_check_mark: coverage increased from ${ s3SumPercent }% to ${ localSumPercent }%`;
      }

      this.github.issues.getComments({
        user: GitHubMsgPublisher.gitUser,
        repo: GitHubMsgPublisher.gitRepoName,
        number: GitHubMsgPublisher.gitPRNumber
      }, (err, issues) => {
        let isCommentAdded = false;

        if (err) {
          console.log(err);
          callback(err, null);
          return;
        }

        for (let issue of issues) {
          if (issue.hasOwnProperty('body') && issue.body === commentMsg) {
            isCommentAdded = true;
            console.log('Comment has already been added: ', commentMsg);

            if (isFailed) {
              console.log(failMsg);
              process.exit(1);
            }
          }
        }

        if (!isCommentAdded) {
          this.github.issues.createComment({
            user: GitHubMsgPublisher.gitUser,
            repo: GitHubMsgPublisher.gitRepoName,
            number: GitHubMsgPublisher.gitPRNumber,
            body: commentMsg
          }, (err, res) => {
            if (err) {
              console.log(err);
              callback(err, null);
              return;
            }

            callback(null, res);

            if (isFailed) {
              console.log(failMsg);
              process.exit(1);
            }
          });
        }
      });
    }
  }]);

  return GitHubMsgPublisher;
}();

exports.default = GitHubMsgPublisher;
module.exports = exports['default'];

