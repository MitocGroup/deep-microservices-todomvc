'use strict';

var watch = require('watch');
var fs = require('fs');

/**
 * DEEP MANAGEMENT Watcher
 * @param root
 */
function Watcher(root) {
  this.root_ = root;
  this.ignoreDirectoryPatterns_ = [];
}

/**
 * Default ignored patterns
 * @type {string[]}
 * @private
 */
Watcher.prototype.defaultIgnoreDirectoryPatterns_ = [
  'node_modules',
  'js/vendor',
  'js/lib',
  'js/node_modules',
];

/**
 * When true this option means that when the file tree is walked it will ignore files that being with "."
 */
Watcher.prototype.ignoreDotFiles = true;

/**
 * When true, this options means that when a file can't be read, this file is silently skipped.
 */
Watcher.prototype.ignoreUnreadableDir = true;

/**
 * When true, this options means that when a file can't be read due to permission issues, this file is silently skipped.
 */
Watcher.prototype.ignoreNotPermitted = true;

/**
 * Registers a pattern to use against when ignoring directories to watch
 * @param pattern
 */
Watcher.prototype.registerIgnoredDirectoryPattern = function(pattern) {
  this.ignoreDirectoryPatterns_.push(pattern);
};

/**
 * Start watcher
 */
Watcher.prototype.watch = function() {
  var _this = this;

  var ignoredPatterns = _this.ignoreDirectoryPatterns_.length ?
    _this.ignoreDirectoryPatterns_.join('|') :
    _this.defaultIgnoreDirectoryPatterns_.join('|');

  var options = {
    ignoreDotFiles: _this.ignoreDotFiles,
    ignoreUnreadableDir: _this.ignoreUnreadableDir,
    ignoreNotPermitted: _this.ignoreNotPermitted,
    ignoreDirectoryPattern: new RegExp(ignoredPatterns),
    filter: function(f, stats) {
      f = f;
      stats = stats;
      return true;
    },
  };

  var callback = function(f, curr, prev) {
    if (typeof f === 'object' && prev === null && curr === null) {
      return process.stdout.write('Finished walking the tree\n');
    } else if (prev === null) {
      return _this.onFileCreate.apply(this, arguments);
    } else if (curr.nlink === 0) {
      return _this.onFileRemove.apply(this, arguments);
    } else {
      return _this.onFileChange.apply(this, arguments);
    }
  };

  return watch.watchTree(this.root_, options, callback);
};

/**
 * Stop watcher
 * @returns {*}
 */
Watcher.prototype.unwatch = function() {
  return watch.unwatchTree(this.root_);
};

Watcher.prototype.onFileCreate = function() {};

Watcher.prototype.onFileChange = function(filePath) {
  //filePath;
};

Watcher.prototype.onFileRemove = function() {};

if (!module.parent) {
  var root = process.argv.slice(2).shift();
  if (!root || !fs.existsSync(root)) {
    process.stderr.write(root + ' is not a directory. Pass a existing directory path as argument to the script.');
    process.exit(1);
  }

  var w = new Watcher(root);
  w.watch();
} else {
  module.exports = Watcher;
}