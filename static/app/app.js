(function() {
    'use strict';

    function config($routeProvider, $resourceProvider, $httpProvider, APP_SETTINGS) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $routeProvider
            .when('/track', {
                templateUrl: '{}app/partials/track.html'.format(APP_SETTINGS.staticUrl),
                controller: 'TrackController',
                controllerAs: 'ctrl'
            })
            .when('/explore', {
                templateUrl: '{}app/partials/explore.html'.format(APP_SETTINGS.staticUrl),
                controller: 'ExploreController',
                controllerAs: 'ctrl'
            })
            .when('/profile', {
                templateUrl: '{}app/partials/profile.html'.format(APP_SETTINGS.staticUrl),
                controller: 'ProfileController',
                controllerAs: 'ctrl',
                resolve: {
                    user: function(UserResourceFactory) {
                        return UserResourceFactory.buildUserProfile().then(function(d) {
                            return d.data;
                        });
                    }
                }
            })
            .otherwise({
                redirectTo: '/track'
            });
    }

    angular
        .module('bennedetto', ['ngRoute', 'ngResource', 'ngMessages', 'ngMaterial', 'chart.js'])
        .config(['$routeProvider', '$resourceProvider', '$httpProvider', 'APP_SETTINGS', config]);

}());
