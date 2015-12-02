module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'static/vendor.js': [
                        'node_modules/angular/angular.min.js',
                        'node_modules/angular-route/angular-route.min.js',
                        'node_modules/angular-resource/angular-resource.min.js',
                        'node_modules/angular-messages/angular-messages.min.js',
                        'node_modules/angular-aria/angular-aria.min.js',
                        'node_modules/angular-animate/angular-animate.min.js',
                        'node_modules/angular-material/angular-material.min.js',
                        'node_modules/angular-material-data-table/dist/md-data-table.min.js',
                        'node_modules/chart.js/Chart.min.js',
                        'node_modules/angular-chart.js/dist/angular-chart.min.js',
                        'static/js/globals.js'
                    ],
                    'static/vendor-debug.js': [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-route/angular-route.js',
                        'node_modules/angular-resource/angular-resource.js',
                        'node_modules/angular-messages/angular-messages.js',
                        'node_modules/angular-aria/angular-aria.js',
                        'node_modules/angular-animate/angular-animate.js',
                        'node_modules/angular-material/angular-material.js',
                        'node_modules/angular-material-data-table/dist/md-data-table.js',
                        'node_modules/chart.js/Chart.js',
                        'node_modules/angular-chart.js/dist/angular-chart.js',
                        'static/js/globals.js'
                    ]
                }
            }
        },
        jshint: {
            all: ['static/js/*.js', 'static/app/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                forin: true,
                funcscope: true,
                latedef: true,
                maxparams: 5,
                futurehostile: true,
                validthis: true
            }
        },
        cssmin: {
            target: {
                files: {
                    'static/vendor.min.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.min.css',
                        'node_modules/angular-ui-bootstrap/ui-bootstrap-csp.css',
                        'node_modules/angular-material/angular-material.min.css',
                        'node_modules/angular-material/angular-material.layout.min.css',
                        'node_modules/angular-material-data-table/dist/md-data-table.min.css',
                        'node_modules/font-awesome/css/font-awesome.min.css',
                        'node_modules/angular-chart.js/dist/angular-chart.min.css'
                    ]
                }
            }
        },
        copy: {
            files: {
                cwd: 'node_modules/font-awesome/fonts',
                src: '**/*',
                dest: 'static/fonts',
                expand: true
            }
        },
        "regex-replace": {
            css: {
                src: ['static/vendor.min.css'],
                actions: [
                    {
                        name: 'font',
                        search: '../fonts/',
                        replace: '/static/fonts/',
                        flags: 'g'
                    }
                ]
            }
        },
        jasmine: {
            pivotal: {
                src: [
                    'static/app/**/*.js',
                    'jasmine/mocks.js',
                ],
                options: {
                    specs: 'jasmine/**/*.js',
                    vendor: [
                        'static/vendor-debug.js',
                        'node_modules/angular-mocks/angular-mocks.js'
                    ],
                    polyfills: 'static/js/polyfills.js',
                    keepRunner: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8888,
                    keepalive: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('build', ['browserify', 'cssmin', 'copy', 'regex-replace']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['build', 'test']);
};
