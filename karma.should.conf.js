var baseConfig = require('./karma.base');

module.exports = function(config) {
    baseConfig(config);

    config.set({
        files: [
            './bower_components/underscore/underscore-min.js',
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/should/should.min.js',
            './expectations.js',
            './karma-e2e-dsl.js',
            './test-should.spec.js'
        ]
    });
};