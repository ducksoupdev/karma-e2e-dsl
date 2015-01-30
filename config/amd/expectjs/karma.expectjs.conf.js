var baseConfig = require('../karma.base.js');

module.exports = function(config) {
    baseConfig(config);

    config.set({
        basePath: '../../../',
        files: [
            './config/amd/expectjs/test-main-expectjs.js',
            { pattern: './bower_components/jquery/dist/jquery.js', included: false },
            { pattern: './bower_components/underscore/underscore.js', included: false },
            { pattern: './bower_components/expect/index.js', included: false },
            { pattern: './src/amd/browser.js', included: false },
            { pattern: './src/amd/deferred.js', included: false },
            { pattern: './src/amd/drop-down-list.js', included: false },
            { pattern: './src/amd/dsl.js', included: false },
            { pattern: './src/amd/element.js', included: false },
            { pattern: './src/amd/input.js', included: false },
            { pattern: './src/amd/navigate-to.js', included: false },
            { pattern: './src/amd/run.js', included: false },
            { pattern: './test/amd/e2e/test-expectjs.spec.js', included: false }
        ]
    });
};