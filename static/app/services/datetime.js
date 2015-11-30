(function() {
    'use strict';

    function getNaiveDate() {
        var date = new Date(),
            dateString = '{}/{}/{}'.format(
                date.getMonth() + 1,
                date.getDate(),
                date.getFullYear()
            );
        return new Date(dateString);
    }

    function DateTimeService() {
        return {
            getNaiveDate: getNaiveDate
        };
    }

    angular
        .module('bennedetto')
        .factory('DateTimeService', [DateTimeService]);
}());
