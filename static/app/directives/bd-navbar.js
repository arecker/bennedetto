(function() {
    'use strict';

    function bdNavbar(StaticService) {
        return {
            restrict: 'E',
            templateUrl: StaticService.partial('bd-navbar.html'),
            controller: 'bdNavbarController',
            controllerAs: 'navCtrl',
            bindToController: true,
            transclude: true
        };
    }

    function bdNavbarController($location, $mdSidenav, $window, APP_SETTINGS) {
        var self = this;

        self.version = APP_SETTINGS.version;

        self.isActive = function(path) {
            return path === $location.path();
        };

        self.isCollapsed = false;

        self.toggleSideNav = function(id) {
            $mdSidenav(id).toggle();
        };

        self.redirectProfile = function() {
            $location.path('/profile');
        };

        self.redirectSignOut = function() {
            $window.location.href = APP_SETTINGS.logoutUrl;
        };

        self.email = APP_SETTINGS.email;
    }

    angular
        .module('bennedetto')
        .controller('bdNavbarController', ['$location', '$mdSidenav', '$window', 'APP_SETTINGS', bdNavbarController])
        .directive('bdNavbar', ['StaticService', bdNavbar]);
}());
