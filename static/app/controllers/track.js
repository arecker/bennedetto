(function() {
    'use strict';

    function TrackController($scope, $mdSidenav, TransactionsResource, RatesResource) {
        var self = this,

            getEmptyTransaction = function() {
                return {
                    timestamp: new Date()
                };
            },

            getEmptyRate = function() {
                return {};
            };

        self.newTransaction = getEmptyTransaction();
        self.newRate = getEmptyRate();

        self.reloadTransactions = function(filters) {
            TransactionsResource.query(filters).$promise.then(function(data) {
                self.transactions = data;
            });
        };

        self.reloadRates = function() {
            RatesResource.query().$promise.then(function(data) {
                self.rates = data;
            });
        };

        self.toggleTransactionForm = function() {
            $mdSidenav('transaction').toggle();
        };

        self.toggleRatesForm = function() {
            $mdSidenav('rate').toggle();
        };

        self.submitTransaction = function() {
            var promise;

            if (self.newTransaction.id) {
                promise = TransactionsResource.update(self.newTransaction).$promise;
            } else {
                promise = TransactionsResource.save(self.newTransaction).$promise;
            }

            promise.then(function() {
                self.toggleTransactionForm();
                self.reloadTransactions();
                self.summaryTable.reload();
            });
        };

        self.submitRate = function() {
            var promise;

            if (self.newRate.id) {
                promise = RatesResource.update(self.newRate).$promise;
            } else {
                promise = RatesResource.save(self.newRate).$promise;
            }

            promise.then(function() {
                self.toggleRatesForm();
                self.reloadRates();
            });
        };

        self.resetTransactionForm = function(form) {
            self.newTransaction = getEmptyTransaction();
            form.$setPristine();
            form.$setUntouched();
        };

        self.resetRateForm = function(form) {
            self.newRate = getEmptyRate();
            form.$setPristine();
            form.$setUntouched();
        };

        self.deleteTransaction = function(res) {
            TransactionsResource.delete(res).$promise.then(function(){
                self.reloadTransactions();
                self.summaryTable.reload();
            });
        };

        self.deleteRate = function(res) {
            RatesResource.delete(res).$promise.then(self.reloadRates);
        };

        self.editTransaction = function(res) {
            self.newTransaction = {
                id: res.id,
                description: res.description,
                amount: Number(res.amount),
                timestamp: new Date(res.timestamp),
                user: res.user
            };
            self.toggleTransactionForm();
        };

        self.editRate = function(res) {
            self.newRate = {
                id: res.id,
                description: res.description,
                amount: Number(res.amount),
                days: Number(res.days),
                user: res.user
            };
            self.toggleRatesForm();
        };

        self.clearFilters = function() {
            delete self.toDate;
            delete self.fromDate;
        };

        self.reloadTransactions();
        self.reloadRates();

        $scope.$watch(function() {
            return angular.toJson([self.toDate, self.fromDate]);
        }, function() {
            if (self.reloadTransactions) {
                self.reloadTransactions({
                    toDate: self.toDate,
                    fromDate: self.fromDate
                });
            }
        });
    }

    angular
        .module('bennedetto')
        .controller('TrackController', ['$scope', '$mdSidenav', 'TransactionsResource', 'RatesResource', 'SummaryReport', TrackController]);
}());
