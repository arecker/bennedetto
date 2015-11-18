module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'static/vendor.js': [
                        'node_modules/angular/angular.min.js',
                        'node_modules/angular-route/angular-route.min.js',
                        'node_modules/angular-ui-bootstrap/ui-bootstrap.min.js'
                    ],
                    'static/vendor-debug.js': [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-route/angular-route.js',
                        'node_modules/angular-ui-bootstrap/ui-bootstrap.js'
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
                        'node_modules/angular-ui-bootstrap/ui-bootstrap-csp.css'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['browserify', 'cssmin', 'jshint']);
};
