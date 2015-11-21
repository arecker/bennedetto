(function() {
    'use strict';

    function buildFormController(self, options) {
        self.model = {};
        self.afterSubmit = options.afterSubmit || angular.noop;

        if (!options.resource) {
            throw 'I need an "options.resource" to build a form controller, man.';
        }

        self.submit = function() {
            options.resource.save(self.model).$promise.then(self.afterSubmit);
        };

        self.reset = function(form) {
            self.model = {};
            form.$setPristine();
            form.$setUntouched();
        };

        return self;
    }

    function FormFactory() {
        return {
            buildFormController: buildFormController
        };
    }

    angular
        .module('bennedetto')
        .service('FormFactory', [FormFactory]);

}());
