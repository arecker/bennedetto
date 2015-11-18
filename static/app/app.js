(function() {
    'use strict';

    function config($routeProvider, APP_SETTINGS) {
        $routeProvider.when('/', {
            templateUrl: '{}app/partials/today.html'.format(APP_SETTINGS.staticUrl),
            controller: 'TodayController',
            controllerAs: 'ctrl'
        });
    }

    angular
        .module('bennedetto', ['ngRoute'])
        .config(['$routeProvider', 'APP_SETTINGS', config]);

}());
