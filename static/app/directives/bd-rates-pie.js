(function() {
    'use strict';

    function bdRatesPie(StaticService) {
        return {
            restrict: 'E',
            controller: 'bdRatesPieController',
            controllerAs: 'ratesPieCtrl',
            templateUrl: StaticService.partial('bd-rates-pie.html'),
            bindToController: true,
            scope: {
                rates: '='
            }
        };
    }

    function bdRatesPieController($scope) {
        var self = this, data, chart,

            clearData = function() {
                data = [];
            },

            getRandomValue = function() {
                var max = 150, min = 100;
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            getGreenColor = function() {
                return 'rgb(0,{},0)'.format(getRandomValue());
            },

            getRedColor = function() {
                return 'rgb({},0,0)'.format(getRandomValue());
            },

            getColorForRate = function(obj) {
                if (Number(obj.amount_per_day) > 0) {
                    return getGreenColor();
                } else {
                    return getRedColor();
                }
            },

            unpackRates = function() {
                self.rates.map(function(obj) {
                    data.push({
                        value: obj.amount_per_day,
                        label: obj.description,
                        color: getColorForRate(obj)
                    });
                });
            },

            drawChart = function() {
                var ctx = document.getElementById("bdRatesPie").getContext("2d");
                chart = new Chart(ctx).Pie(data);
            };

        self.options = {};

        $scope.$watch(function() {
            return self.rates;
        }, function() {
            clearData();
            if (self.rates && self.rates.length > 0) {
                unpackRates();
                drawChart();
            }
        });
    }

    angular
        .module('bennedetto')
        .controller('bdRatesPieController', ['$scope', bdRatesPieController])
        .directive('bdRatesPie', ['StaticService', bdRatesPie]);
}());
