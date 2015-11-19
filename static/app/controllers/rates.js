(function() {
    'use strict';

    function RatesController(RatesResource) {
        var self = this;
        self.rates = RatesResource.query();
    }

    angular
        .module('bennedetto')
        .controller('RatesController', ['RatesResource', RatesController]);
}());
