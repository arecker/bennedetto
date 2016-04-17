(function() {
    'use strict';

    function ResourceFactory($resource, $http, APP_SETTINGS) {
        return {
            buildResource: function(endpoint) {
                var url = '{}{}/:id/'.format(APP_SETTINGS.apiUrl, endpoint),
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

    function UserResourceFactory($http, APP_SETTINGS) {
        var endPoint = '{}user/'.format(APP_SETTINGS.apiUrl),

            sendVerificationEmail = function() {
                return $http.post('{}send/'.format(endPoint));
            },

            changePassword = function(params) {
                return $http.post('{}password/'.format(endPoint), angular.toJson(params));
            },

	    createFamily = function(params) {
		return $http.post('{}family/'.format(endPoint), angular.toJson(params));
	    },

	    inviteToFamily = function(params) {
		return $http.post('{}membership/'.format(endPoint), angular.toJson(params));
	    },

	    fetchMembers = function() {
		return $http.get('{}membership/'.format(endPoint));
	    };

        return {
            buildUserProfile: function() {
                return $http.get(endPoint).success(function(data) {
                    data.changePassword = changePassword;
                    data.sendVerificationEmail = sendVerificationEmail;
		    data.createFamily = createFamily;
		    data.inviteToFamily = inviteToFamily;
		    data.fetchMembers = fetchMembers;
                    return data;
                });
            }
        };
    }

    angular
        .module('bennedetto')
        .factory('ResourceFactory', ['$resource', '$http', 'APP_SETTINGS', ResourceFactory])
        .service('RatesResource', ['ResourceFactory', RatesResource])
        .service('UserResourceFactory', ['$http', 'APP_SETTINGS', UserResourceFactory])
        .service('TransactionsResource', ['ResourceFactory', TransactionsResource])
        .service('SummaryReport', ['ResourceFactory', SummaryReport]);
}());
