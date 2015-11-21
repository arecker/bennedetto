(function() {
    'use strict';

    function buildFormController(self, options) {
        self.model = {};
        self.afterSubmit = options.afterSubmit || angular.noop;

        if (!options.resource) {
            throw 'I need an "options.resource" to build a form controller, man.';
        }

        self.submit = function() {
            options.resource(self.model).$promise.then(self.afterSubmit);
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
        .service('FormControllerFactory', [FormFactory]);

}());
