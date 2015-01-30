var baseConfig = require('../karma.base.js');

module.exports = function(config) {
    baseConfig(config);

    config.set({
        basePath: '../..',
        files: [
            './bower_components/underscore/underscore.js',
            './bower_components/jquery/dist/jquery.js',
            './bower_components/chai/chai.js',
            './src/karma-e2e-dsl.js',
            './test/e2e/test-assert.spec.js'
        ]
    });
};