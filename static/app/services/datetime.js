(function() {
    'use strict';

    function now() {
	return new Date();
    }

    function DateTimeService() {
	return {
	    now: now
	};
    }

    angular
	.module('bennedetto')
	.service('DateTimeService', [DateTimeService]);
}());
