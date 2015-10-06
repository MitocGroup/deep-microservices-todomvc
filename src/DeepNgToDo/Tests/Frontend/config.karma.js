'use strict';

// Karma configuration
// Generated on Fri Aug 14 2015 12:41:04 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'DeepNgToDo/Tests/Frontend/vendor/github/angular/bower-angular@1.4.0/angular.js',
      'DeepNgToDo/Tests/Frontend/vendor/github/angular/bower-angular-mocks@1.4.4/angular-mocks.js',
      'DeepNgToDo/Tests/Frontend/vendor/github/angular-ui/ui-router@0.2.15/angular-ui-router.js',
      'DeepNgToDo/Tests/Frontend/vendor/system.js',
      'DeepNgToDo/Tests/Frontend/lib/DeepFramework.js',
      'DeepNgToDo/Tests/Frontend/mock/lib/DeepFramework.js',
      {pattern: 'DeepNgToDo/Tests/Frontend/mock/data/*.json', watched: true, served: true, included: false,},
      '**/views/directives/*.html',
    ],

    // jspm configuration
    jspm: {
      config: 'DeepNgToDo/Tests/Frontend/config.test.js',
      packages: 'DeepNgToDo/Tests/Frontend/vendor/',
      useBundles: false,
      paths: {
        'github:*': 'DeepNgToDo/Tests/Frontend/vendor/github/*.js',
        'npm:*': 'DeepNgToDo/Tests/Frontend/vendor/npm/*.js',
      },
      loadFiles: [
        'DeepNgToDo/Tests/Frontend/angular/**/*.spec.js',
        'DeepNgToDo/Frontend/js/app/angular/index.js',
      ],
      serveFiles: [
        'DeepNgToDo/Frontend/**/*.js',
      ],
    },

    proxies: {
    },

    client: {
      captureConsole: true,
    },

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'DeepNgToDo/Frontend/js/app/angular/**/*.js': ['coverage'],
      'DeepNgToDo/Tests/Frontend/angular/**/*.spec.js': ['babel'],
      '**/views/directives/*.html': 'ng-html2js',
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        modules: 'system',
      },
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
    },

    plugins: [
      'karma-babel-preprocessor',
      'karma-jasmine',
      'karma-coverage',
      'karma-jspm',
      'karma-phantomjs-launcher',
      'karma-verbose-reporter',
      'karma-ng-html2js-preprocessor',
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //verbose
    //progress
    reporters: ['verbose', 'coverage'],

    coverageReporter: {
      // configure the reporter to use isparta for JavaScript coverage
      // Only on { "karma-coverage": "douglasduteil/karma-coverage#next" }
      instrumenters: { isparta: require('isparta') },
      instrumenter: {
        '**/*.js': 'isparta',
      },
      reporters: [
        {
          type: 'json',
          dir: 'DeepNgToDo/Tests/Frontend/coverage/',
        },
        {
          type: 'lcov',
          dir: 'DeepNgToDo/Tests/Frontend/coverage/',
        },
      ],
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

  });
};
