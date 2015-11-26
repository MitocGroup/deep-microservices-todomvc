var config = {
    seleniumAddress: 'http://localhost:4444/wd/hub/',

    capabilities: {
        'browserName': 'chrome',
    },

    framework: 'jasmine2',

    specs: ['./Tests/*.spec.js'],

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
if (process.env.TRAVIS_BUILD_NUMBER) {
    config.sauceUser = process.env.SAUCE_USERNAME;
    config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    config.capabilities = {
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'App Tests'
    };
}

exports.config = config;
