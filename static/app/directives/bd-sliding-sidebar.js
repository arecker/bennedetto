(function() {
    'use strict';

    function bdSlidingSidebar(StaticService) {
        return {
            restrict: 'E',
            templateUrl: StaticService.partial('bd-sliding-sidebar.html'),
            transclude: true
        };
    }

    angular
        .module('bennedetto')
        .directive('bdSlidingSidebar', ['StaticService', bdSlidingSidebar]);
}());
