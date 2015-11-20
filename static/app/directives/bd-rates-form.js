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

    function bdRatesFormController(RatesResource) {
        var self = this;

        self.model = {};

        self.afterSubmit = self.afterSubmit || angular.noop;

        self.submit = function() {
            RatesResource.save(self.model).$promise.then(self.afterSubmit);
            self.model = {};
        };

    }

    angular
        .module('bennedetto')
        .controller('bdRatesFormController', ['RatesResource', bdRatesFormController])
        .directive('bdRatesForm', ['StaticService', bdRatesForm]);

}());
