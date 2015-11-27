(function() {
    'use strict';

    function buildFormController(self, options) {
        var getBlankModel = options.getBlankModel || function() {
            return {};
        };

        self.model = getBlankModel();
        self.afterSubmit = options.afterSubmit || angular.noop;

        if (!options.resource) {
            throw 'I need an "options.resource" to build a form controller, man.';
        }

        self.submit = function() {
            var promise;
            if (self.model.id) {
                promise = options.resource.update(self.model).$promise;
            } else {
                promise = options.resource.save(self.model).$promise;
            }
            promise.then(self.afterSubmit);
        };

        self.edit = function(res) {
            self.model = angular.copy(res);
        };

        self.reset = function(form) {
            self.model = getBlankModel();
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
