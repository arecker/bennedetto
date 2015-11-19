(function() {
    'use strict';

    function config($routeProvider, $resourceProvider, $httpProvider, APP_SETTINGS) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $routeProvider
            .when('/', {
                templateUrl: '{}app/partials/today.html'.format(APP_SETTINGS.staticUrl),
                controller: 'TodayController',
                controllerAs: 'ctrl'
            })

            .when('/rates', {
                templateUrl: '{}app/partials/rates.html'.format(APP_SETTINGS.staticUrl),
                controller: 'RatesController',
                controllerAs: 'ctrl'
            });
    }

    angular
        .module('bennedetto', ['ngRoute', 'ngResource'])
        .config(['$routeProvider', '$resourceProvider', '$httpProvider', 'APP_SETTINGS', config]);

}());
