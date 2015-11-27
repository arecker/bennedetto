(function() {
    'use strict';

    function TransactionsController($mdSidenav) {
        var self = this;

        self.toggleRight = function() {
            $mdSidenav('right').toggle();
        };

        self.afterSubmit = function() {
            self.toggleRight();
            self.reloadHandle();
        };
    }

    angular
        .module('bennedetto')
        .controller('TransactionsController', ['$mdSidenav', TransactionsController]);
}());
