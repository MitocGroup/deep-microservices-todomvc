exports.config = {

  //Url link for testing
  testUrl: 'http://localhost:8000/',

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  build: process.env.TRAVIS_BUILD_NUMBER,

  specs: [
    './Tests/*.spec.js',
  ],

  multiCapabilities: [
    {
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'Chrome on Linux test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 1,
    },

    //{
    //  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    //  name: 'Firefox  on Linux test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
    //  browserName: 'firefox',
    //  shardTestFiles: true,
    //  maxInstances: 3,
    //},

    ////@todo - uncomment out when it will ready for configurations below
    //{
    //  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    //  name: 'Firefox  on Linux test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
    //  browserName: 'firefox',
    //  shardTestFiles: true,
    //  maxInstances: 1,
    //},
    //{
    //  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    //  name: 'IE on win7 test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
    //  browserName: 'internet explorer',
    //  //shardTestFiles: true,
    //  //maxInstances: 5,
    //},
    //{
    //  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    //  name: 'Safari on iPhone test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
    //  browserName: 'safari',
    //  platformName: "iOS",
    //  platformVersion: "7.1",
    //  deviceName: "iPhone Simulator",
    //  //shardTestFiles: true,
    //  //maxInstances: 5,
    //},
    //{
    //  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    //  name: 'Safari on OS X10.9 test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
    //  browserName: 'safari',
    //  platform: "OS X 10.9",
    //  //shardTestFiles: true,
    //  //maxInstances: 5,
    //},
    //{
    //  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    //  name: 'Chrome on Google Nexus 7 test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
    //  deviceName: 'LG Nexus 4 Emulator',
    //  browserName: 'chrome',
    //  //shardTestFiles: true,
    //  //maxInstances: 5,
    //},
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
