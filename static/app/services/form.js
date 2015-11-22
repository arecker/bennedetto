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

    function buildListController(self, options) {
        self.collection = [];

        if (!options.resource) {
            throw 'I need an "options.resource" to build a list controller, man.';
        }

        self.reloadHandle = function() {
            options.resource.query().$promise.then(function(d) {
                self.collection = d;
            });
        };

        self.delete = function(res) {
            options.resource.delete(res).$promise.then(self.reloadHandle);
        };

        self.reloadHandle();

        return self;

    }

    function FormFactory() {
        return {
            buildFormController: buildFormController,
            buildListController: buildListController
        };
    }

    angular
        .module('bennedetto')
        .service('FormFactory', [FormFactory]);

}());
