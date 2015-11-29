(function() {
    'use strict';

    function TransactionsController($mdSidenav, $scope) {
        var self = this;

        self.toggleRight = function() {
            $mdSidenav('right').toggle();
        };

        self.afterSubmit = function() {
            self.toggleRight();
            self.reloadHandle();
        };

        self.edit = function(res) {
            self.toggleRight();
            self.sendToEdit(res);
        };

        self.clearFilters = function() {
            delete self.toDate;
            delete self.fromDate;
            self.reloadHandle();
        };

        self.filterIsOpen = false;

        $scope.$watch(function() {
            return angular.toJson([self.toDate, self.fromDate]);
        }, function() {
            if (self.reloadHandle &&
                (self.toDate || self.fromDate)) {
                self.reloadHandle({
                    toDate: self.toDate,
                    fromDate: self.fromDate
                });
            }
        });
    }

    angular
        .module('bennedetto')
        .controller('TransactionsController', ['$mdSidenav', '$scope', TransactionsController]);
}());
