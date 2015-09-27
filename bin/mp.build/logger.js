'use strict';

require('colors');

var LOG_LEVEL_OFF         = 'off';
var LOG_LEVEL_TRACE       = 'trace';
var LOG_LEVEL_INFO        = 'info';
var LOG_LEVEL_WARN        = 'warning';
var LOG_LEVEL_ERROR       = 'error';
var LOG_LEVEL_FATAL       = 'fatal';
var DEFAULT_LOG_LEVEL     = LOG_LEVEL_INFO;

function Log(logLevel) {

  this.logLevel = logLevel  = logLevel || DEFAULT_LOG_LEVEL;

  this.update = function(msg) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(msg);
  };

  this.trace  = function(msg) {
    if ([LOG_LEVEL_TRACE].indexOf(logLevel) >= 0) {
      process.stdout.write('Trace'.cyan + '   ' + msg + '\n');
    }
  };

  this.info   = function(msg) {
    if ([LOG_LEVEL_TRACE, LOG_LEVEL_INFO].indexOf(logLevel) >= 0) {
      process.stdout.write('Info'.green + '    ' + msg + '\n');
    }
  };

  this.warn   = function(msg) {
    if ([LOG_LEVEL_TRACE, LOG_LEVEL_INFO, LOG_LEVEL_WARN].indexOf(logLevel) >= 0) {
      process.stdout.write('Warning'.yellow + ' ' +  msg + '\n');
    }
  };

  this.error  = function(msg) {
    if ([LOG_LEVEL_TRACE, LOG_LEVEL_INFO, LOG_LEVEL_WARN, LOG_LEVEL_ERROR].indexOf(logLevel)  >= 0) {
      process.stderr.write('Error'.red + '   ' + msg.red + '\n');
    }
  };

  this.fatal  = function(msg) {
    if ([LOG_LEVEL_TRACE, LOG_LEVEL_INFO, LOG_LEVEL_WARN, LOG_LEVEL_ERROR, LOG_LEVEL_FATAL].indexOf(logLevel) >= 0) {
      process.stderr.write('Fatal'.red + '    ' + msg.red + '\n');
    }
  };
}

Log.LOG_LEVEL_OFF        = LOG_LEVEL_OFF;
Log.LOG_LEVEL_TRACE      = LOG_LEVEL_TRACE;
Log.LOG_LEVEL_INFO       = LOG_LEVEL_INFO;
Log.LOG_LEVEL_WARN       = LOG_LEVEL_WARN;
Log.LOG_LEVEL_ERROR      = LOG_LEVEL_ERROR;
Log.LOG_LEVEL_FATAL      = LOG_LEVEL_FATAL;
Log.DEFAULT_LOG_LEVEL    = DEFAULT_LOG_LEVEL;
Log.logLevels             = [LOG_LEVEL_OFF, LOG_LEVEL_TRACE, LOG_LEVEL_INFO, LOG_LEVEL_WARN, LOG_LEVEL_ERROR, LOG_LEVEL_FATAL];

module.exports = Log;