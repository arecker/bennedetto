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
                reloadHandle: '=?',
                edit: '='
            }
        };
    }

    function bdRatesListController(RatesResource, FormFactory) {
        var self = FormFactory.buildListController(this, {
            resource: RatesResource
        });
    }

    angular
        .module('bennedetto')
        .controller('bdRatesListController', ['RatesResource', 'FormFactory', bdRatesListController])
        .directive('bdRatesList', ['StaticService', bdRatesList]);
}());
