'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './'
                }
            }
        },
        watch: {
            test: {
                files: ['./test.spec.js', './karma-e2e-dsl.js'],
                tasks: ['connect', 'uglify:build', 'karma:e2e']
            }
        },
        karma: {
            e2e: {
                configFile: 'config/default/karma.conf.js',
                singleRun: true
            },
            e2eShouldJs: {
                configFile: 'config/shouldjs/karma.shouldjs.conf.js',
                singleRun: true
            },
            e2eAssert: {
                configFile: 'config/chai/karma.assert.conf.js',
                singleRun: true
            },
            e2eExpect: {
                configFile: 'config/chai/karma.expect.conf.js',
                singleRun: true
            },
            e2eExpectJs: {
                configFile: 'config/expectjs/karma.expectjs.conf.js',
                singleRun: true
            },
            e2eAmd: {
                configFile: 'config/amd/default/karma.conf.js',
                singleRun: true
            },
            e2eAmdShould: {
                configFile: 'config/amd/chai/karma.should.conf.js',
                singleRun: true
            },
            e2eAmdShouldJs: {
                configFile: 'config/amd/shouldjs/karma.shouldjs.conf.js',
                singleRun: true
            },
            e2eAmdAssert: {
                configFile: 'config/amd/chai/karma.assert.conf.js',
                singleRun: true
            },
            e2eAmdExpect: {
                configFile: 'config/amd/chai/karma.expect.conf.js',
                singleRun: true
            },
            e2eAmdExpectJs: {
                configFile: 'config/amd/expectjs/karma.expectjs.conf.js',
                singleRun: true
            }
        },
        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                files: {
                    'dist/karma-e2e-dsl.min.js': ['./src/karma-e2e-dsl.js']
                }
            },
            assertions: {
                files: {
                    'dist/expectations.min.js': ['./src/expectations.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    // Test tasks.
    grunt.registerTask('test', ['connect', 'uglify', 'karma:e2e']);
    grunt.registerTask('test:shouldjs', ['connect', 'uglify', 'karma:e2eShouldJs']);
    grunt.registerTask('test:assert', ['connect', 'uglify', 'karma:e2eAssert']);
    grunt.registerTask('test:expect', ['connect', 'uglify', 'karma:e2eExpect']);
    grunt.registerTask('test:expectjs', ['connect', 'uglify', 'karma:e2eExpectJs']);

    // RequireJS/AMD test tasks
    grunt.registerTask('test:amd', ['connect', 'uglify', 'karma:e2eAmd']);
    grunt.registerTask('test:amd:should', ['connect', 'uglify', 'karma:e2eAmdShould']);
    grunt.registerTask('test:amd:shouldjs', ['connect', 'uglify', 'karma:e2eAmdShouldJs']);
    grunt.registerTask('test:amd:assert', ['connect', 'uglify', 'karma:e2eAmdAssert']);
    grunt.registerTask('test:amd:expect', ['connect', 'uglify', 'karma:e2eAmdExpect']);
    grunt.registerTask('test:amd:expectjs', ['connect', 'uglify', 'karma:e2eAmdExpectJs']);

    grunt.registerTask('default', function() {
        console.log('Task list:\n');
        console.log(' * test');
        console.log(' * test:shouldjs');
        console.log(' * test:assert');
        console.log(' * test:expect');
        console.log(' * test:expectjs');
        console.log('\nRequireJS/AMD:\n');
        console.log(' * test:amd');
        console.log(' * test:amd:should');
        console.log(' * test:amd:shouldjs');
        console.log(' * test:amd:assert');
        console.log(' * test:amd:expect');
        console.log(' * test:amd:expectjs');
    });

};