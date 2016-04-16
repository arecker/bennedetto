(function() {
    'use strict';

    function TrackController($scope, $mdSidenav, TransactionsResource, RatesResource, DateTimeService) {
        var self = this,

            getEmptyTransaction = function() {
                return {
                    timestamp: DateTimeService.now()
                };
            },

            getEmptyRate = function() {
                return {};
            },

            getFilters = function() {
                if (self.toDate || self.fromDate) {
                    return {
                        toDate: self.toDate,
                        fromDate: self.fromDate
                    };
                } else {
                    return undefined;
                }
            };

        self.positiveTrans = false;
        self.positiveRate = false;

        self.newTransaction = getEmptyTransaction();
        self.newRate = getEmptyRate();
        self.fromDate = DateTimeService.now();
        self.toDate = DateTimeService.now();

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

            if (!self.positiveTrans) {
                self.newTransaction.amount = self.newTransaction.amount * -1;
            }

            if (self.newTransaction.id) {
                promise = TransactionsResource.update(self.newTransaction).$promise;
            } else {
                promise = TransactionsResource.save(self.newTransaction).$promise;
            }

            promise.then(function() {
                self.toggleTransactionForm();
                self.reloadTransactions(getFilters());
                self.summaryTable.reload();
            });
        };

        self.submitRate = function() {
            var promise;

            if (!self.positiveRate) {
                self.newRate.amount = self.newRate.amount * -1;
            }

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
                self.reloadTransactions(getFilters());
                self.summaryTable.reload();
            });
        };

        self.deleteRate = function(res) {
            RatesResource.delete(res).$promise.then(self.reloadRates);
        };

        self.editTransaction = function(res) {
            var amount = Number(res.amount);
            self.positiveTrans = (amount > 0);

            self.newTransaction = {
                id: res.id,
                description: res.description,
                amount: Math.abs(amount),
                timestamp: new Date(res.timestamp),
                user: res.user
            };
            self.toggleTransactionForm();
        };

        self.editRate = function(res) {
            var amount = Number(res.amount);
            self.positiveRate = (amount > 0);
            self.newRate = {
                id: res.id,
                description: res.description,
                amount: Math.abs(amount),
                days: Number(res.days),
                user: res.user
            };
            self.toggleRatesForm();
        };

        self.clearFilters = function() {
            delete self.toDate;
            delete self.fromDate;
        };

        self.reloadTransactions(getFilters());
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
        .controller('TrackController', ['$scope', '$mdSidenav', 'TransactionsResource', 'RatesResource', 'DateTimeService', TrackController]);
}());
