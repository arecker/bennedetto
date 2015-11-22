(function() {
    'use strict';

    function bdTransactionsForm(StaticService) {
        return  {
            restrict: 'E',
            templateUrl: StaticService.partial('bd-transactions-form.html'),
            controller: 'bdTransactionsFormController',
            controllerAs: 'transFormCtrl',
            bindToController: true,
            scope: {
                afterSubmit: '=?'
            }
        };
    }

    function bdTransactionsFormController(TransactionsResource, FormFactory) {

        var self = FormFactory.buildFormController(this, {
            afterSubmit: this.afterSubmit,
            resource: TransactionsResource,
            getBlankModel: function() {
                return {
                    timestamp: new Date()
                };
            }
        });
    }

    angular
        .module('bennedetto')
        .controller('bdTransactionsFormController', ['TransactionsResource', 'FormFactory', bdTransactionsFormController])
        .directive('bdTransactionsForm', ['StaticService', bdTransactionsForm]);

}());
