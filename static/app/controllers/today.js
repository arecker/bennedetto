(function() {
    'use strict';

    function todayController() {
        var self = this;
        self.hello = 'scope is working, yo';
    }

    angular
        .module('bennedetto')
        .controller('TodayController', [todayController]);
}());
