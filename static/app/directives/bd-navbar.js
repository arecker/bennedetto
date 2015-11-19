(function() {
    'use strict';

    function bdNavbar(StaticService) {
        return {
            restrict: 'E',
            templateUrl: StaticService.partial('bd-navbar.html'),
            controller: 'bdNavbarController',
            controllerAs: 'ctrl',
            bindToController: true
        };
    }

    function bdNavbarController() {

    }

    angular
        .module('bennedetto')
        .controller('bdNavbarController', [bdNavbarController])
        .directive('bdNavbar', ['StaticService', bdNavbar]);
}());
