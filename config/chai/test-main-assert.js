requirejs.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/src',

    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'underscore': '../bower_components/underscore/underscore',
        'chai': '../bower_components/chai/chai'
    },

    shim: {
        'jquery': {
            'exports': 'jQuery'
        },
        'underscore': {
            'exports': '_'
        },
        'chai': {
            'exports': 'chai'
        }
    },

    // dynamically load all test files
    deps: ['../test/e2e/test-assert.spec'],

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
