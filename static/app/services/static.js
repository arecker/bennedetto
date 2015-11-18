(function() {
    'use strict';

    function partialFactory(staticUrl) {
        return function(template) {
            return '{}{}'.format(staticUrl, template);
        };
    }

    function StaticService(APP_SETTINGS) {
        return {
            'partial': partialFactory(APP_SETTINGS.staticUrl)
        };
    }

    angular
        .module('bennedetto')
        .service('StaticService', ['APP_SETTINGS', StaticService]);

}());
