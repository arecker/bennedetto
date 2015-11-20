(function() {
    'use strict';

    function ratesForm(StaticService) {
        return  {
            restrict: 'E',
            templateUrl: StaticService.partial('rates-form.html'),
            controller: 'RatesFormController',
            controllerAs: 'ratesFormCtrl',
            bindToController: true,
            scope: {
                afterSubmit: '=?'
            }
        };
    }

    function RatesFormController(RatesResource) {
        var self = this;

        self.model = {};

        self.afterSubmit = self.afterSubmit || angular.noop;

        self.submit = function() {
            RatesResource.save(self.model).$promise.then(self.afterSubmit);
            self.model = {};
        };

    }

    function min() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.min = function(modelValue) {
                    modelValue = Number(modelValue);
                    return !isNaN(modelValue) && modelValue > 0;
                };
            }
        };
    }

    angular
        .module('bennedetto')
        .controller('RatesFormController', ['RatesResource', RatesFormController])
        .directive('ratesForm', ['StaticService', ratesForm])
        .directive('min', [min]);
}());
