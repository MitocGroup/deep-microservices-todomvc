exports.config = {

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
  build: process.env.TRAVIS_BUILD_NUMBER,

  //it is not working for Sauce Labs
  //seleniumAddress: 'http://localhost:4445/wd/hub',

  specs: ['./Tests/*.spec.js'],

  multiCapabilities: [
    {
      name: 'Chrome test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'chrome',
      seleniumVersion: '2.47.0',
    },
    {
      name: 'Firefox test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'firefox',
      seleniumVersion: '2.47.0',
    },
    {
      name: 'IE test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'internet explorer',
      seleniumVersion: '2.47.0',
    },
    {
      name: 'Safari test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      platformName: "iOS",
      platformVersion: "7.1",
      deviceName: "iPhone Simulator",
      seleniumVersion: '2.47.0',
    },
    {
      name: 'Android test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'android',
      shardTestFiles: true,
      maxInstances: 5,
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
    defaultTimeoutInterval: 50000,
  },
};