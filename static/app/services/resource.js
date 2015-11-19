(function() {
    'use strict';

    function RatesResource($resource, APP_SETTINGS) {
        return $resource('{}{}'.format(APP_SETTINGS.apiUrl, 'rates'));
    }

    angular
        .module('bennedetto')
        .service('RatesResource', ['$resource', 'APP_SETTINGS', RatesResource]);
}());
