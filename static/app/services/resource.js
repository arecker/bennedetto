(function() {
    'use strict';

    function ResourceFactory($resource, $http, APP_SETTINGS) {
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
            },
            buildReportResource: function(name) {
                return {
                    get: function() {
                        return $http.get('{}reports/{}/'.format(APP_SETTINGS.apiUrl, name));
                    }
                };
            }
        };
    }

    function RatesResource(ResourceFactory) {
        return ResourceFactory.buildResource('rates');
    }

    function TransactionsResource(ResourceFactory) {
        return ResourceFactory.buildResource('transactions');
    }

    function SummaryReport(ResourceFactory) {
        return ResourceFactory.buildReportResource('summary');
    }

    angular
        .module('bennedetto')
        .factory('ResourceFactory', ['$resource', '$http', 'APP_SETTINGS', ResourceFactory])
        .service('RatesResource', ['ResourceFactory', RatesResource])
        .service('TransactionsResource', ['ResourceFactory', TransactionsResource])
        .service('SummaryReport', ['ResourceFactory', SummaryReport]);
}());
