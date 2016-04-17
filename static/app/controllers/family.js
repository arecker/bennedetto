(function() {
    'use strict';

    function FamilyController($scope, UserResourceFactory) {
	var updateUser = function() {
	    UserResourceFactory.buildUserProfile().then(function(d) {
		$scope.user = d.data;
	    });
	};

	$scope.createFamily = function() {
	    $scope.user.createFamily({
		name: $scope.familyName
	    }).then(updateUser);
	};
    }

    angular
	.module('bennedetto')
	.controller('FamilyController', ['$scope', 'UserResourceFactory', FamilyController]);
}());
