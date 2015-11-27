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
                afterSubmit: '=?',
                edit: '='
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

        self.edit = function(res) {
            self.model = {
                id: res.id,
                description: res.description,
                amount: Number(res.amount), // yuck...
                timestamp: res.timestamp,
                user: res.user
            };
        };
    }

    angular
        .module('bennedetto')
        .controller('bdTransactionsFormController', ['TransactionsResource', 'FormFactory', bdTransactionsFormController])
        .directive('bdTransactionsForm', ['StaticService', bdTransactionsForm]);

}());
