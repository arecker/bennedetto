(function() {
    'use strict';

    function RatesController($mdSidenav) {
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
    }

    angular
        .module('bennedetto')
        .controller('RatesController', ['$mdSidenav', RatesController]);
}());
