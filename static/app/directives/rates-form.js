(function() {
    'use strict';

    function ratesForm(StaticService) {
        return  {
            restrict: 'E',
            templateUrl: StaticService.partial('rates-form.html'),
            controller: 'RatesFormController',
            controllerAs: 'ratesFormCtrl',
            bindToController: true
        };
    }

    function RatesFormController(RatesResource) {
        var self = this;

        self.model = {};

        self.save = function() {
            RatesResource.save(self.model);
            self.model = {};
        };

    }

    angular
        .module('bennedetto')
        .controller('RatesFormController', ['RatesResource', RatesFormController])
        .directive('ratesForm', ['StaticService', ratesForm]);
}());
