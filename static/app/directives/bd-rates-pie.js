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

    function bdRatesPieController($scope, ColorService) {
        var self = this, data, chart,

            clearData = function() {
                data = [];
            },

            unpackRates = function() {
                self.rates.map(function(obj) {
                    data.push({
                        value: obj.amount_per_day,
                        label: obj.description,
                        color: ColorService.getColorForAmount(obj.amount)
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
        .controller('bdRatesPieController', ['$scope', 'ColorService', bdRatesPieController])
        .directive('bdRatesPie', ['StaticService', bdRatesPie]);
}());
