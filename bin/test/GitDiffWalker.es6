/**
 * Created by vcernomschi on 5/16/16.
 */

'use strict'

import path from 'path';
import fs from 'fs';
import os from 'os';
import fsExtra from 'fs-extra';
import syncExec from 'sync-exec';

/**
 *
 */
export class GitDiffWalker {

  /**
   * @returns {string}
   * @constructor
   */
  static get TARGET_BRANCH() {
    console.log('TRAVIS_BRANCH: ', process.env['TRAVIS_BRANCH'])
    return process.env['TRAVIS_BRANCH'];
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get CMD() {
    return `git diff --name-only ${GitDiffWalker.TARGET_BRANCH}`;
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get NONE() {
    return 'none';
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get FULL_CI_RUN() {
    return '[ci full]';
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get SRC() {
    return 'src';
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get FRONTEND_MICROAPP_PATHS() {
    return 'FRONTEND_MICROAPP_PATHS';
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get BACKEND_MICROAPP_PATHS() {
    return 'BACKEND_MICROAPP_PATHS';
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get BACKEND_MICROAPP_IDENTIFIERS() {
    return 'BACKEND_MICROAPP_IDENTIFIERS';
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get DEEPKG_JSON() {
    return 'deepkg.json';
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get CWD() {
    return path.join(__dirname, '../..');
  }

  /**
   * @returns {string}
   * @constructor
   */
  static get VARS_SHELL_PATH() {
    return path.join(__dirname, '_vars.sh');
  }

  static removeDuplicates() {
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
   * @returns {string}
   * @constructor
   */
  static get TEST_PATHS_TPL() {
    let content = [];

    content.push('#!\/bin\/bash');
    content.push('');
    content.push(`${GitDiffWalker.FRONTEND_MICROAPP_PATHS}="{frontendMicroAppPaths}"`);
    content.push(`${GitDiffWalker.BACKEND_MICROAPP_PATHS}="{backendMicroAppPaths}"`);
    content.push(`${GitDiffWalker.BACKEND_MICROAPP_IDENTIFIERS}="{backendMicroAppIdentifiers}"`);
    content.push('');

    return content.join(os.EOL);
  }

  /**
   * @returns {String}
   */
  static get commitMessage() {
    return process.env['TRAVIS_COMMIT_MESSAGE'];
  }

  /**
   * @returns {String}
   */
  static getAllChangedFiles() {

    console.log(`Run command: ${GitDiffWalker.CMD} for cwd: ${GitDiffWalker.CWD}`);

    let result = syncExec(GitDiffWalker.CMD, {
      cwd: GitDiffWalker.CWD,
    });

    console.log('Changed files: ', result.stdout.toString().trim());

    return (parseInt(result.status) !== 0) ?
      `Command '${GitDiffWalker.CMD}' failed in '${GitDiffWalker.CWD}' with exit code ${result.status}` :
      result.stdout.toString().trim();
  }

  getAllMicroAppPath(srcPath) {

    if (!fs.existsSync(srcPath)) {
      return [];
    }

    return fs.readdirSync(srcPath).filter(function (file) {
      return GitDiffWalker.getFullPath(fs.statSync(path.join(srcPath, file)).isDirectory());
    });
  }

  /**
   *
   */
  constructor() {
    this._files = GitDiffWalker.getAllChangedFiles().split('\n');

    this._allMicroAppPaths = this.getAllMicroAppPaths(path.join(__dirname, '../..', GitDiffWalker.SRC));
    this._allMicroAppIdentifiers = this.getAllMicroAppIdentifiers();

    this.getBackendMicroAppPaths();
    this.getBackendTestMicroAppPaths();
    this.getBackendCodeMicroAppPaths();
    this.getFrontendMicroAppPaths();
  }


  /**
   * @returns {String[]}
   */
  get files() {
    return this._files;
  }

  /**
   * @returns {String[]}
   */
  getFullPath(name) {
    return path.join(__dirname, '../..', GitDiffWalker.SRC, name);
  }

  /**
   * @param srcpath
   * @returns {String[]}
   */
  getAllMicroAppPaths(srcPath) {

    if (!fs.existsSync(srcPath)) {
      return [];
    }

    return fs.readdirSync(srcPath).filter((file) => {
      return fs.statSync(path.join(srcPath, file)).isDirectory();
    });
  }

  /**
   * Get changed microapplication identifiers from deepkg.json where were changed code or backend tests
   * @returns {String[]}
   */
  getAllMicroAppIdentifiers() {
    let indentifiers = [];

    for (let microAppPath of this._allMicroAppPaths) {

      let microAppFullPath = this.getFullPath(microAppPath);

      if (!fs.existsSync(microAppFullPath)) {
        continue;
      }

      let content = fsExtra.readJsonSync(
        path.join(microAppFullPath, GitDiffWalker.DEEPKG_JSON), {throws: false}
      );

      indentifiers.push(content.identifier);
    }

    return indentifiers;
  }

  /**
   * @returns {boolean}
   */
  get isSkipTests() {
    let re = /^(?!src\/).+|(.+\/docs\/.+)/i;

    for (let file of this.files) {

      if (!re.test(file)) {
        return false;
      }
    }

    return true;
  }

  /**
   * @returns {boolean}
   */
  get isFullCIRun() {
    return GitDiffWalker.commitMessage.indexOf(GitDiffWalker.FULL_CI_RUN) > -1;
  }

  /**
   * @returns {boolean}
   */
  get isFrontedCodeChanged() {
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
  get isFrontendTestsChanged() {
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
  get isBackendTestsChanged() {
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
  get isBackendCodeChanged() {
    let testsRe = /^src\/(.+)\/tests\/backend\/.+$/i;
    let re = /^src\/(.+)\/(backend|data)\/.+$/i;

    for (let file of this.files) {

      if (!testsRe.test(file) && re.test(file)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Get changed microapplication paths where were changed frontend
   * @returns {String[]}
   */
  getFrontendMicroAppPaths() {
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
  getFrontendMicroAppNames() {
    let names = [];

    for (let file of this._frontendMicroAppPaths) {

      names.push(file.substring(file.lastIndexOf(path.sep) + 1));
    }

    this._frontendMicroAppNames = names;

    return names;
  }

  /**
   * Get changed microapplication paths where were changed backend code or backend tests
   * @returns {String[]}
   */
  getBackendMicroAppPaths() {
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
  getBackendTestMicroAppPaths() {
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
  getBackendCodeMicroAppPaths() {
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
  getBackendMicroAppIdentifiers() {
    let indentifiers = [];
    let microAppPaths = this._backendMicroAppPaths;

    for (let microAppPath of microAppPaths) {

      let microAppFullPath = this.getFullPath(microAppPath);

      if (!fs.existsSync(microAppFullPath)) {
        continue;
      }

      let content = fsExtra.readJsonSync(
        path.join(microAppFullPath, GitDiffWalker.DEEPKG_JSON), {throws: false}
      );

      indentifiers.push(content.identifier);
    }

    this._backendMicroAppIdentifiers = indentifiers;

    return indentifiers;
  }

  /**
   * Get changed microapplication names where were changed backend code or backend tests
   * @returns {String[]}
   */
  getBackendMicroAppNames() {
    let names = [];

    for (let file of this._backendMicroAppPaths) {

      names.push(file.substring(file.lastIndexOf(path.sep) + 1));
    }

    this._backendMicroAppNames = names;

    return names;
  }

  /**
   * Get changed microapplication names where were changed backend code
   * @returns {String[]}
   */
  getBackendCodeMicroAppNames() {
    let names = [];

    for (let file of this._backendCodeMicroAppPaths) {

      names.push(file.substring(file.lastIndexOf(path.sep) + 1));
    }

    this._backendCodeMicroAppNames = names;

    return names;
  }

  /**
   * Get changed microapplication names where were changed backend tests
   * @returns {String[]}
   */
  getBackendTestMicroAppNames() {
    let names = [];

    for (let file of this._backendTestMicroAppPaths) {

      names.push(file.substring(file.lastIndexOf(path.sep) + 1));
    }

    this._backendTestMicroAppNames = names;

    return names;
  }

  setTestPaths() {

    let backendMicroAppPaths = GitDiffWalker.NONE;
    let frontendMicroAppPaths = GitDiffWalker.NONE;
    let backendMicroAppIdentifiers = GitDiffWalker.NONE;

    if (this.isFrontedCodeChanged || this.isFrontendTestsChanged) {
      frontendMicroAppPaths = this.getFrontendMicroAppNames();
    }

    if (this.isBackendTestsChanged || this.isBackendCodeChanged) {
      backendMicroAppPaths = this.getBackendMicroAppNames();

      frontendMicroAppPaths = (this.isBackendCodeChanged &&
        typeof this._frontendMicroAppNames !== 'undefined' &&
        this._frontendMicroAppNames.length > 0) ?
        GitDiffWalker.removeDuplicates(this.getFrontendMicroAppNames(), this.getBackendCodeMicroAppNames()) :
        this.getBackendCodeMicroAppNames();

      backendMicroAppIdentifiers = this.getBackendMicroAppIdentifiers();
    }

    if (this.isFullCIRun) {
      frontendMicroAppPaths = backendMicroAppPaths = this._allMicroAppPaths;
      backendMicroAppIdentifiers = this._allMicroAppIdentifiers;
    }

    let varsContent = GitDiffWalker.TEST_PATHS_TPL
      .replace(/\{frontendMicroAppPaths\}/g, frontendMicroAppPaths)
      .replace(/\{backendMicroAppPaths\}/g, backendMicroAppPaths)
      .replace(/\{backendMicroAppIdentifiers\}/g, backendMicroAppIdentifiers);

    fsExtra.writeFileSync(GitDiffWalker.VARS_SHELL_PATH, varsContent, 'utf8');

    console.log("TRAVIS_COMMIT_MESSAGE: ", GitDiffWalker.commitMessage);
    console.log(`isFullCIRun: ${this.isFullCIRun}`);
    console.log(`isSkipTests: ${this.isSkipTests}`);
    console.log(`isFrontedCodeChanged: ${this.isFrontedCodeChanged}`);
    console.log(`isFrontendTestsChanged: ${this.isFrontendTestsChanged}`);
    console.log(`isBackendCodeChanged: ${this.isBackendCodeChanged}`);
    console.log(`isBackendTestsChanged: ${this.isBackendTestsChanged}`);

    console.log(`frontend paths: ${this.getFrontendMicroAppPaths()}`);
    console.log(`frontend names: ${this.getFrontendMicroAppNames()}`);

    console.log(`backend all paths: ${this.getBackendMicroAppPaths()}`);
    console.log(`backend tests paths: ${this.getBackendTestMicroAppPaths()}`);
    console.log(`backend code paths: ${this.getBackendCodeMicroAppPaths()}`);
    console.log(`backend identifiers: ${this.getBackendMicroAppIdentifiers()}`);
    console.log(`backend all names: ${this.getBackendMicroAppNames()}`);
    console.log(`backend tests names: ${this.getBackendTestMicroAppNames()}`);
    console.log(`backend code names: ${this.getBackendCodeMicroAppNames()}`);
  }
}

let walker = new GitDiffWalker();
walker.setTestPaths();
