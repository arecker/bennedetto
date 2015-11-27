(function() {
    'use strict';

    function bdTransactionsList(StaticService) {
        return {
            restrict: 'E',
            templateUrl: StaticService.partial('bd-transactions-list.html'),
            controller: 'bdTransactionsListController',
            controllerAs: 'transListCtrl',
            bindToController: true,
            scope: {
                reloadHandle: '=?',
                edit: '='
            }
        };
    }

    function bdTransactionsListController(TransactionsResource, FormFactory) {
        var self = FormFactory.buildListController(this, {
            resource: TransactionsResource
        });
    }

    angular
        .module('bennedetto')
        .controller('bdTransactionsListController', ['TransactionsResource', 'FormFactory', bdTransactionsListController])
        .directive('bdTransactionsList', ['StaticService', bdTransactionsList]);
}());
