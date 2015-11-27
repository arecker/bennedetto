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
                afterSubmit: '=?',
                edit: '='
            }
        };
    }

    function bdRatesFormController(RatesResource, FormFactory) {
        var self = FormFactory.buildFormController(this, {
            afterSubmit: this.afterSubmit,
            resource: RatesResource
        });

        self.edit = function(res) {
            self.model = {
                id: res.id,
                description: res.description,
                amount: Number(res.amount),
                timestamp: res.timestamp,
                user: res.user
            };
        };
    }

    angular
        .module('bennedetto')
        .controller('bdRatesFormController', ['RatesResource', 'FormFactory', bdRatesFormController])
        .directive('bdRatesForm', ['StaticService', bdRatesForm]);

}());
