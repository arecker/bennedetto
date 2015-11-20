(function() {
    'use strict';

    function RatesController(RatesResource) {
        var self = this;
    }

    angular
        .module('bennedetto')
        .controller('RatesController', ['RatesResource', RatesController]);
}());
