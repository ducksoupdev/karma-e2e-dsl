var baseConfig = require('../karma.base');

module.exports = function(config) {
    baseConfig(config);

    config.set({
        basePath: '../../',
        files: [
            './config/expectjs/test-main-expectjs.js',
            { pattern: './bower_components/jquery/dist/jquery.js', included: false },
            { pattern: './bower_components/underscore/underscore.js', included: false },
            { pattern: './bower_components/expect/index.js', included: false },
            { pattern: './src/browser.js', included: false },
            { pattern: './src/deferred.js', included: false },
            { pattern: './src/drop-down-list.js', included: false },
            { pattern: './src/dsl.js', included: false },
            { pattern: './src/element.js', included: false },
            { pattern: './src/input.js', included: false },
            { pattern: './src/navigate-to.js', included: false },
            { pattern: './src/run.js', included: false },
            { pattern: './test/e2e/test-expectjs.spec.js', included: false }
        ]
    });
};