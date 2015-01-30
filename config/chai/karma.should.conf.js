var baseConfig = require('../karma.base');

module.exports = function(config) {
    baseConfig(config);

    config.set({
        basePath: '../../',
        files: [
            './config/chai/test-main-should.js',
            { pattern: './bower_components/jquery/dist/jquery.js', included: false },
            { pattern: './bower_components/underscore/underscore.js', included: false },
            { pattern: './bower_components/chai/chai.js', included: false },
            { pattern: './src/browser.js', included: false },
            { pattern: './src/deferred.js', included: false },
            { pattern: './src/drop-down-list.js', included: false },
            { pattern: './src/dsl.js', included: false },
            { pattern: './src/element.js', included: false },
            { pattern: './src/input.js', included: false },
            { pattern: './src/navigate-to.js', included: false },
            { pattern: './src/run.js', included: false },
            { pattern: './src/assertions/chai-should.js', included: false },
            { pattern: './test/e2e/test-should.spec.js', included: false }
        ]
    });
};