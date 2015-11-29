(function() {
    'use strict';

    function bdSummaryTable(StaticService) {
        return {
            restrict: 'E',
            controller: 'bdSummaryTableController',
            controllerAs: 'summaryTableCtrl',
            templateUrl: StaticService.partial('bd-summary-table.html'),
            bindToController: true,
            scope: {
                api: '=?'
            }
        };
    }

    function bdSummaryTableController(SummaryReport) {
        var self = this;
        self.api = self.api || {};
        self.api.reload = function() {
            SummaryReport.get().then(function(res) {
                self.summary = res.data;
            });
        };
        self.api.reload();
    }

    angular
        .module('bennedetto')
        .controller('bdSummaryTableController', ['SummaryReport', bdSummaryTableController])
        .directive('bdSummaryTable', ['StaticService', bdSummaryTable]);
}());
