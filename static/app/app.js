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
            .otherwise({
                redirectTo: '/track'
            });
    }

    angular
        .module('bennedetto', ['ngRoute', 'ngResource', 'ngMessages', 'ngMaterial'])
        .config(['$routeProvider', '$resourceProvider', '$httpProvider', 'APP_SETTINGS', config]);

}());
