var baseConfig = require('../karma.base.js');

module.exports = function(config) {
    baseConfig(config);

    config.set({
        basePath: '../../',
        files: [
            './bower_components/underscore/underscore.js',
            './bower_components/jquery/dist/jquery.js',
            './bower_components/should/should.js',
            './src/karma-e2e-dsl.js',
            './test/e2e/test-should.spec.js'
        ]
    });
};