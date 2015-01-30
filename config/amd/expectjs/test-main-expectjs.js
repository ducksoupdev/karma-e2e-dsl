requirejs.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/src/amd',

    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery',
        'underscore': '../../bower_components/underscore/underscore',
        'expect': '../../bower_components/expect/index'
    },

    shim: {
        'jquery': {
            'exports': 'jQuery'
        },
        'underscore': {
            'exports': '_'
        },
        'expect': {
            'exports': 'expect'
        }
    },

    // dynamically load all test files
    deps: ['../../test/amd/e2e/test-expectjs.spec'],

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
