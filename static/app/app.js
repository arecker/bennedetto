(function() {
    'use strict';

    function config($routeProvider, APP_SETTINGS) {
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
        .config(['$routeProvider', 'APP_SETTINGS', config]);

}());
