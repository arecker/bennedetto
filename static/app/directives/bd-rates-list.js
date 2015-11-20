(function() {
    'use strict';

    function bdRatesList(StaticService) {
        return {
            restrict: 'E',
            templateUrl: StaticService.partial('bd-rates-list.html'),
            controller: 'bdRatesListController',
            controllerAs: 'ratesListCtrl',
            bindToController: true,
            scope: {
                reloadHandle: '=?'
            }
        };
    }

    function bdRatesListController(RatesResource) {
        var self = this;

        self.reloadHandle = function() {
            RatesResource.query().$promise.then(function(d) {
                self.rates = d;
            });
        };

        self.delete = function(res) {
            RatesResource.delete(res).$promise.then(self.reloadHandle);
        };

        self.reloadHandle();
    }

    angular
        .module('bennedetto')
        .controller('bdRatesListController', ['RatesResource', bdRatesListController])
        .directive('bdRatesList', ['StaticService', bdRatesList]);
}());
