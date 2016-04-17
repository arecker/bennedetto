(function() {
    'use strict';

    function FamilyController($scope, UserResourceFactory) {
	var updateUser = function() {
	    UserResourceFactory.buildUserProfile().then(function(d) {
		$scope.user = d.data;
	    });
	};

	var updateMembers = function() {
	    $scope.user.fetchMembers().then(function(d) {
		$scope.members = d.data;
	    });
	};

	$scope.createFamily = function() {
	    $scope.user.createFamily({
		name: $scope.familyName
	    }).then(updateUser);
	};

	$scope.sendInvitation = function() {
	    $scope.user.inviteToFamily({
		email: $scope.newMemberEmail
	    }).then(function() {
		$scope.newMemberEmail = '';
	    }).then(updateMembers);
	};

	updateMembers();
    }

    angular
	.module('bennedetto')
	.controller('FamilyController', ['$scope', 'UserResourceFactory', FamilyController]);
}());
