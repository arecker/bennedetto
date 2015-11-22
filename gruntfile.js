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
                        'node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
                        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
                        'node_modules/angular-aria/angular-aria.min.js',
                        'node_modules/angular-animate/angular-animate.min.js',
                        'node_modules/angular-material/angular-material.min.js'
                    ],
                    'static/vendor-debug.js': [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-route/angular-route.js',
                        'node_modules/angular-resource/angular-resource.js',
                        'node_modules/angular-messages/angular-messages.js',
                        'node_modules/angular-ui-bootstrap/ui-bootstrap.js',
                        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
                        'node_modules/angular-aria/angular-aria.js',
                        'node_modules/angular-animate/angular-animate.js',
                        'node_modules/angular-material/angular-material.js'
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
                camelcase: true,
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
                        'node_modules/angular-material/angular-material.layout.min.css'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['browserify', 'cssmin', 'jshint']);
    grunt.registerTask('test', ['jshint']);
};
