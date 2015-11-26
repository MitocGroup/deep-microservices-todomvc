exports.config = {

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
        defaultTimeoutInterval: 30000,
    },

    mochaOpts:{
        reporter:'spec',
        slow: 30000,
        enableTimeouts: false
    },
};

