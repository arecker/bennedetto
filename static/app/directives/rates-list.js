(function() {
    'use strict';

    function RatesList(StaticService) {
        return {
            restrict: 'E',
            templateUrl: StaticService.partial('rates-list.html'),
            controller: 'RatesListController',
            controllerAs: 'ratesListCtrl',
            bindToController: true,
            scope: {
                reloadHandle: '=?'
            }
        };
    }

    function RatesListController(RatesResource) {
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
        .controller('RatesListController', ['RatesResource', RatesListController])
        .directive('ratesList', ['StaticService', RatesList]);
}());
