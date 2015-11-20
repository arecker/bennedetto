(function() {
    'use strict';

    function RatesList(StaticService) {
        return {
            restrict: 'E',
            templateUrl: StaticService.partial('rates-list.html'),
            controller: 'RatesListController',
            controllerAs: 'ratesListCtrl',
            bindToController: true
        };
    }

    function RatesListController(RatesResource) {
        var self = this;

        self.rates = RatesResource.query();
    }

    angular
        .module('bennedetto')
        .controller('RatesListController', ['RatesResource', RatesListController])
        .directive('ratesList', ['StaticService', RatesList]);
}());
