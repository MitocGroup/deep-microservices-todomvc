exports.config = {

  //Url link for testing
  testUrl: 'http://localhost:8000/',

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  build: process.env.TRAVIS_BUILD_NUMBER,

  specs: [
    './../../../src/**/Tests/E2E/Tests/*.spec.js',
  ],

  multiCapabilities: [
    {
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'Chrome on Linux test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 1,
    },
  ],

  framework: 'jasmine2',

  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: true,

    // If true, print colors to the terminal.
    showColors: true,

    // If true, include stack traces in failures.
    includeStackTrace: true,

    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 120000,
  },
};
