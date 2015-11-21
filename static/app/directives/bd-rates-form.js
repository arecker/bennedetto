(function() {
    'use strict';

    function bdRatesForm(StaticService) {
        return  {
            restrict: 'E',
            templateUrl: StaticService.partial('bd-rates-form.html'),
            controller: 'bdRatesFormController',
            controllerAs: 'ratesFormCtrl',
            bindToController: true,
            scope: {
                afterSubmit: '=?'
            }
        };
    }

    function bdRatesFormController(RatesResource, FormFactory) {
        var self = FormFactory.buildFormController(this, {
            afterSubmit: this.afterSubmit,
            resource: RatesResource
        });
    }

    angular
        .module('bennedetto')
        .controller('bdRatesFormController', ['RatesResource', 'FormFactory', bdRatesFormController])
        .directive('bdRatesForm', ['StaticService', bdRatesForm]);

}());
