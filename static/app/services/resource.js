(function() {
    'use strict';

    function ResourceFactory($resource, APP_SETTINGS) {
        return {
            buildResource: function(endpoint) {
                var url = '{}{}/:id'.format(APP_SETTINGS.apiUrl, endpoint),
                    params = {
                        id: '@id'
                    },
                    customObjs = {
                        update: {
                            method: 'PUT'
                        }
                    };

                return $resource(url, params,  customObjs);
            }
        };
    }

    function RatesResource(ResourceFactory) {
        return ResourceFactory.buildResource('rates');
    }

    function TransactionsResource(ResourceFactory) {
        return ResourceFactory.buildResource('transactions');
    }

    angular
        .module('bennedetto')
        .factory('ResourceFactory', ['$resource', 'APP_SETTINGS', ResourceFactory])
        .service('RatesResource', ['ResourceFactory', RatesResource])
        .service('TransactionsResource', ['ResourceFactory', TransactionsResource]);
}());
