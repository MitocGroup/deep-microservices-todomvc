exports.config = {

  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  build: process.env.TRAVIS_BUILD_NUMBER,

  //it is not working for Sauce Labs
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['./Tests/*.spec.js'],

  multiCapabilities: [
    {
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'Chrome on Linux test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'chrome',
      //seleniumVersion: '2.47.0',
    },
    {
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'Firefox  on Linux test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'firefox',
      //seleniumVersion: '2.46.0',
    },
    {
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'IE on win7 test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'internet explorer',
      //seleniumVersion: '2.46.0',
    },
    {
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'Safari on iPhone test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      browserName: 'Safari',
      platformName: "iOS",
      platformVersion: "7.1",
      deviceName: "iPhone Simulator",
      //seleniumVersion: '2.47.0',
    },
    {
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'Chrome on Google Nexus 7 test for build: ' + process.env.TRAVIS_BUILD_NUMBER,
      deviceName: 'Google Nexus 7 HD Emulator',
      browserName: 'Chrome',
      // sharding tests, - very cool
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