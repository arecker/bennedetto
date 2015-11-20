(function() {
    'use strict';

    function bdNavbar(StaticService) {
        return {
            restrict: 'E',
            templateUrl: StaticService.partial('bd-navbar.html'),
            controller: 'bdNavbarController',
            controllerAs: 'navCtrl',
            bindToController: true
        };
    }

    function bdNavbarController($location, APP_SETTINGS) {
        var self = this;

        self.version = APP_SETTINGS.version;

        self.isActive = function(path) {
            return path === $location.path();
        };

        self.isCollapsed = false;

        self.toggleNav = function() {
            self.isCollapsed = !self.isCollapsed;
        };
    }

    angular
        .module('bennedetto')
        .controller('bdNavbarController', ['$location', 'APP_SETTINGS', bdNavbarController])
        .directive('bdNavbar', ['StaticService', bdNavbar]);
}());
